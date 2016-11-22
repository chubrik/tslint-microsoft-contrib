"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('maxFuncBodyLengthRule', function () {
    var options;
    var script = "\n        (function () { alert('!'); })();\n\n        function hasBodyLengthOf10 (x, y, z) {\n            let result = 'a';\n            for (let i = 0; i < 10; i++) {\n                result += 'b';\n            }\n\n            try {\n                x = 2 / 0;\n            } catch (err) {\n                return ['magic'];\n            }\n\n            return [ 0, 0, 1, 2, 3, 5, 8 ]\n                .map(x => x * 2)\n                .filter(x => x % 3 === 0);\n        }\n\n        class Magic {\n\n            constructor (mana) {\n                if (!mana || mana === 0) {\n                    throw new Error('Not enough mana.');\n                }\n\n                this.spells = mana / 10;\n                // very long comment on the spells calculation\n                // every spell takes 10 mana you know\n                // so..\n            }\n\n            sparks () {\n                for (let i = 0; i < 100; i++) {\n                    try {\n                        throw new Error('Sparks!');\n                    } catch (sprk) {\n                        continue;\n                    }\n                }\n\n                let x = 2 + 3 +\n                    4 + 5;\n\n                return 1;\n            }\n        }\n\n        export var nuclearOption = (a) => {\n            alert('kaboom');\n            alert('bbblaast');\n            alert('arrrgggg');\n            alert('omgomgomg');\n            alert('yay');\n            return 2;\n        };\n\n        export var igniteFire = (a) => {\n            // creating flames is a pretty\n            // complex process.\n            // we should\n            // thoroughly\n            // document\n            /**\n             * the flame-\n             * making\n             * process so that future\n             * wizards know what\n             * the deal is\n             */\n             // but playing with fire is\n             // deadly\n            throw new Error('Use sparks instead, they are less deadly');\n        };";
    var ruleName = 'max-func-body-length';
    describe('when functions do not exceed general option value and syntax kind wise options are not used', function () {
        it('should not fail', function () {
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
    });
    describe('when general option is used and functions lengths exceed its value', function () {
        beforeEach(function () {
            options = [true, 5];
        });
        it('should fail', function () {
            TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, options, script, [
                {
                    "failure": "Max function body length exceeded in function hasBodyLengthOf10() - max: 5, actual: 15",
                    "name": "file.ts",
                    "ruleName": "max-func-body-length",
                    "startPosition": {
                        "character": 9,
                        "line": 4
                    }
                },
                {
                    "failure": "Max constructor body length exceeded in class Magic - max: 5, actual: 9",
                    "name": "file.ts",
                    "ruleName": "max-func-body-length",
                    "startPosition": {
                        "character": 13,
                        "line": 23
                    }
                },
                {
                    "failure": "Max method body length exceeded in method sparks() - max: 5, actual: 13",
                    "name": "file.ts",
                    "ruleName": "max-func-body-length",
                    "startPosition": {
                        "character": 13,
                        "line": 34
                    }
                },
                {
                    "failure": "Max arrow function body length exceeded - max: 5, actual: 7",
                    "name": "file.ts",
                    "ruleName": "max-func-body-length",
                    "startPosition": {
                        "character": 36,
                        "line": 50
                    }
                },
                {
                    "failure": "Max arrow function body length exceeded - max: 5, actual: 16",
                    "name": "file.ts",
                    "ruleName": "max-func-body-length",
                    "startPosition": {
                        "character": 33,
                        "line": 59
                    }
                }
            ]);
        });
    });
    describe('when syntax kind wise options are used and functions lengths exceed their value', function () {
        beforeEach(function () {
            options = [true,
                {
                    'func-body-length': 6,
                    'method-body-length': 7,
                    'arrow-body-length': 4,
                    'ctor-body-length': 3
                }
            ];
        });
        it('should fail', function () {
            TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, options, script, [
                {
                    "failure": "Max function body length exceeded in function hasBodyLengthOf10() - max: 6, actual: 15",
                    "name": "file.ts",
                    "ruleName": "max-func-body-length",
                    "startPosition": {
                        "character": 9,
                        "line": 4
                    }
                },
                {
                    "failure": "Max constructor body length exceeded in class Magic - max: 3, actual: 9",
                    "name": "file.ts",
                    "ruleName": "max-func-body-length",
                    "startPosition": {
                        "character": 13,
                        "line": 23
                    }
                },
                {
                    "failure": "Max method body length exceeded in method sparks() - max: 7, actual: 13",
                    "name": "file.ts",
                    "ruleName": "max-func-body-length",
                    "startPosition": {
                        "character": 13,
                        "line": 34
                    }
                },
                {
                    "failure": "Max arrow function body length exceeded - max: 4, actual: 7",
                    "name": "file.ts",
                    "ruleName": "max-func-body-length",
                    "startPosition": {
                        "character": 36,
                        "line": 50
                    }
                },
                {
                    "failure": "Max arrow function body length exceeded - max: 4, actual: 16",
                    "name": "file.ts",
                    "ruleName": "max-func-body-length",
                    "startPosition": {
                        "character": 33,
                        "line": 59
                    }
                }
            ]);
        });
    });
    describe('when ignoring comments option is used and function lengths exceed their value', function () {
        beforeEach(function () {
            options = [true, 3, { 'ignore-comments': true }];
        });
        it('should not fail due to single- or multi- line comments', function () {
            TestHelper_1.TestHelper.assertNoViolationWithOptions(ruleName, options, "\n                function sum(a,b) {\n                    /**\n                     * add both a and b together\n                     * this is some complex math,\n                     * so it's best we abstract\n                     * it away from the user\n                     */\n                    const sum = a + b;\n                    return sum;\n                }\n\n                function sub(a,b) {\n                    // similarly to sub, this is\n                    // some pretty complex\n                    // arithmetic.\n                    // let's keep this away from\n                    // the user as well.\n\n                    return a - b;\n                }\n            ");
        });
        it('should fail due to lines with mixed code and comments', function () {
            TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, options, "\n                function sum(a,b) {\n                    let sum = a; // start with a\n                    sum += b; // now add b\n                    return sum; // return the result\n                }\n            ", [
                {
                    "failure": "Max function body length exceeded in function sum() - max: 3, actual: 4",
                    "name": "file.ts",
                    "ruleName": "max-func-body-length",
                    "startPosition": {
                        "character": 17,
                        "line": 2
                    }
                }
            ]);
        });
    });
    describe('when using mocha describe blocks', function () {
        beforeEach(function () {
            options = [true,
                5,
                {
                    'ignore-parameters-to-function-regex': 'describe'
                }
            ];
        });
        it('should be able to ignore describe calls', function () {
            TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, options, "\n            describe('something', (): void => {\n                // line 2\n                // line 3\n                // line 4\n                // line 5\n            }); // line 6\n            ", []);
        });
    });
    describe('when function expression passed as a parameter', function () {
        beforeEach(function () {
            options = [true,
                5,
                {}
            ];
        });
        it('should be able to ignore describe calls', function () {
            TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, options, "\n            describe('something', function name() {\n                // line 2\n                // line 3\n                // line 4\n                // line 5\n                // line 6\n            });\n            describe('something', function () {\n                // line 2\n                // line 3\n                // line 4\n                // line 5\n                // line 6\n            });\n            ", [{
                    "failure": "Max function expression body length exceeded in function expression name() - max: 5," +
                        " actual: 6",
                    "name": "file.ts",
                    "ruleName": "max-func-body-length",
                    "startPosition": {
                        "character": 35,
                        "line": 2
                    }
                }, {
                    "failure": "Max function expression body length exceeded in function expression () - max: 5, actual: 6",
                    "name": "file.ts",
                    "ruleName": "max-func-body-length",
                    "startPosition": {
                        "character": 35,
                        "line": 9
                    }
                }]);
        });
    });
});
