"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('unnecessaryLocalVariableRule', function () {
    var ruleName = 'no-unnecessary-local-variable';
    it('should pass on good usages', function () {
        var script = "\n            class MyClass {\n                private myMethod1() {\n                    let x = 1;\n                    return y;\n                }\n                private myMethod2() {\n                    let y = 1;\n                    return x;\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on class function', function () {
        var script = "\n            class MyClass {\n                private myMethod() {\n                    let x = 1;\n                    return x;\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unnecessary local variable: x",
                "name": "file.ts",
                "ruleName": "no-unnecessary-local-variable",
                "startPosition": { "character": 21, "line": 4 }
            }
        ]);
    });
    it('should fail on if statement inside function', function () {
        var script = "\n            class MyClass {\n                private myMethod() {\n                    if (foo) {\n                        let x = 1;\n                        return x;\n                    }\n                    return x;\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unnecessary local variable: x",
                "name": "file.ts",
                "ruleName": "no-unnecessary-local-variable",
                "startPosition": { "character": 25, "line": 5 }
            }
        ]);
    });
    it('should fail on statements inside source file', function () {
        var script = "\n            let x = 1;\n            return x;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unnecessary local variable: x",
                "name": "file.ts",
                "ruleName": "no-unnecessary-local-variable",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on statements inside module', function () {
        var script = "\n            module MyModule {\n                let x = 1;\n                return x;\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unnecessary local variable: x",
                "name": "file.ts",
                "ruleName": "no-unnecessary-local-variable",
                "startPosition": { "character": 17, "line": 3 }
            }
        ]);
    });
    it('should fail on statements inside case clause', function () {
        var script = "\n            switch (whatever) {\n                case 1:\n                    let x = 1;\n                    return x;\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unnecessary local variable: x",
                "name": "file.ts",
                "ruleName": "no-unnecessary-local-variable",
                "startPosition": { "character": 21, "line": 4 }
            }
        ]);
    });
    it('should fail on statements inside default clause of switch statement', function () {
        var script = "\n            switch (whatever) {\n                default:\n                    let x = 1;\n                    return x;\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unnecessary local variable: x",
                "name": "file.ts",
                "ruleName": "no-unnecessary-local-variable",
                "startPosition": { "character": 21, "line": 4 }
            }
        ]);
    });
});
