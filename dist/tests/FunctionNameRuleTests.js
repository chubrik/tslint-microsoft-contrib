"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('functionNameRule', function () {
    var ruleName = 'function-name';
    it('should pass on correctly named functions', function () {
        var script = "\n            function foo() {}\n            class MyClass {\n                foo() {}\n                foo1() {}\n                myFoo() {}\n                myFoo1() {}\n\n                private bar() {}\n                private bar1() {}\n                private myBar() {}\n                private myBar1() {}\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on correctly public static methods', function () {
        var script = "\n            class MyClass {\n                static FOO() {}\n                static FOO_BAR() {}\n                static FOO_2() {}\n                static FO__O() {}\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on correctly private static methods', function () {
        var script = "\n            class MyClass {\n                private static bar() {}\n                private static bar1() {}\n                private static myBar() {}\n                private static myBar1() {}\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on correctly protected static methods', function () {
        var script = "\n            class MyClass {\n                protected static bar() {}\n                protected static bar1() {}\n                protected static myBar() {}\n                protected static myBar1() {}\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on incorrect public methods', function () {
        var script = "\n            class MyClass {\n                Foo() {}\n                _foo() {}\n                FOO() {}\n                _FOO() {}\n                _foo() {}\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Method name does not match /^[a-z][\\w\\d]+$/: Foo",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 17, "line": 3 }
            },
            {
                "failure": "Method name does not match /^[a-z][\\w\\d]+$/: _foo",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 17, "line": 4 }
            },
            {
                "failure": "Method name does not match /^[a-z][\\w\\d]+$/: FOO",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 17, "line": 5 }
            },
            {
                "failure": "Method name does not match /^[a-z][\\w\\d]+$/: _FOO",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 17, "line": 6 }
            },
            {
                "failure": "Method name does not match /^[a-z][\\w\\d]+$/: _foo",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 17, "line": 7 }
            }
        ]);
    });
    it('should fail on incorrect private methods', function () {
        var script = "\n            class MyClass {\n                private Foo() {}\n                private _foo() {}\n                private FOO() {}\n                private _FOO() {}\n                private _foo() {}\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Private method name does not match /^[a-z][\\w\\d]+$/: Foo",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 25, "line": 3 }
            },
            {
                "failure": "Private method name does not match /^[a-z][\\w\\d]+$/: _foo",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 25, "line": 4 }
            },
            {
                "failure": "Private method name does not match /^[a-z][\\w\\d]+$/: FOO",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 25, "line": 5 }
            },
            {
                "failure": "Private method name does not match /^[a-z][\\w\\d]+$/: _FOO",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 25, "line": 6 }
            },
            {
                "failure": "Private method name does not match /^[a-z][\\w\\d]+$/: _foo",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 25, "line": 7 }
            }
        ]);
    });
    it('should fail on incorrect protected methods', function () {
        var script = "\n            class MyClass {\n                protected Foo() {}\n                protected _foo() {}\n                protected FOO() {}\n                protected _FOO() {}\n                protected _foo() {}\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Protected method name does not match /^[a-z][\\w\\d]+$/: Foo",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 27, "line": 3 }
            },
            {
                "failure": "Protected method name does not match /^[a-z][\\w\\d]+$/: _foo",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 27, "line": 4 }
            },
            {
                "failure": "Protected method name does not match /^[a-z][\\w\\d]+$/: FOO",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 27, "line": 5 }
            },
            {
                "failure": "Protected method name does not match /^[a-z][\\w\\d]+$/: _FOO",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 27, "line": 6 }
            },
            {
                "failure": "Protected method name does not match /^[a-z][\\w\\d]+$/: _foo",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 27, "line": 7 }
            }
        ]);
    });
    it('should fail on incorrect static methods', function () {
        var script = "\n            class MyClass {\n                static Foo() {}\n                static _foo() {}\n                static _foo2() {}\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Static method name does not match /^[A-Z_\\d]+$/: Foo",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 24, "line": 3 }
            },
            {
                "failure": "Static method name does not match /^[A-Z_\\d]+$/: _foo",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 24, "line": 4 }
            },
            {
                "failure": "Static method name does not match /^[A-Z_\\d]+$/: _foo2",
                "name": "file.ts",
                "ruleName": "function-name",
                "startPosition": { "character": 24, "line": 5 }
            }
        ]);
    });
    describe('reading options', function () {
        var options;
        beforeEach(function () {
            options = [true,
                {
                    'method-regex': '^myMethod$',
                    'private-method-regex': '^myPrivateMethod$',
                    'static-method-regex': '^myStaticMethod$',
                    'function-regex': '^myFunction$'
                }
            ];
        });
        it('should allow passing names', function () {
            var script = "\n            function myFunction() {}\n            class MyClass {\n                myMethod() {}\n                private myPrivateMethod() {}\n                static myStaticMethod() {}\n            }";
            TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, options, script, []);
        });
        it('should ban non-passing names', function () {
            var script = "\n            function notMyFunction() {}\n            class MyClass {\n                notMyMethod() {}\n                private notMyPrivateMethod() {}\n                static notMyStaticMethod() {}\n            }";
            TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, options, script, [
                {
                    "failure": "Function name does not match /^myFunction$/: notMyFunction",
                    "name": "file.ts",
                    "ruleName": "function-name",
                    "startPosition": { "character": 22, "line": 2 }
                },
                {
                    "failure": "Method name does not match /^myMethod$/: notMyMethod",
                    "name": "file.ts",
                    "ruleName": "function-name",
                    "startPosition": { "character": 17, "line": 4 }
                },
                {
                    "failure": "Private method name does not match /^myPrivateMethod$/: notMyPrivateMethod",
                    "name": "file.ts",
                    "ruleName": "function-name",
                    "startPosition": { "character": 25, "line": 5 }
                },
                {
                    "failure": "Static method name does not match /^myStaticMethod$/: notMyStaticMethod",
                    "name": "file.ts",
                    "ruleName": "function-name",
                    "startPosition": { "character": 24, "line": 6 }
                }
            ]);
        });
    });
});
