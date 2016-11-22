"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('validTypeofRule', function () {
    var ruleName = 'valid-typeof';
    it('should pass on valid typeofs', function () {
        var script = "\n            typeof bar === \"undefined\"\n            typeof bar == \"undefined\"\n            typeof bar !== \"undefined\"\n            typeof bar != \"undefined\"\n            \"undefined\" === typeof bar\n            typeof foo === \"object\"\n            typeof foo === \"boolean\"\n            typeof foo === \"number\"\n            typeof foo === \"string\"\n            \"function\" === typeof foo\n            typeof foo == baz\n            typeof bar === typeof qux\n            typeof Symbol() === \"symbol\"\n            typeof Symbol(\"foo\") === \"symbol\"\n            typeof Symbol.iterator === \"symbol\"\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on invalid string with ===', function () {
        var script = "\n            typeof foo === \"strnig\"\n            \"strnig\" === typeof foo\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Invalid comparison in typeof. Did you mean string?",
                "name": "file.ts",
                "ruleName": "valid-typeof",
                "startPosition": { "character": 28, "line": 2 }
            },
            {
                "failure": "Invalid comparison in typeof. Did you mean string?",
                "name": "file.ts",
                "ruleName": "valid-typeof",
                "startPosition": { "character": 13, "line": 3
                }
            }
        ]);
    });
    it('should fail on invalid string with ==', function () {
        var script = "\n            typeof foo == \"funcion\"\n            \"fction\" == typeof foo\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Invalid comparison in typeof. Did you mean function?",
                "name": "file.ts",
                "ruleName": "valid-typeof",
                "startPosition": { "character": 27, "line": 2 }
            },
            {
                "failure": "Invalid comparison in typeof. Did you mean function?",
                "name": "file.ts",
                "ruleName": "valid-typeof",
                "startPosition": { "character": 13, "line": 3 }
            }
        ]);
    });
    it('should fail on invalid string with !==', function () {
        var script = "\n            typeof foo !== \"undfind\"\n            \"ndefined\" !== typeof foo\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Invalid comparison in typeof. Did you mean undefined?",
                "name": "file.ts",
                "ruleName": "valid-typeof",
                "startPosition": { "character": 28, "line": 2 }
            },
            {
                "failure": "Invalid comparison in typeof. Did you mean undefined?",
                "name": "file.ts",
                "ruleName": "valid-typeof",
                "startPosition": { "character": 13, "line": 3 }
            }
        ]);
    });
    it('should fail on invalid string with !=', function () {
        var script = "\n            typeof foo != \"bollean\"\n            \"bollen\" != typeof foo\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Invalid comparison in typeof. Did you mean boolean?",
                "name": "file.ts",
                "ruleName": "valid-typeof",
                "startPosition": { "character": 27, "line": 2 }
            },
            {
                "failure": "Invalid comparison in typeof. Did you mean boolean?",
                "name": "file.ts",
                "ruleName": "valid-typeof",
                "startPosition": { "character": 13, "line": 3 }
            }
        ]);
    });
});
