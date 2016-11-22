"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('useIsnanRule', function () {
    var ruleName = 'use-isnan';
    it('should pass on xxx', function () {
        var script = "\n        if (isNaN(NaN)) { }\n        if (isNaN(something)) { }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on equality NaN', function () {
        var script = "\n        if (foo == NaN) {  }\n        if (NaN === foo) {  }\n        if (foo != NaN) {  }\n        if (NaN !== foo) {  }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found an invalid comparison for NaN: foo == NaN",
                "name": "file.ts",
                "ruleName": "use-isnan",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found an invalid comparison for NaN: NaN === foo",
                "name": "file.ts",
                "ruleName": "use-isnan",
                "startPosition": { "character": 13, "line": 3 }
            },
            {
                "failure": "Found an invalid comparison for NaN: foo != NaN",
                "name": "file.ts",
                "ruleName": "use-isnan",
                "startPosition": { "character": 13, "line": 4 }
            },
            {
                "failure": "Found an invalid comparison for NaN: NaN !== foo",
                "name": "file.ts",
                "ruleName": "use-isnan",
                "startPosition": { "character": 13, "line": 5 }
            }
        ]);
    });
    it('should fail on other binary expressions', function () {
        var script = "\n        if (foo > NaN) { }\n        if (NaN >= foo) { }\n        if (foo < NaN) { }\n        if (NaN <= foo) { }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found an invalid comparison for NaN: foo > NaN",
                "name": "file.ts",
                "ruleName": "use-isnan",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found an invalid comparison for NaN: NaN >= foo",
                "name": "file.ts",
                "ruleName": "use-isnan",
                "startPosition": { "character": 13, "line": 3 }
            },
            {
                "failure": "Found an invalid comparison for NaN: foo < NaN",
                "name": "file.ts",
                "ruleName": "use-isnan",
                "startPosition": { "character": 13, "line": 4 }
            },
            {
                "failure": "Found an invalid comparison for NaN: NaN <= foo",
                "name": "file.ts",
                "ruleName": "use-isnan",
                "startPosition": { "character": 13, "line": 5 }
            }
        ]);
    });
});
