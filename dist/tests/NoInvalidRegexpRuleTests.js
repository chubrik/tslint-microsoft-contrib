"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noInvalidRegexpRule', function () {
    var ruleName = 'no-invalid-regexp';
    it('should pass on valid input', function () {
        var script = "\n            var a = new RegExp('.');        // valid constructor\n            var b = RegExp('.');            // this is the constructor as well\n            var c = this.RegExp('[');       // clearly not the typescript RegExp object\n            var d = new RegExp(whatever);   // non-string literal parameter\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on invalid string in constuctor', function () {
        var script = "\n            new RegExp('\\\\') /*error Invalid regular expression: //:  at end of pattern*/\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Invalid regular expression: /\\/: \\ at end of pattern",
                "name": "file.ts",
                "ruleName": "no-invalid-regexp",
                "startPosition": { "character": 24, "line": 2 }
            }
        ]);
    });
    it('should fail on invalid string in function call', function () {
        var script = "\n            RegExp('[')      /*error Invalid regular expression: /[/: Unterminated character class*/\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Invalid regular expression: /[/: Unterminated character class",
                "name": "file.ts",
                "ruleName": "no-invalid-regexp",
                "startPosition": { "character": 20, "line": 2 }
            }
        ]);
    });
});
