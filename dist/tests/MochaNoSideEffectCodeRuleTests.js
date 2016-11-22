"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('mochaNoSideEffectCodeRule', function () {
    var ruleName = 'mocha-no-side-effect-code';
    it('should pass on not a mocha test', function () {
        var script = "\n            var blah = foo;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on most simple case', function () {
        var script = "\n            describe('someTest', (): void => {\n                const CONST1 = 'one';\n                const CONST2 = 2;\n                const CONST3 = true;\n                const CONST4 = false;\n\n                before((): void => {\n                    const foo = someValue();\n                });\n                beforeEach((): void => {\n                    const foo = someValue();\n                });\n                beforeAll((): void => {\n                    const foo = someValue();\n                });\n                after((): void => {\n                    const foo = someValue();\n                });\n                afterEach((): void => {\n                    const foo = someValue();\n                });\n                afterAll((): void => {\n                    const foo = someValue();\n                });\n                it((): void => {\n                    const foo = someValue();\n                });\n                describe((): void => {\n                    const CONST4 = false;\n                    it((): void => {\n                        const foo = someValue();\n                    });\n                });\n                context((): void => {\n                    const CONST4 = false;\n                    specify((): void => {\n                        const foo = someValue();\n                    });\n                });\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on function declarations', function () {
        var script = "\n            describe('someTest', (): void => {\n\n                function doSomething() {\n                    const x = doSomethingElse();\n                }\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on multiline string', function () {
        var script = "\n            describe('someTest', (): void => {\n\n                const CONST1 = `some\n                                multi-line\n                                string`;\n\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on simple cast', function () {
        var script = "\n            describe('someTest', (): void => {\n                const publisher: DTO.Publisher = <any>{ '@class': 'Publisher' };\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on describe.skip', function () {
        var script = "\n            describe('someTest', (): void => {\n                describe.skip('someTest', (): void => {\n                });\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on complex cast', function () {
        var script = "\n            describe('someTest', (): void => {\n                const publisher: DTO.Publisher = <any>doSomething();\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Mocha test contains dangerous variable initialization. " +
                    "Move to before()/beforeEach(): publisher: DTO.Publisher = <...",
                "name": "file.ts",
                "ruleName": "mocha-no-side-effect-code",
                "startPosition": { "character": 23, "line": 3 }
            }
        ]);
    });
    it('should fail on function calls', function () {
        var script = "\n            describe('someTest', (): void => {\n                expect(convertedTags).to.deep.equal(tags);\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Mocha test contains dangerous variable initialization. " +
                    "Move to before()/beforeEach(): expect(convertedTags).to.dee...",
                "name": "file.ts",
                "ruleName": "mocha-no-side-effect-code",
                "startPosition": { "character": 17, "line": 3 }
            }
        ]);
    });
    it('should fail on context', function () {
        var script = "\n            context('someTest', (): void => {\n                expect(convertedTags).to.deep.equal(tags);\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Mocha test contains dangerous variable initialization. " +
                    "Move to before()/beforeEach(): expect(convertedTags).to.dee...",
                "name": "file.ts",
                "ruleName": "mocha-no-side-effect-code",
                "startPosition": { "character": 17, "line": 3 }
            }
        ]);
    });
    it('should pass on correct scoping', function () {
        var script = "\n            describe('someTest', (): void => {\n                const CONST1 = 'one';\n                const CONST2 = 2;\n                const CONST3 = true;\n                const CONST4 = false;\n\n                before((): void => {\n                    const foo = someValue();\n                });\n                beforeEach((): void => {\n                    const foo = someValue();\n                });\n                beforeAll((): void => {\n                    const foo = someValue();\n                });\n                after((): void => {\n                    const foo = someValue();\n                });\n                afterEach((): void => {\n                    const foo = someValue();\n                });\n                afterAll((): void => {\n                    const foo = someValue();\n                });\n                it((): void => {\n                    const foo = someValue();\n                });\n                describe((): void => {\n                    const CONST4 = false;\n                    it((): void => {\n                        const foo = someValue();\n                    });\n                });\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on variable aliasing', function () {
        var script = "\n            let expect: Chai.ExpectStatic = chai.expect;\n\n            describe('someTest', (): void => {\n                let expect2: Chai.ExpectStatic = chai.expect;\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on date creation', function () {
        var script = "\n            let date = moment();\n            let firstActiveDay: Moment = moment().subtract(2, 'years');\n            let date2 = new Date(123123123);\n            describe('someTest', (): void => {\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on simple JSON structures', function () {
        var script = "\n            let onDaySelected: (newDate: Moment) => void = (newDate: Moment) => {\n                return;\n            };\n            let inputProps: DatePicker.Props = {\n                selectedDate: moment(),\n                onDaySelected: onDaySelected,\n                componentName: 'test'\n            };\n            describe('someTest', (): void => {\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on complex JSON structures', function () {
        var script = "\n            let searchItems: DTO.SearchItem[] = [\n                {'id': '4', 'name': 'All Search Topics', owner: undefined, ownerName: '', createdDate: undefined},\n                {'id': '66', 'name': 'Products', 'parentId': '4', owner: undefined, ownerName: '', createdDate: undefined},\n                {'id': '314012', 'name': 'Honey', 'parentId': '66', owner: undefined, ownerName: '', createdDate: undefined},\n                {'id': '314072', 'name': 'Bonny', 'parentId': '66', owner: undefined, ownerName: '', createdDate: undefined},\n                {'id': '65', 'name': 'Uncategorized', 'parentId': '4', owner: undefined, ownerName: '', createdDate: undefined},\n                {'id': '216102', 'name': 'Blub', 'parentId': '65', owner: undefined, ownerName: '', createdDate: undefined},\n                {'id': '314022', 'name': 'Bnutsch', 'parentId': '65', owner: undefined, ownerName: '', createdDate: undefined}\n            ];\n            describe('someTest', (): void => {\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass string concatenation', function () {
        var script = "\n            const SMALL_IMAGE: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+' +\n                'AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAASdAAAEnQB3mYfeAAAAE9JREFUCB0BRAC7/wAAAAAAAAAAAAAAAAAAA' +\n                'AAAAAAAAAD/H1f/AAAA/wAAAAAAAAAAAAAAAP///Vf/AAAAAAAAAAAAAAAAAAAAAAAAAAAA/GsHxbcKPckAAAAASUVORK5CYII=';\n\n            const HOUR: number = 60 * 60;\n\n            describe('someTest', (): void => { });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass configured factory methods', function () {
        var script = "\n            const x = RestDataFactory.createSocialProfile()\n\n            describe('someTest', (): void => {\n                const < = RestDataFactory.createSocialProfileToken()\n            });\n        ";
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [true, { ignore: '^RestDataFactory\\.create.*' }], script, []);
    });
    it('should pass newly declared classes', function () {
        var script = "\n            describe('someTest', (): void => {\n\n                class MockModel extends Backbone.Model {\n\n                    public fetch(options?: Backbone.ModelFetchOptions): JQueryXHR {\n                        let request: JQueryXHR = super.fetch(options);\n                        return request;\n                    }\n\n                    public save(attributes?: any, options?: Backbone.ModelSaveOptions): JQueryXHR {\n                        let request: JQueryXHR = super.save(attributes, options);\n                        return request;\n                    }\n\n                }\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on describe', function () {
        var script = "\n            describe('someTest', (): void => {\n                const VIOLATION1 = this.myMethod();\n                const VIOLATION2 = new MyClass();\n\n                it((): void => {\n                    const foo = someValue(); // OK\n                });\n\n                describe('someTest', (): void => {\n                    const VIOLATION3 = true ? false : true;\n                    const VIOLATION4 = x || 'some value';\n\n                    it((): void => {\n                        const foo = someValue(); // OK\n                    });\n                });\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Mocha test contains dangerous variable initialization. " +
                    "Move to before()/beforeEach(): VIOLATION1 = this.myMethod()",
                "name": "file.ts",
                "ruleName": "mocha-no-side-effect-code",
                "startPosition": { "character": 23, "line": 3 }
            },
            {
                "failure": "Mocha test contains dangerous variable initialization. " +
                    "Move to before()/beforeEach(): VIOLATION2 = new MyClass()",
                "name": "file.ts",
                "ruleName": "mocha-no-side-effect-code",
                "startPosition": { "character": 23, "line": 4 }
            },
            {
                "failure": "Mocha test contains dangerous variable initialization. " +
                    "Move to before()/beforeEach(): VIOLATION3 = true ? false : ...",
                "name": "file.ts",
                "ruleName": "mocha-no-side-effect-code",
                "startPosition": { "character": 27, "line": 11 }
            },
            {
                "failure": "Mocha test contains dangerous variable initialization. " +
                    "Move to before()/beforeEach(): VIOLATION4 = x || 'some value'",
                "name": "file.ts",
                "ruleName": "mocha-no-side-effect-code",
                "startPosition": { "character": 27, "line": 12 }
            }
        ]);
    });
    it('should fail on global scope', function () {
        var script = "\n\n            const VIOLATION1 = new MyClass();\n\n            describe('someTest', (): void => {\n                it((): void => {\n                });\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Mocha test contains dangerous variable initialization. " +
                    "Move to before()/beforeEach(): VIOLATION1 = new MyClass()",
                "name": "file.ts",
                "ruleName": "mocha-no-side-effect-code",
                "startPosition": { "character": 19, "line": 3 }
            }
        ]);
    });
    describe('arrays', function () {
        it('should pass on empty and simple arrays', function () {
            var script = "\n            describe('someTest', (): void => {\n                const CONST1 = [];\n                const CONST2 = [ true, false, 1, 0, 'value', null];\n            });\n        ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('should pass on nested simple arrays', function () {
            var script = "\n            describe('someTest', (): void => {\n                const options = [true, [\n                    'Mobile IE 10',\n                    'IE >= 10',\n                    'Chrome > 45',\n                    'Firefox',\n                    'Mobile Safari < 10'\n                ]];\n            });\n        ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('should fail on complex arrays', function () {
            var script = "\n            describe('someTest', (): void => {\n                const VIOLATION = [ someCall() ];\n            });\n        ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Mocha test contains dangerous variable initialization. " +
                        "Move to before()/beforeEach(): VIOLATION = [ someCall() ]",
                    "name": "file.ts",
                    "ruleName": "mocha-no-side-effect-code",
                    "startPosition": { "character": 23, "line": 3 }
                }
            ]);
        });
    });
});
