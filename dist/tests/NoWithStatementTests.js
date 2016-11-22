"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noWithStatementsRule', function () {
    it('should produce violations', function () {
        var ruleName = 'no-with-statement';
        var script = "\n            with ({}) {\n                a = 1;\n                b = 2;\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Forbidden with statement",
                "name": "file.ts",
                "ruleName": "no-with-statement",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
});
