"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noUnnecessaryOverrideRule', function () {
    var ruleName = 'no-unnecessary-override';
    describe('should pass', function () {
        it('when adding a parameter', function () {
            var script = "\n                class MyClass {\n                    private myField;\n                    myMethod1() {\n                        super.myMethod1(this.myField);\n                    }\n                    myMethod2() {\n                        return super.myMethod2(this.myField);\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when negating result', function () {
            var script = "\n                class MyClass {\n                    myMethod() {\n                        -super.myMethod();\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when removing a parameter', function () {
            var script = "\n                class MyClass {\n                    myMethod1(arg1, arg2) {\n                        super.myMethod1(arg1);\n                    }\n                    myMethod2(arg1, arg2) {\n                        return super.myMethod2(arg1);\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when transposing parameters', function () {
            var script = "\n                class MyClass {\n                    myMethod(arg1, arg2) {\n                        super.myMethod(arg2, arg1);\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when changing a parameter', function () {
            var script = "\n                class MyClass {\n                    myMethod(arg1, arg2) {\n                        super.myMethod(arg1, arg2 * 2);\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when adding statements before ', function () {
            var script = "\n                class MyClass {\n                    myMethod() {\n                        console.log('some logging...');\n                        super.myMethod();\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when adding statements after', function () {
            var script = "\n                class MyClass {\n                    myMethod() {\n                        super.myMethod();\n                        console.log('some logging...');\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when calling different methods', function () {
            var script = "\n                class MyClass {\n                    myMethod() {\n                        super.notMyMethod();\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
    });
    describe('should fail', function () {
        it('should fail on calling super with 0 args and no return', function () {
            var script = "\n                class MyClass {\n                    myMethod() {\n                        super.myMethod();\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Unnecessary method override. A method that only calls super can be removed: myMethod",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-override",
                    "startPosition": { "character": 21, "line": 3 }
                }
            ]);
        });
        it('should fail on calling super with 0 args and return', function () {
            var script = "\n                class MyClass {\n                    myMethod() {\n                        return super.myMethod();\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Unnecessary method override. A method that only calls super can be removed: myMethod",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-override",
                    "startPosition": { "character": 21, "line": 3 }
                }
            ]);
        });
        it('should fail on calling super with argument', function () {
            var script = "\n                class MyClass {\n                    myMethod(arg1) {\n                        super.myMethod(arg1);\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Unnecessary method override. A method that only calls super can be removed: myMethod",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-override",
                    "startPosition": { "character": 21, "line": 3 }
                }
            ]);
        });
        it('should fail on calling super with two arguments', function () {
            var script = "\n                class MyClass {\n                    myMethod(arg1, arg2) {\n                        super.myMethod(arg1, arg2);\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Unnecessary method override. A method that only calls super can be removed: myMethod",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-override",
                    "startPosition": { "character": 21, "line": 3 }
                }
            ]);
        });
        it('should fail on calling super with default arguments', function () {
            var script = "\n                class MyClass {\n                    myMethod(arg1 = true, arg2 = false) {\n                        super.myMethod(arg1, arg2);\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Unnecessary method override. A method that only calls super can be removed: myMethod",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-override",
                    "startPosition": { "character": 21, "line": 3 }
                }
            ]);
        });
        it('should fail on calling super with comments involved', function () {
            var script = "\n                class MyClass {\n                    myMethod() {\n                        // here is a line comment\n                        return super.myMethod();\n                        // here is another line comment\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Unnecessary method override. A method that only calls super can be removed: myMethod",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-override",
                    "startPosition": { "character": 21, "line": 3 }
                }
            ]);
        });
        it('should not fail on empty void method', function () {
            var script = "\n                class BaseComponent {\n                    public function1(): void { return; }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
    });
});
