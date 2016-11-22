"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('missing-jsdoc', function () {
    var ruleName = 'missing-jsdoc';
    it('should not fail on top level comment', function () {
        var script = "\n/**\n * whatever\n */\nfunction whatever() { }";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should not fail on top level comment with trailing spaces', function () {
        var script = "\n/**\n * whatever\n */\nfunction whatever() { }";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on missing comment', function () {
        var script = "\nfunction whatever() { }";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "File missing JSDoc comment at the top-level: file.ts",
                "name": "file.ts",
                "ruleName": "missing-jsdoc",
                "startPosition": { "character": 1, "line": 2 }
            }
        ]);
    });
    it('should fail on one star comment', function () {
        var script = "\n/*\n * whatever\n */\nfunction whatever() { }";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "File missing JSDoc comment at the top-level: file.ts",
                "name": "file.ts",
                "ruleName": "missing-jsdoc",
                "startPosition": { "character": 1, "line": 5 }
            }
        ]);
    });
    it('should fail on three star comment', function () {
        var script = "\n/***\n * whatever\n */\nfunction whatever() { }";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "File missing JSDoc comment at the top-level: file.ts",
                "name": "file.ts",
                "ruleName": "missing-jsdoc",
                "startPosition": { "character": 1, "line": 5 }
            }
        ]);
    });
    it('should fail on trailing chars', function () {
        var script = "\n/** bad format\n * whatever\n */\nfunction whatever() { }";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "File missing JSDoc comment at the top-level: file.ts",
                "name": "file.ts",
                "ruleName": "missing-jsdoc",
                "startPosition": { "character": 1, "line": 5 }
            }
        ]);
    });
    it('should fail on leading spaces', function () {
        var script = "\n    /**\n     * whatever\n     */\n    function indentedLikeAModuleFunction() { }";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "File missing JSDoc comment at the top-level: file.ts",
                "name": "file.ts",
                "ruleName": "missing-jsdoc",
                "startPosition": { "character": 5, "line": 5 }
            }
        ]);
    });
});
