"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noDuplicateCaseRule', function () {
    var ruleName = 'no-duplicate-case';
    it('should pass on valid switch', function () {
        var script = "\n            var a = 1;\n\n            switch (a) {\n                case 1:\n                    break;\n                case 2:\n                    break;\n                default:\n                    break;\n            } ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on string duplicates', function () {
        var script = "\n            switch (a) {\n                case 1:\n                    break;\n                case 1:      /*error Duplicate case label.*/\n                    break;\n                case 2:\n                    break;\n                default:\n                    break;\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Duplicate case found in switch statement: 1",
                "name": "file.ts",
                "ruleName": "no-duplicate-case",
                "startPosition": { "character": 17, "line": 5 }
            }
        ]);
    });
    it('should fail on number duplicates', function () {
        var script = "\n            switch (a) {\n                case \"1\":\n                    break;\n                case \"1\":      /*error Duplicate case label.*/\n                    break;\n                case \"2\":\n                    break;\n                default:\n                    break;\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Duplicate case found in switch statement: \"1\"",
                "name": "file.ts",
                "ruleName": "no-duplicate-case",
                "startPosition": { "character": 17, "line": 5 }
            }
        ]);
    });
    it('should fail on identifier duplicates', function () {
        var script = "\n            switch (a) {\n                case one:\n                    break;\n                case one:      /*error Duplicate case label.*/\n                    break;\n                case two:\n                    break;\n                default:\n                    break;\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Duplicate case found in switch statement: one",
                "name": "file.ts",
                "ruleName": "no-duplicate-case",
                "startPosition": { "character": 17, "line": 5 }
            }
        ]);
    });
});
