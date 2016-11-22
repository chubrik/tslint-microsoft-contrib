"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('preferTypeCastRule', function () {
    var ruleName = 'prefer-type-cast';
    it('should pass on traditional type cast', function () {
        var script = "\n            let myString = <string>myVariable;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on as-cast within a .tsx file', function () {
        TestHelper_1.TestHelper.assertViolations(ruleName, 'test-data/PreferTypeCastRuleTests-passing.tsx', []);
    });
    it('should fail on as-cast', function () {
        var script = "\n            let myString = myVariable as string;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found as-cast instead of a traditional type-cast. Please convert to a type-cast: myVariable as string",
                "name": "file.ts",
                "ruleName": "prefer-type-cast",
                "startPosition": { "character": 28, "line": 2 }
            }
        ]);
    });
});
