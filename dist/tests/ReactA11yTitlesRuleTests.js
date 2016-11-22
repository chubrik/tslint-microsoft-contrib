"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('reactA11yTitlesRule', function () {
    var ruleName = 'react-a11y-titles';
    it('should pass on when title is not empty', function () {
        var script = "\n            import React = require('react');\n\n            const title = <title>some title</title>;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on empty title', function () {
        var script = "\n            import React = require('react');\n\n            const title = <title></title>;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Title elements must not be empty",
                "name": "file.tsx",
                "ruleName": "react-a11y-titles",
                "startPosition": { "character": 27, "line": 4 }
            }
        ]);
    });
    it('should fail on self-closing title', function () {
        var script = "\n            import React = require('react');\n\n            const title = <title />;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Title elements must not be empty",
                "name": "file.tsx",
                "ruleName": "react-a11y-titles",
                "startPosition": { "character": 27, "line": 4 }
            }
        ]);
    });
    it('should fail on longer than 60 charactes title', function () {
        var title = Array(61).join("a");
        var script = "\n            import React = require('react');\n\n            const title = <title>test " + title + "</title>;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Title length must not be longer than 60 characters: test aaaaaaaaaaaaa...",
                "name": "file.tsx",
                "ruleName": "react-a11y-titles",
                "startPosition": {
                    "character": 27,
                    "line": 4
                }
            }
        ]);
    });
    it('should pass on shorter than 60 characters title', function () {
        var title = Array(5).join("a");
        var script = "\n            import React = require('react');\n\n            const title = <title>test " + title + "</title>;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on single world title', function () {
        var script = "\n            import React = require('react');\n\n            const title = <title>test</title>;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Title must contain more than one word: test",
                "name": "file.tsx",
                "ruleName": "react-a11y-titles",
                "startPosition": { "character": 27, "line": 4
                }
            }
        ]);
    });
    it('should fail on single world title in expression', function () {
        var script = "\n            import React = require('react');\n\n            const title = <title>{'test'}</title>;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Title must contain more than one word: test",
                "name": "file.tsx",
                "ruleName": "react-a11y-titles",
                "startPosition": { "character": 27, "line": 4
                }
            }
        ]);
    });
    it('should pass on multi world title', function () {
        var script = "\n            import React = require('react');\n\n            const title = <title>test test</title>;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on multi world title inside expression', function () {
        var script = "\n            import React = require('react');\n\n            const title = <title>{'test test'}</title>;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
});
