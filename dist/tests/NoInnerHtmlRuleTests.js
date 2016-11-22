"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noInnerHtmlRule', function () {
    var ruleName = 'no-inner-html';
    it('should pass on reading innerHTML strings', function () {
        var script = "\n            var foo = element.innerHTML;\n            var bar = element.outerHTML;\n            var baz = $(element).html();\n            var quxFunction = $(element).html;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on writing to innerHTML', function () {
        var script = "\n            element.innerHTML = '<div></div>';\n            parent.child.innerHTML = '<div></div>';\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Writing a string to the innerHTML property is insecure: element.innerHTML = '<div></div>'",
                "name": "file.ts",
                "ruleName": "no-inner-html",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Writing a string to the innerHTML property is insecure: parent.child.innerHTML = '<div></div>'",
                "name": "file.ts",
                "ruleName": "no-inner-html",
                "startPosition": { "character": 13, "line": 3 }
            }
        ]);
    });
    it('should fail on writing to outerHTML', function () {
        var script = "\n            element.outerHTML = '<div></div>';\n            parent.child.outerHTML = someVariable;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Writing a string to the outerHTML property is insecure: element.outerHTML = '<div></div>'",
                "name": "file.ts",
                "ruleName": "no-inner-html",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Writing a string to the outerHTML property is insecure: parent.child.outerHTML = someVariable",
                "name": "file.ts",
                "ruleName": "no-inner-html",
                "startPosition": { "character": 13, "line": 3 }
            }
        ]);
    });
    it('should fail on invoking html(x)', function () {
        var script = "\n            $(element).html('whatever');\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Using the html() function to write a string to innerHTML is insecure: $(element).html('whatever')",
                "name": "file.ts",
                "ruleName": "no-inner-html",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
});
