"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noFunctionConstructorWithStringArgsRule', function () {
    var RULE_NAME = 'no-function-constructor-with-string-args';
    it('should produce violations ', function () {
        var inputFile = 'test-data/NoFunctionConstructorWithStringArgsTestInput.ts';
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "failure": "forbidden: Function constructor with string arguments ",
                "name": "test-data/NoFunctionConstructorWithStringArgsTestInput.ts",
                "ruleName": "no-function-constructor-with-string-args",
                "startPosition": {
                    "line": 1,
                    "character": 9
                }
            }
        ]);
    });
});
