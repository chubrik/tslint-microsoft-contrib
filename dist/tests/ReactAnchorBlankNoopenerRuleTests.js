"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('reactAnchorBlankNoopenerRule', function () {
    var ruleName = 'react-anchor-blank-noopener';
    it('should pass on blank anchor with noopener and noreferrer', function () {
        var script = "\n            import React = require('react');\n\n            const a = <a target=\"_blank\" rel=\"noopener noreferrer\">link</a>;\n            const b = <a target=\"_blank\" rel=\"noreferrer noopener\">link</a>;\n            const c = <a target=\"_blank\" rel=\"whatever noopener noreferrer\">link</a>;\n            const d = <a target=\"_blank\" rel=\"noreferrer whatever noopener\">link</a>;\n            const e = <a target=\"_blank\" rel=\"noreferrer noopener whatever\">link</a>;\n            const f = <a target=\"_blank\" rel=\"noopener noreferrer\"/>;\n            const g = <a target=\"_blank\" rel=\"noreferrer noopener\"/>;\n            const h = <a target=\"_blank\" rel=\"whatever noopener noreferrer\"/>;\n            const i = <a target=\"_blank\" rel=\"noreferrer whatever noopener\"/>;\n            const j = <a target=\"_blank\" rel=\"noreferrer noopener whatever\"/>;\n\n            const k = <a target={ something() } rel=\"noreferrer noopener whatever\"/>;\n            const l = <a target=\"_blank\" rel={ something() }/>;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on anchors without blank', function () {
        var script = "\n            import React = require('react');\n\n            const a = <a target=\"_self\" >link</a>;\n            const b = <a target=\"_whatever\" >link</a>;\n            const c = <a target=\"_self\" />;\n            const d = <a target=\"_whatever\" />;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on MSE example', function () {
        var script = "\n            import React = require('react');\n\n            const a = <a href={'somelink'}>\n                    {'some text'}\n                </a>\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on missing rel', function () {
        var script = "\n            import React = require('react');\n\n            const a = <a target=\"_blank\">link</a>;\n            const b = <a target={\"_blank\"}>link</a>;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [{
                "failure": "Anchor tags with target=\"_blank\" should also include rel=\"noopener noreferrer\"",
                "name": "file.tsx",
                "ruleName": "react-anchor-blank-noopener",
                "startPosition": { "character": 23, "line": 4 }
            },
            {
                "failure": "Anchor tags with target=\"_blank\" should also include rel=\"noopener noreferrer\"",
                "name": "file.tsx",
                "ruleName": "react-anchor-blank-noopener",
                "startPosition": { "character": 23, "line": 5 }
            }
        ]);
    });
    it('should fail on missing rel - self-closing', function () {
        var script = "\n            import React = require('react');\n\n            const a = <a target=\"_blank\" />;\n            const b = <a target={\"_blank\"} />;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Anchor tags with target=\"_blank\" should also include rel=\"noopener noreferrer\"",
                "name": "file.tsx",
                "ruleName": "react-anchor-blank-noopener",
                "startPosition": { "character": 23, "line": 4 }
            },
            {
                "failure": "Anchor tags with target=\"_blank\" should also include rel=\"noopener noreferrer\"",
                "name": "file.tsx",
                "ruleName": "react-anchor-blank-noopener",
                "startPosition": { "character": 23, "line": 5 }
            }
        ]);
    });
    it('should fail on empty rel', function () {
        var script = "\n            import React = require('react');\n\n            const a = <a target=\"_blank\" rel=\"\" >link</a>;\n            const b = <a target={\"_blank\"} rel={\"\"} >link</a>;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Anchor tags with target=\"_blank\" should also include rel=\"noopener noreferrer\"",
                "name": "file.tsx",
                "ruleName": "react-anchor-blank-noopener",
                "startPosition": { "character": 23, "line": 4 }
            },
            {
                "failure": "Anchor tags with target=\"_blank\" should also include rel=\"noopener noreferrer\"",
                "name": "file.tsx",
                "ruleName": "react-anchor-blank-noopener",
                "startPosition": { "character": 23, "line": 5 }
            }
        ]);
    });
    it('should fail on rel with only one term', function () {
        var script = "\n            import React = require('react');\n\n            const a = <a target=\"_blank\" rel=\"noreferrer\" >link</a>;\n            const b = <a target={\"_blank\"} rel={\"noopener\"} >link</a>;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Anchor tags with target=\"_blank\" should also include rel=\"noopener noreferrer\"",
                "name": "file.tsx",
                "ruleName": "react-anchor-blank-noopener",
                "startPosition": { "character": 23, "line": 4 }
            },
            {
                "failure": "Anchor tags with target=\"_blank\" should also include rel=\"noopener noreferrer\"",
                "name": "file.tsx",
                "ruleName": "react-anchor-blank-noopener",
                "startPosition": { "character": 23, "line": 5 }
            }
        ]);
    });
    it('should fail on rel with only one term but other terms as well', function () {
        var script = "\n            import React = require('react');\n\n            const a = <a target=\"_blank\" rel=\"noreferrer whatever\" >link</a>;\n            const b = <a target={\"_blank\"} rel={\"whatever noopener\"} >link</a>;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Anchor tags with target=\"_blank\" should also include rel=\"noopener noreferrer\"",
                "name": "file.tsx",
                "ruleName": "react-anchor-blank-noopener",
                "startPosition": { "character": 23, "line": 4 }
            },
            {
                "failure": "Anchor tags with target=\"_blank\" should also include rel=\"noopener noreferrer\"",
                "name": "file.tsx",
                "ruleName": "react-anchor-blank-noopener",
                "startPosition": { "character": 23, "line": 5 }
            }
        ]);
    });
    it('should fail on rel with only one term but other terms as well - self closing', function () {
        var script = "\n            import React = require('react');\n\n            const a = <a target=\"_blank\" rel=\"noreferrer whatever\" />;\n            const b = <a target={\"_blank\"} rel={\"whatever noopener\"} />;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Anchor tags with target=\"_blank\" should also include rel=\"noopener noreferrer\"",
                "name": "file.tsx",
                "ruleName": "react-anchor-blank-noopener",
                "startPosition": { "character": 23, "line": 4 }
            },
            {
                "failure": "Anchor tags with target=\"_blank\" should also include rel=\"noopener noreferrer\"",
                "name": "file.tsx",
                "ruleName": "react-anchor-blank-noopener",
                "startPosition": { "character": 23, "line": 5 }
            }
        ]);
    });
});
