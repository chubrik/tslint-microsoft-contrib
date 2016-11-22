"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noJqueryRawElementsRule', function () {
    var ruleName = 'no-jquery-raw-elements';
    it('should pass on string literals that is not a tag', function () {
        var script = "\n            $(\"div\");\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on simple opening tag (Issue #153)', function () {
        var script = "\n            const x = {\n                html: \"<pre>\" + $(\"<div>\").text(message).html() + \"</pre>\"\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on simple open and close tags', function () {
        var script = "\n            $(\"<div></div>\");\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on any simple content inside tags', function () {
        var script = "\n            $(\"<div>some simple content</div>\");\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on any simple self closing tags', function () {
        var script = "\n            $(\"<div/>\");\n            $(\"<div />\");\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on tag with nested elements', function () {
        var script = "\n            $(\"<div><br/></div>\"); // nested elements are better expressed in JQuery API\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Replace complex HTML strings with jQuery API: $(\"<div><br/></div>\")",
                "name": "file.ts",
                "ruleName": ruleName,
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on tag with attributes', function () {
        var script = "\n            $(\"<input readonly='true' >\"); // attributes are better expressed in JQuery API\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Replace complex HTML strings with jQuery API: $(\"<input readonly='true' >\")",
                "name": "file.ts",
                "ruleName": ruleName,
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on tag with default attributes', function () {
        var script = "\n            $(\"<input readonly >\"); // default attributes are better expressed in JQuery API\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Replace complex HTML strings with jQuery API: $(\"<input readonly >\")",
                "name": "file.ts",
                "ruleName": ruleName,
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on tag string concatenation', function () {
        var script = "\n            $(\"<\" + tagName + \" />\");\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Replace HTML string manipulation with jQuery API: $(\"<\" + tagName + \" />\")",
                "name": "file.ts",
                "ruleName": ruleName,
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on attribute string concatenation', function () {
        var script = "\n            $(\"<div className='\" + className + \"' >\");\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Replace HTML string manipulation with jQuery API: $(\"<div className='\" + className + \"' >\")",
                "name": "file.ts",
                "ruleName": ruleName,
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on dynamic open tag', function () {
        var script = "\n            $(someTagOpening + content + '>');\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Replace HTML string manipulation with jQuery API: $(someTagOpening + content + '>')",
                "name": "file.ts",
                "ruleName": "no-jquery-raw-elements",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on dynamic close tag', function () {
        var script = "\n            jquery('<' + tagName + closingBits);\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Replace HTML string manipulation with jQuery API: jquery('<' + tagName + closingBits)",
                "name": "file.ts",
                "ruleName": "no-jquery-raw-elements",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
});
