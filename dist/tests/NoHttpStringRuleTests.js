"use strict";
/* tslint:disable:no-http-string */
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noHttpStringRule', function () {
    var ruleName = 'no-http-string';
    it('should ban http strings in variables', function () {
        var inputScript = 'var x = \'http://www.examples.com\'';
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, [
            {
                "failure": "Forbidden http url in string: 'http://www.examples.com'",
                "name": "file.ts",
                "ruleName": ruleName,
                "startPosition": { "character": 9, "line": 1 }
            }
        ]);
    });
    it('should ban http strings in default values', function () {
        var inputScript = 'function f(x : string = \'http://www.example.com/whatever\') {}';
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, [
            {
                "failure": "Forbidden http url in string: 'http://www.example.com/whatever'",
                "name": "file.ts",
                "ruleName": ruleName,
                "startPosition": { "character": 25, "line": 1 }
            }
        ]);
    });
    it('should allow https strings in variables', function () {
        var inputScript = 'var x = \'https://www.microsoft.com\'';
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
    });
    it('should allow https strings in default values', function () {
        var inputScript = 'function f(x : string = \'https://www.microsoft.com\') {}';
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
    });
    it('should allow http strings in that match the exclude regex', function () {
        var inputScript = 'var x = "http://www.allowed.com"';
        var excludeRules = ["http://www\\.allowed\\.com/?"];
        TestHelper_1.TestHelper.assertNoViolationWithOptions(ruleName, excludeRules, inputScript);
    });
    it('should disallow http strings in that do not match the exclude regex', function () {
        var inputScript = 'var x = "http://www.notallowed.com"';
        var excludeRules = ["http://www\\.allowed\\.com/?"];
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, excludeRules, inputScript, [{
                "failure": "Forbidden http url in string: 'http://www.notallowed.com'",
                "name": "file.ts",
                "ruleName": ruleName,
                "startPosition": {
                    "character": 9,
                    "line": 1
                }
            }]);
    });
});
/* tslint:enable:no-http-string */ 
