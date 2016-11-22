"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noUnnecessarySemiColons', function () {
    var ruleName = 'no-unnecessary-semicolons';
    it('should produce violations', function () {
        var inputFile = 'test-data/NoUnnecessarySemicolonsTestInput.ts';
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, [
            {
                "failure": "unnecessary semi-colon",
                "name": "test-data/NoUnnecessarySemicolonsTestInput.ts",
                "ruleName": "no-unnecessary-semicolons",
                "startPosition": { "line": 2, "character": 1 }
            },
            {
                "failure": "unnecessary semi-colon",
                "name": "test-data/NoUnnecessarySemicolonsTestInput.ts",
                "ruleName": "no-unnecessary-semicolons",
                "startPosition": { "line": 3, "character": 1 }
            },
            {
                "failure": "unnecessary semi-colon",
                "name": "test-data/NoUnnecessarySemicolonsTestInput.ts",
                "ruleName": "no-unnecessary-semicolons",
                "startPosition": { "line": 3, "character": 2 }
            }
        ]);
    });
    it('should pass on empty while loops', function () {
        var script = "\n            while (false);\n        ";
        TestHelper_1.TestHelper.assertNoViolation(ruleName, script);
    });
    it('should fail on empty while loops with semicolon', function () {
        var script = "\n            while (false) {\n            };\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "unnecessary semi-colon",
                "name": "file.ts",
                "ruleName": "no-unnecessary-semicolons",
                "startPosition": { "character": 14, "line": 3 }
            }
        ]);
    });
    it('should pass on empty for loops', function () {
        var script = "\n            for (var i = 0; i < 7; i += 1);\n        ";
        TestHelper_1.TestHelper.assertNoViolation(ruleName, script);
    });
    it('should fail on empty for loops with semicolon', function () {
        var script = "\n            for (var i = 0; i < 7; i += 1) {\n            };\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "unnecessary semi-colon",
                "name": "file.ts",
                "ruleName": "no-unnecessary-semicolons",
                "startPosition": { "character": 14, "line": 3 }
            }
        ]);
    });
});
