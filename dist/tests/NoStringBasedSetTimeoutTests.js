"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noStringBasedSetTimeoutRule', function () {
    var RULE_NAME = 'no-string-based-set-timeout';
    it('should not throw error - case 1', function () {
        var inputFile = 'test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutTestInput-error.ts';
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, []);
    });
    it('should not throw error - case 2', function () {
        var inputFile = "\nvar globalProp1: () => void;\nvar globalProp2 = () => {};\nvar globalProp3 = function () {};\n\nfunction globalFunction1() {}\n\nsetTimeout(globalProp1, 5);\nsetTimeout(globalProp2, 5);\nsetTimeout(globalProp3, 5);\nsetTimeout(globalFunction1, 5);\n\nmodule SetTimeoutModule {\n\n    var moduleProp1: () => void;\n    var moduleProp2 = () => {};\n    var moduleProp3 = function () {};\n\n    function moduleFunction1() {\n        setTimeout(moduleProp1, 5);\n        setTimeout(moduleProp2, 5);\n        setTimeout(moduleProp3, 5);\n        setTimeout(moduleFunction1, 5);\n    }\n\n    class View {\n\n        private property1: () => void;\n        private property2 = () => {};\n        private property3 = function () {};\n\n        private static property4: () => void;\n        private static property5 = () => {};\n        private static property6 = function () {};\n\n        private static method1() {}\n\n        private method2(): void {\n            setTimeout(View.method1, 5);\n            setTimeout(View.property4, 5);\n            setTimeout(View.property5, 5);\n            setTimeout(View.property6, 5);\n\n            setTimeout(this.method2, 5);\n            setTimeout(this.property1, 5);\n            setTimeout(this.property2, 5);\n\n            setTimeout(globalProp1, 5);\n            setTimeout(globalProp2, 5);\n            setTimeout(globalProp3, 5);\n            setTimeout(globalFunction1, 5);\n\n            setTimeout(moduleProp1, 5);\n            setTimeout(moduleProp2, 5);\n            setTimeout(moduleProp3, 5);\n            setTimeout(moduleFunction1, 5);\n\n            setTimeout(this.property1, 5);\n\n            var f = function() {\n                setTimeout(this.method2, 5);\n                setTimeout(this.property1, 5);\n                setTimeout(this.property2, 5);\n                setTimeout(this.property3, 5);\n            };\n        }\n    }\n}\n";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, []);
    });
    it('should pass when function parameter is Function', function () {
        var script = "\n            function(callback: Function) {\n                setTimeout(callback, 0);\n            }";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, script, []);
    });
    it('should support type inference on shadowed variables', function () {
        var inputFile = "\nvar globalProp1: () => void;\nvar globalProp2 = () => {};\nvar globalProp3 = function () {};\n\nfunction globalFunction1() {}\n\nmodule SetTimeoutModule {\n\n    var moduleProp1: () => void;\n    var moduleProp2 = () => {};\n    var moduleProp3 = function () {};\n\n    var globalProp1: any;                   // ! shadow !\n    var globalFunction1 = 'not a function'; // ! shadow !\n\n    function moduleFunction1(globalProp2: any, moduleProp1: any) {        // ! shadow !\n        setTimeout(moduleProp1, 5);         // should fail\n        setTimeout(moduleProp2, 5);         // should pass\n        setTimeout(globalFunction1, 5);     // should fail\n        setTimeout(globalProp2, 5);         // should fail\n    }\n\n    class View {\n\n        constructor(moduleProp1, globalProp3) {\n            setTimeout(globalProp1, 5);     // should fail\n            setTimeout(moduleProp1, 5);     // should fail\n            setTimeout(globalProp2, 5);     // should pass\n        }\n\n        private method2(globalProp3: any): void {   // ! shadow !\n            var f = function(moduleProp1) {         // ! shadow !\n                var x = (moduleProp2) => {\n                    setTimeout(globalProp1, 5);     // should fail\n                    setTimeout(globalProp2, 5);     // should pass\n                    setTimeout(globalProp3, 5);     // should fail\n                    setTimeout(globalFunction1, 5); // should fail\n\n                    setTimeout(moduleProp1, 5);     // should fail\n                    setTimeout(moduleProp2, 5);     // should fail\n                    setTimeout(moduleProp3, 5);     // should pass\n                }\n            };\n        }\n\n        public set someSetter(moduleProp1: string) {\n            setTimeout(moduleProp1, 5);     // should fail\n        }\n    }\n}\n";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "failure": "Forbidden setTimeout string parameter: moduleProp1",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "character": 9, "line": 18 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: globalFunction1",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "character": 9, "line": 20 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: globalProp2",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "character": 9, "line": 21 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: globalProp1",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "character": 13, "line": 27 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: moduleProp1",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "character": 13, "line": 28 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: globalProp1",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "character": 21, "line": 35 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: globalProp3",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "character": 21, "line": 37 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: globalFunction1",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "character": 21, "line": 38 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: moduleProp1",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "character": 21, "line": 40 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: moduleProp2",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "character": 21, "line": 41 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: moduleProp1",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "character": 13, "line": 48 }
            }
        ]);
    });
    it('should not throw error - case 3', function () {
        var inputFile = 'test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutTestInput-error3.ts';
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, []);
    });
    it('should not throw error - case 4', function () {
        var inputFile = 'test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutTestInput-error4.ts';
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "failure": "Forbidden setTimeout string parameter: this.onAnimationEnd()",
                "name": "test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutTestInput-error4.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "line": 11, "character": 13 }
            }
        ]);
    });
    it('should not throw error - case 5', function () {
        var inputFile = 'test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutTestInput-error5.ts';
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, []);
    });
    it('should not produce violations', function () {
        var inputFile = "\nvar functionVariable = () => {};\nvar createFunction : () => (() => void) = () => {}; // function that produces a function\n\n// lambdas are OK\nsetTimeout(() => {});\nthis.setTimeout(() => {});\nwindow.setTimeout(() => {});\n// functions are OK\nsetTimeout(function () {});\nthis.setTimeout(function () {});\nwindow.setTimeout(function () {});\n// expressions of type function are OK\nsetTimeout(functionVariable);\nthis.setTimeout(functionVariable);\nwindow.setTimeout(functionVariable);\nvar a = setTimeout(functionVariable);\nvar b = this.setTimeout(functionVariable);\nvar c = window.setTimeout(functionVariable);\nsetTimeout(createFunction());\nthis.setTimeout(createFunction());\nwindow.setTimeout(createFunction());\n";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, []);
    });
    it('should produce violations for string literals', function () {
        var inputFile = 'test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-string-literals.ts';
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "ruleName": "no-string-based-set-timeout",
                "failure": "Forbidden setTimeout string parameter: \"var x = 'should fail'\"",
                "name": "test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-string-literals.ts",
                "startPosition": { "line": 3, "character": 1 }
            },
            {
                "ruleName": "no-string-based-set-timeout",
                "failure": "Forbidden setTimeout string parameter: \"var x = 'should fail'\"",
                "name": "test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-string-literals.ts",
                "startPosition": { "line": 4, "character": 1 }
            },
            {
                "ruleName": "no-string-based-set-timeout",
                "failure": "Forbidden setTimeout string parameter: \"var x = 'should fail'\"",
                "name": "test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-string-literals.ts",
                "startPosition": { "line": 5, "character": 1 }
            }
        ]);
    });
    it('should produce violations for string variables', function () {
        var inputFile = 'test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-string-variables.ts';
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "ruleName": "no-string-based-set-timeout",
                "failure": "Forbidden setTimeout string parameter: typedStringVariable",
                "name": "test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-string-variables.ts",
                "startPosition": { "line": 4, "character": 1 }
            },
            {
                "ruleName": "no-string-based-set-timeout",
                "failure": "Forbidden setTimeout string parameter: typedStringVariable",
                "name": "test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-string-variables.ts",
                "startPosition": { "line": 5, "character": 1 }
            },
            {
                "ruleName": "no-string-based-set-timeout",
                "failure": "Forbidden setTimeout string parameter: typedStringVariable",
                "name": "test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-string-variables.ts",
                "startPosition": { "line": 6, "character": 1
                }
            }
        ]);
    });
    it('should produce violations for any variables', function () {
        var inputFile = 'test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-any-variables.ts';
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "ruleName": "no-string-based-set-timeout",
                "name": "test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-any-variables.ts",
                "failure": "Forbidden setTimeout string parameter: anyVariable",
                "startPosition": { "line": 4, "character": 1 }
            },
            {
                "ruleName": "no-string-based-set-timeout",
                "name": "test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-any-variables.ts",
                "failure": "Forbidden setTimeout string parameter: anyVariable",
                "startPosition": { "line": 5, "character": 1 }
            },
            {
                "ruleName": "no-string-based-set-timeout",
                "failure": "Forbidden setTimeout string parameter: anyVariable",
                "name": "test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-any-variables.ts",
                "startPosition": { "line": 6, "character": 1 }
            }
        ]);
    });
    it('should produce violations for any functions', function () {
        var inputFile = 'test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-any-functions.ts';
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "failure": "Forbidden setTimeout string parameter: untypedCreateFunction()",
                "name": "test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-any-functions.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "line": 4, "character": 1 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: untypedCreateFunction()",
                "name": "test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-any-functions.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "line": 5, "character": 1 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: untypedCreateFunction()",
                "name": "test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-any-functions.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "line": 6, "character": 1 }
            }
        ]);
    });
    it('should produce violations for string functions', function () {
        var inputFile = 'test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-string-functions.ts';
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "failure": "Forbidden setTimeout string parameter: stringFunction()",
                "name": "test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-string-functions.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "line": 4, "character": 1 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: stringFunction()",
                "name": "test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-string-functions.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "line": 5, "character": 1 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: stringFunction()",
                "name": "test-data/NoStringBasedSetTimeout/NoStringBasedSetTimeoutFailingTestInput-string-functions.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "line": 6, "character": 1 }
            }
        ]);
    });
    it('should produce violations for parameters', function () {
        var inputFile = "\n// these should all create violations\nfunction invoke2(stringArg : string) {\n    setTimeout(stringArg);                  // example 16\n}\nfunction invoke3(anyArg : any) {\n    setTimeout(anyArg);                     // example 17\n}\n";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "failure": "Forbidden setTimeout string parameter: stringArg",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "line": 4, "character": 5 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: anyArg",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "line": 7, "character": 5 }
            }
        ]);
    });
    it('should not produce violations what used to be a false positive case', function () {
        var inputFile = "\n        function invoke(functionArg1 : () => void, functionArg2 = () => {}) {\n            setTimeout(functionArg1);\n            setTimeout(functionArg2);\n        }";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, []);
    });
    it('should not fail within a constructor', function () {
        var inputFile = "\n        class MyClass {\n            constructor(arg1) {\n                setTimeout(arg1, 5);\n            }\n        }";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "failure": "Forbidden setTimeout string parameter: arg1",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "character": 17, "line": 4 }
            }
        ]);
    });
    it('should create violations on template strings', function () {
        var inputFile = "var data = 'alert(1)';\n$window.setTimeout(`${data}`, 200);";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "failure": "Forbidden setTimeout string parameter: `${data}`",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "character": 1, "line": 2 }
            }
        ]);
    });
    it('should pass all Issue #46 usages', function () {
        var inputFile = "class TestClassIssue46 {\n\n    constructor(private $window: angular.IWindowService) {\n\n        //Arrow Functions\n        setTimeout(() => { }, 100);\n        $window.setTimeout(() => { }, 100);\n\n        //Standard Functions\n        setTimeout(function () { }, 100);\n        $window.setTimeout(function () { }, 100);\n\n        //Strings\n        const alertNum = 1;\n        setTimeout(\"alert(\" + alertNum + \")\", 100);\n        $window.setTimeout(\"alert(\" + alertNum + \")\", 100);\n\n        //TS Template Strings\n        setTimeout(`alert(${alertNum})`, 100);\n        $window.setTimeout(`alert(${alertNum})`, 100);\n    }\n}";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "failure": "Forbidden setTimeout string parameter: \"alert(\" + alertNum + \")\"",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "character": 9, "line": 15 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: \"alert(\" + alertNum + \")\"",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "character": 9, "line": 16 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: `alert(${alertNum})`",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "character": 9, "line": 19 }
            },
            {
                "failure": "Forbidden setTimeout string parameter: `alert(${alertNum})`",
                "name": "file.ts",
                "ruleName": "no-string-based-set-timeout",
                "startPosition": { "character": 9, "line": 20 }
            }
        ]);
    });
});
