"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noControlRegexRule', function () {
    var ruleName = 'no-control-regex';
    it('should pass on chars higher than x20', function () {
        var script = "\n            var pattern1 = /\\x20/;\n            var pattern2 = /\\x21/;\n            var pattern3 = /\\x30/;\n            var pattern4 = /\\x31/;\n            var pattern5 = /\\x20/;\n            var pattern6 = new RegExp(\"\\x20\");\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on x1f', function () {
        var script = "\n            var pattern1 = /\\x1f/;\n            var pattern2 = new RegExp(\"something \\x1f something else\");\n            var pattern3 = RegExp(\"\\x1f trailing text\");\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unexpected control character in regular expression",
                "name": "file.ts",
                "ruleName": "no-control-regex",
                "startPosition": { "character": 28, "line": 2 }
            },
            {
                "failure": "Unexpected control character in regular expression",
                "name": "file.ts",
                "ruleName": "no-control-regex",
                "startPosition": { "character": 39, "line": 3 }
            },
            {
                "failure": "Unexpected control character in regular expression",
                "name": "file.ts",
                "ruleName": "no-control-regex",
                "startPosition": { "character": 35, "line": 4 }
            }
        ]);
    });
    it('should fail on x00', function () {
        var script = "\n            var pattern1 = /\\x00/;\n            var pattern2 = new RegExp(\"\\x00\");\n            var pattern3 = RegExp(\"\\x00\");\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unexpected control character in regular expression",
                "name": "file.ts",
                "ruleName": "no-control-regex",
                "startPosition": { "character": 28, "line": 2 }
            },
            {
                "failure": "Unexpected control character in regular expression",
                "name": "file.ts",
                "ruleName": "no-control-regex",
                "startPosition": { "character": 39, "line": 3 }
            },
            {
                "failure": "Unexpected control character in regular expression",
                "name": "file.ts",
                "ruleName": "no-control-regex",
                "startPosition": { "character": 35, "line": 4 }
            }
        ]);
    });
});
