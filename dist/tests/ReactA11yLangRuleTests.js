"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('reactA11yLangRule', function () {
    var ruleName = 'react-a11y-lang';
    it('should pass on html with lang attribute', function () {
        var script = "\n            import React = require('react');\n\n            const x = <html lang='en' title=\"asdf\"></html>;\n            const y = <html lang='no' />;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on missing lang for open and close tag', function () {
        var script = "\n            import React = require('react');\n\n            const x = <html></html>;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "An html element is missing the lang attribute",
                "name": "file.tsx",
                "ruleName": "react-a11y-lang",
                "startPosition": { "character": 23, "line": 4 }
            }
        ]);
    });
    it('should fail on missing lang for self closing tag', function () {
        var script = "\n            import React = require('react');\n\n            const x = <html />;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "An html element is missing the lang attribute",
                "name": "file.tsx",
                "ruleName": "react-a11y-lang",
                "startPosition": { "character": 23, "line": 4 }
            }
        ]);
    });
    it('should fail on invalid language code', function () {
        var script = "\n            import React = require('react');\n\n            const x = <html lang='foo'></html>;\n            const y = <html lang='bar' />;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Lang attribute does not have a valid value. Found: foo",
                "name": "file.tsx",
                "ruleName": "react-a11y-lang",
                "startPosition": { "character": 23, "line": 4 }
            },
            {
                "failure": "Lang attribute does not have a valid value. Found: bar",
                "name": "file.tsx",
                "ruleName": "react-a11y-lang",
                "startPosition": { "character": 23, "line": 5 }
            }
        ]);
    });
});
