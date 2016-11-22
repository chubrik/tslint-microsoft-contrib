"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('preferArrayLiteralRule', function () {
    var ruleName = 'prefer-array-literal';
    it('should allow string[] as variable type', function () {
        var inputScript = 'var x : string[];';
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
    });
    it('should allow Array type parameters when options say to ignore type params', function () {
        var inputScript = "\n            let myArray: Array<string> = [];\n\n            interface MyInterface {\n                myArray: Array<string>;\n            }        ";
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [true, { 'allow-type-parameters': true }], inputScript, []);
    });
    it('should ban Array<string> as variable type', function () {
        var inputScript = 'var x : Array<string>;';
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, [
            {
                "failure": "Replace generic-typed Array with array literal: Array<string>",
                "name": "file.ts",
                "ruleName": "prefer-array-literal",
                "startPosition": { "character": 9, "line": 1 }
            }
        ]);
    });
    it('should ban Array<string> as parameter type', function () {
        var inputScript = 'function (parm: Array<number>) {}';
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, [
            {
                "failure": "Replace generic-typed Array with array literal: Array<number>",
                "name": "file.ts",
                "ruleName": "prefer-array-literal",
                "startPosition": { "character": 17, "line": 1 }
            }
        ]);
    });
    it('should ban new Array() constructor', function () {
        var inputScript = 'new Array()';
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [true, { 'allow-type-parameters': true }], inputScript, [
            {
                "failure": "Replace Array constructor with an array literal: new Array()",
                "name": "file.ts",
                "ruleName": "prefer-array-literal",
                "startPosition": { "character": 1, "line": 1 }
            }
        ]);
    });
    it('should ban new Array(4, 5) constructor', function () {
        var inputScript = 'new Array(4, 5)';
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, [
            {
                "failure": "Replace Array constructor with an array literal: new Array(4, 5)",
                "name": "file.ts",
                "ruleName": "prefer-array-literal",
                "startPosition": { "character": 1, "line": 1 }
            }
        ]);
    });
    it('should ban new Array(4) constructor', function () {
        var inputScript = 'new Array(4)';
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, [
            {
                "failure": "Replace Array constructor with an array literal: new Array(4)",
                "name": "file.ts",
                "ruleName": "prefer-array-literal",
                "startPosition": { "character": 1, "line": 1 }
            }
        ]);
    });
});
