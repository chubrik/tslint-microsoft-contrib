"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('reactA11yMetaRule', function () {
    var ruleName = 'react-a11y-meta';
    it('should pass on meta tags without refresh', function () {
        var script = "\n            import React = require('react');\n\n            const x = <meta http-equiv=\"not_refresh\" />\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on meta tags with refresh - self closing', function () {
        var script = "\n            import React = require('react');\n\n            const x = <meta http-equiv=\"refresh\" />\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Do not use http-equiv=\"refresh\"",
                "name": "file.tsx",
                "ruleName": "react-a11y-meta",
                "startPosition": { "character": 23, "line": 4 }
            }
        ]);
    });
    it('should fail on meta tags with refresh', function () {
        var script = "\n            import React = require('react');\n\n            const x = <meta http-equiv=\"refresh\" ></meta>\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Do not use http-equiv=\"refresh\"",
                "name": "file.tsx",
                "ruleName": "react-a11y-meta",
                "startPosition": { "character": 23, "line": 4 }
            }
        ]);
    });
    it('should fail on meta tags with refresh - self-closing', function () {
        var script = "\n            import React = require('react');\n\n            const x = <meta http-equiv={\"refresh\"} />\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Do not use http-equiv=\"refresh\"",
                "name": "file.tsx",
                "ruleName": "react-a11y-meta",
                "startPosition": { "character": 23, "line": 4 }
            }
        ]);
    });
});
