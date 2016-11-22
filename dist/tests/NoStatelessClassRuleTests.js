"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noStatelessClassRule', function () {
    var ruleName = 'no-stateless-class';
    it('should pass on when class has some state', function () {
        var script = "\n            // classes with instance fields have state\n            class ClassWithField {\n                private field;\n            }\n\n            // classes with instance methods have state\n            class ClassWithMethod {\n                private someMethod() {\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when class has parent', function () {
        var script = "\n            class ClassWithParent extends MyOtherClass {\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when class has parent and parent interface', function () {
        var script = "\n            // classes that extend others have state from parent\n            class ClassWithParentAndInterface implements MyInterface extends MyOtherClass {\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when constructor declares public properties', function () {
        var script = "\n            class Point {\n                constructor(public x: number, public y: number) { }\n            }";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when constructor declares protected properties', function () {
        var script = "\n            class Point {\n                constructor(protected x: number, protected y: number) { }\n            }";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when constructor declares private properties', function () {
        var script = "\n            class Point {\n                constructor(private x: number, private y: number) { }\n            }";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass when constructor declares readonly properties', function () {
        var script = "\n            class Point {\n                constructor(readonly x: number, readonly y: number) { }\n            }";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on empty class', function () {
        var script = "\n            // empty class can be a module instead\n            class MyClass {\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "A stateless class was found. This indicates a failure in the object model: MyClass",
                "name": "file.ts",
                "ruleName": "no-stateless-class",
                "startPosition": { "character": 13, "line": 3 }
            }
        ]);
    });
    it('should fail on empty class with only a constructor', function () {
        var script = "\n            // empty class can be a module instead\n            class MyClass {\n              constructor() {\n              }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "A stateless class was found. This indicates a failure in the object model: MyClass",
                "name": "file.ts",
                "ruleName": "no-stateless-class",
                "startPosition": { "character": 13, "line": 3 }
            }
        ]);
    });
    it('should fail on empty class that implements an interface', function () {
        var script = "\n            class MyClass implements MyInterface{\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "A stateless class was found. This indicates a failure in the object model: MyClass",
                "name": "file.ts",
                "ruleName": "no-stateless-class",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on class with only static fields', function () {
        var script = "\n            class MyClass {\n              private static field;\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "A stateless class was found. This indicates a failure in the object model: MyClass",
                "name": "file.ts",
                "ruleName": "no-stateless-class",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on class with only static methods', function () {
        var script = "\n            class MyClass {\n              private static myMethod() {\n              }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "A stateless class was found. This indicates a failure in the object model: MyClass",
                "name": "file.ts",
                "ruleName": "no-stateless-class",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
});
