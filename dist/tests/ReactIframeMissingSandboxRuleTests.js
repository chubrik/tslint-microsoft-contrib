"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('reactIframeMissingSandboxRule', function () {
    var ruleName = 'react-iframe-missing-sandbox';
    it('should pass on empty attribute', function () {
        var script = "\n            import React = require('react');\n            <iframe sandbox='' />\n            <iframe sandbox={''} />\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on non-iframe tags', function () {
        var script = "\n            import React = require('react');\n            <div sandbox='__unknown__' />\n            <div></div>\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on empty single attribute - open tag', function () {
        var script = "\n            import React = require('react');\n            <iframe sandbox='allow-forms'></iframe>\n            <iframe sandbox='allow-modals'></iframe>\n            <iframe sandbox='allow-orientation-lock'></iframe>\n            <iframe sandbox='allow-pointer-lock'></iframe>\n            <iframe sandbox='allow-popups'></iframe>\n            <iframe sandbox='allow-popups-to-escape-sandbox'></iframe>\n            <iframe sandbox='allow-same-origin'></iframe>\n            <iframe sandbox='allow-scripts'></iframe>\n            <iframe sandbox='allow-top-navigation'></iframe>\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on empty single attribute - self closing tag', function () {
        var script = "\n            import React = require('react');\n            <iframe sandbox='allow-forms' />\n            <iframe sandbox='allow-modals' />\n            <iframe sandbox='allow-orientation-lock' />\n            <iframe sandbox='allow-pointer-lock' />\n            <iframe sandbox='allow-popups' />\n            <iframe sandbox='allow-popups-to-escape-sandbox' />\n            <iframe sandbox='allow-same-origin' />\n            <iframe sandbox='allow-scripts' />\n            <iframe sandbox='allow-top-navigation' />\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on multiple attributes', function () {
        var script = "\n            import React = require('react');\n            <iframe sandbox='allow-forms allow-modals'></iframe>\n            <iframe sandbox='allow-orientation-lock allow-scripts'></iframe>\n            <iframe sandbox='allow-popups allow-popups-to-escape-sandbox allow-pointer-lock allow-same-origin allow-top-navigation'>\n            </iframe>\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on missing attribute', function () {
        var script = "\n            import React = require('react');\n            <iframe></iframe>\n            <iframe/>\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "An iframe element requires a sandbox attribute",
                "name": "file.tsx",
                "ruleName": "react-iframe-missing-sandbox",
                "startPosition": { "character": 13, "line": 3 }
            },
            {
                "failure": "An iframe element requires a sandbox attribute",
                "name": "file.tsx",
                "ruleName": "react-iframe-missing-sandbox",
                "startPosition": { "character": 13, "line": 4 }
            }
        ]);
    });
    it('should fail on invalid attribute', function () {
        var script = "\n            import React = require('react');\n            <iframe sandbox='__unknown__'></iframe>\n            <iframe sandbox='allow-popups __unknown__'/>\n            <iframe sandbox='__unknown__ allow-popups'/>\n            <iframe sandbox='allow-forms __unknown__ allow-popups'/>\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "An iframe element defines an invalid sandbox attribute: __unknown__",
                "name": "file.tsx",
                "ruleName": "react-iframe-missing-sandbox",
                "startPosition": { "character": 29, "line": 3 }
            },
            {
                "failure": "An iframe element defines an invalid sandbox attribute: __unknown__",
                "name": "file.tsx",
                "ruleName": "react-iframe-missing-sandbox",
                "startPosition": { "character": 29, "line": 4 }
            },
            {
                "failure": "An iframe element defines an invalid sandbox attribute: __unknown__",
                "name": "file.tsx",
                "ruleName": "react-iframe-missing-sandbox",
                "startPosition": { "character": 29, "line": 5 }
            },
            {
                "failure": "An iframe element defines an invalid sandbox attribute: __unknown__",
                "name": "file.tsx",
                "ruleName": "react-iframe-missing-sandbox",
                "startPosition": { "character": 29, "line": 6 }
            }
        ]);
    });
    it('should fail on allowing both "allow-scripts" and "allow-same-origin"', function () {
        var script = "\n            import React = require('react');\n            <iframe sandbox='allow-scripts allow-same-origin'></iframe>\n            <iframe sandbox='allow-same-origin allow-scripts'/>\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "An iframe element defines a sandbox with both allow-scripts and allow-same-origin",
                "name": "file.tsx",
                "ruleName": "react-iframe-missing-sandbox",
                "startPosition": { "character": 29, "line": 3 }
            },
            {
                "failure": "An iframe element defines a sandbox with both allow-scripts and allow-same-origin",
                "name": "file.tsx",
                "ruleName": "react-iframe-missing-sandbox",
                "startPosition": { "character": 29, "line": 4 }
            }
        ]);
    });
});
