"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('insecureRandomRule', function () {
    var ruleName = 'insecure-random';
    it('should pass on non related functions', function () {
        var script = "\n            import crypto = require('crypto')\n            Math.abs(x)\n            crypto.randomBytes(2)\n            window.crypto.getRandomValues()\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on Math.random', function () {
        var script = "\n            Math.random();\n            const x = Math.random;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Math.random produces insecure random numbers. " +
                    "Use crypto.randomBytes() or window.crypto.getRandomValues() instead",
                "name": "file.ts",
                "ruleName": "insecure-random",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Math.random produces insecure random numbers. " +
                    "Use crypto.randomBytes() or window.crypto.getRandomValues() instead",
                "name": "file.ts",
                "ruleName": "insecure-random",
                "startPosition": { "character": 23, "line": 3 }
            }
        ]);
    });
    it('should fail on pseudoRandomBytes', function () {
        var script = "\n            import crypto = require('crypto')\n\n            crypto.pseudoRandomBytes(0);\n            const x = crypto.pseudoRandomBytes;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "crypto.pseudoRandomBytes produces insecure random numbers. Use crypto.randomBytes() instead",
                "name": "file.ts",
                "ruleName": "insecure-random",
                "startPosition": { "character": 13, "line": 4 }
            },
            {
                "failure": "crypto.pseudoRandomBytes produces insecure random numbers. Use crypto.randomBytes() instead",
                "name": "file.ts",
                "ruleName": "insecure-random",
                "startPosition": { "character": 23, "line": 5 }
            }
        ]);
    });
});
