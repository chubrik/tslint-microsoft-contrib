"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('possibleTimingAttackRule', function () {
    var ruleName = 'possible-timing-attack';
    it('should pass on non-direct comparisons', function () {
        var script = "\n            const a = password < secret;\n            const b = secret > api;\n            const c = api <= apiKey\n            const d = apiKey >= token;\n            const e = token < hash;\n            const f = auth > hash;\n            const g = pass <= hash;\n            const h = hash >= secret;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on null and undefined comparisons', function () {
        var script = "\n            const a1 = password === null;\n            const a2 = password == null;\n            const a3 = password !== null;\n            const a4 = password != null;\n            const a5 = null === secret;\n            const a6 = null == secret;\n            const a7 = null !== secret;\n            const a8 = null != secret;\n\n            const b1 = apiKey === undefined;\n            const b2 = apiKey == undefined;\n            const b3 = apiKey !== undefined;\n            const b4 = apiKey != undefined;\n            const b5 = undefined === token;\n            const b6 = undefined == token;\n            const b7 = undefined !== token;\n            const b8 = undefined != token;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on == comparisons', function () {
        var script = "\n            const a = password == secret;\n            const b = secret == api;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Possible timing attack detected. Direct comparison found: password == secret",
                "name": "file.ts",
                "ruleName": "possible-timing-attack",
                "startPosition": { "character": 23, "line": 2 }
            },
            {
                "failure": "Possible timing attack detected. Direct comparison found: secret == api",
                "name": "file.ts",
                "ruleName": "possible-timing-attack",
                "startPosition": { "character": 23, "line": 3 }
            }
        ]);
    });
    it('should fail on === comparisons', function () {
        var script = "\n            const c = api === apiKey\n            const d = apiKey === token;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Possible timing attack detected. Direct comparison found: api === apiKey",
                "name": "file.ts",
                "ruleName": "possible-timing-attack",
                "startPosition": { "character": 23, "line": 2 }
            },
            {
                "failure": "Possible timing attack detected. Direct comparison found: apiKey === token",
                "name": "file.ts",
                "ruleName": "possible-timing-attack",
                "startPosition": { "character": 23, "line": 3 }
            }
        ]);
    });
    it('should fail on != comparisons', function () {
        var script = "\n            const e = token != hash;\n            const f = auth != hash;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Possible timing attack detected. Direct comparison found: token != hash",
                "name": "file.ts",
                "ruleName": "possible-timing-attack",
                "startPosition": { "character": 23, "line": 2 }
            },
            {
                "failure": "Possible timing attack detected. Direct comparison found: auth != hash",
                "name": "file.ts",
                "ruleName": "possible-timing-attack",
                "startPosition": { "character": 23, "line": 3 }
            }
        ]);
    });
    it('should fail on !== comparisons', function () {
        var script = "\n            const g = pass !== hash;\n            const h = hash !== secret;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Possible timing attack detected. Direct comparison found: pass !== hash",
                "name": "file.ts",
                "ruleName": "possible-timing-attack",
                "startPosition": { "character": 23, "line": 2 }
            },
            {
                "failure": "Possible timing attack detected. Direct comparison found: hash !== secret",
                "name": "file.ts",
                "ruleName": "possible-timing-attack",
                "startPosition": { "character": 23, "line": 3 }
            }
        ]);
    });
});
