"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('mochaAvoidOnlyRule', function () {
    var ruleName = 'mocha-avoid-only';
    it('should pass when only is not invoked', function () {
        var script = "\n            describe('some unit test', () => {\n                it('some test', () => {\n                    // some test code\n                });\n\n                // these are not calls to mocha's it.only\n                it.only();\n                it.only('');\n                it.only(() => {});\n                it.only(something, () => {});\n                it.only('', something);\n                it.only(something, somethingElse);\n\n                // these are not calls to mocha's describe.only\n                describe.only();\n                describe.only('');\n                describe.only(() => {});\n                describe.only(something, () => {});\n                describe.only('', something);\n                describe.only(something, somethingElse);\n                \n                // these are not calls to mocha's context.only\n                context.only();\n                context.only('');\n                context.only(() => {});\n                context.only(something, () => {});\n                context.only('', something);\n                context.only(something, somethingElse);\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on it.only with lambda', function () {
        var script = "\n            describe('some unit test', () => {\n                it.only('some test', () => {\n                    // some test code\n                });\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Do not commit Mocha it.only function call",
                "name": "file.ts",
                "ruleName": "mocha-avoid-only",
                "startPosition": { "character": 17, "line": 3 }
            }
        ]);
    });
    it('should fail on specify.only with lambda', function () {
        var script = "\n            context('some unit test', () => {\n                specify.only('some test', () => {\n                    // some test code\n                });\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Do not commit Mocha specify.only function call",
                "name": "file.ts",
                "ruleName": "mocha-avoid-only",
                "startPosition": { "character": 17, "line": 3 }
            }
        ]);
    });
    it('should fail on it.only with function', function () {
        var script = "\n            describe('some unit test', () => {\n                it.only('some test', function() {\n                    // some test code\n                });\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Do not commit Mocha it.only function call",
                "name": "file.ts",
                "ruleName": "mocha-avoid-only",
                "startPosition": { "character": 17, "line": 3 }
            }
        ]);
    });
    it('should fail on describe.only with lambda', function () {
        var script = "\n            describe.only('some unit test', () => {\n                // some test code\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Do not commit Mocha describe.only function call",
                "name": "file.ts",
                "ruleName": "mocha-avoid-only",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on describe.only with function', function () {
        var script = "\n            describe.only('some unit test', function() {\n                // some test code\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Do not commit Mocha describe.only function call",
                "name": "file.ts",
                "ruleName": "mocha-avoid-only",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on context.only with lambda', function () {
        var script = "\n            context.only('some unit test', () => {\n                // some test code\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Do not commit Mocha context.only function call",
                "name": "file.ts",
                "ruleName": "mocha-avoid-only",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on context.only with function', function () {
        var script = "\n            context.only('some unit test', function() {\n                // some test code\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Do not commit Mocha context.only function call",
                "name": "file.ts",
                "ruleName": "mocha-avoid-only",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
});
