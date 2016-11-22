"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noIncrementDecrementRule', function () {
    var RULE_NAME = 'no-increment-decrement';
    it('should produce violations ', function () {
        var inputFile = "\nvar x;\n\nx++;\nx--;\n++x;\n--x;\n\n";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "failure": "Forbidden ++ operator",
                "name": "file.ts",
                "ruleName": "no-increment-decrement",
                "startPosition": {
                    "line": 4,
                    "character": 1
                }
            },
            {
                "failure": "Forbidden -- operator",
                "name": "file.ts",
                "ruleName": "no-increment-decrement",
                "startPosition": {
                    "line": 5,
                    "character": 1
                }
            },
            {
                "failure": "Forbidden ++ operator",
                "name": "file.ts",
                "ruleName": "no-increment-decrement",
                "startPosition": {
                    "line": 6,
                    "character": 1
                }
            },
            {
                "failure": "Forbidden -- operator",
                "name": "file.ts",
                "ruleName": "no-increment-decrement",
                "startPosition": {
                    "line": 7,
                    "character": 1
                }
            }
        ]);
    });
});
