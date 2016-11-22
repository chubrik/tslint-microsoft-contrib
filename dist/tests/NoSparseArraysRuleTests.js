"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noSparseArraysRule', function () {
    var ruleName = 'no-sparse-arrays';
    it('should pass on dense arrays', function () {
        var script = "\n            var a = [];\n            var b = [1];\n            var c = ['1', '2'];\n            var d = [true, false, true];\n            var e = [1,2,3,]; // dangling comma is not an issue\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on comma with no elements', function () {
        var script = "\n            var x = [,];\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unexpected comma in middle of array",
                "name": "file.ts",
                "ruleName": "no-sparse-arrays",
                "startPosition": { "character": 21, "line": 2 }
            }
        ]);
    });
    it('should fail on array with many commas', function () {
        var script = "\n            var x = [,,,];\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unexpected comma in middle of array",
                "name": "file.ts",
                "ruleName": "no-sparse-arrays",
                "startPosition": { "character": 21, "line": 2 }
            }
        ]);
    });
    it('should fail on array with elements and commas', function () {
        var script = "\n            var x = [,1,2,3];\n            var z = [1,,2,3];\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unexpected comma in middle of array",
                "name": "file.ts",
                "ruleName": "no-sparse-arrays",
                "startPosition": { "character": 21, "line": 2 }
            },
            {
                "failure": "Unexpected comma in middle of array",
                "name": "file.ts",
                "ruleName": "no-sparse-arrays",
                "startPosition": { "character": 21, "line": 3 }
            }
        ]);
    });
});
