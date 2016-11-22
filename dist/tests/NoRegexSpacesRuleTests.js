"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noRegexSpacesRule', function () {
    var ruleName = 'no-regex-spaces';
    it('should pass on single space', function () {
        var script = "\n            var re = /foo {3}bar/;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on RegExp object', function () {
        var script = "\n            var re = new RegExp(\"foo   bar\");\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on no spaces', function () {
        var script = "\n            var re = /foobar/;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on spaces in middle', function () {
        var script = "\n            var re = /foo   bar/;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Spaces in regular expressions are hard to count. Use {3}",
                "name": "file.ts",
                "ruleName": "no-regex-spaces",
                "startPosition": { "character": 22, "line": 2 }
            }
        ]);
    });
    it('should fail on leading spaces', function () {
        var script = "\n            var re = /  bar/;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Spaces in regular expressions are hard to count. Use {2}",
                "name": "file.ts",
                "ruleName": "no-regex-spaces",
                "startPosition": { "character": 22, "line": 2 }
            }
        ]);
    });
    it('should fail on trailing spaces', function () {
        var script = "\n            var re = /bar    /;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Spaces in regular expressions are hard to count. Use {4}",
                "name": "file.ts",
                "ruleName": "no-regex-spaces",
                "startPosition": { "character": 22, "line": 2 }
            }
        ]);
    });
});
