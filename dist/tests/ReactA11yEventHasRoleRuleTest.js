"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit test for react-a11y-onclick-has-role rule.
 */
describe('reactA11yEventHasRoleRule', function () {
    var ruleName = 'react-a11y-event-has-role';
    it('should pass when element is not a dom element', function () {
        var script = "\n            import React = require('react');\n\n            const a = <Div onclick />;\n            const b = <DIV></DIV>;\n        ";
        TestHelper_1.TestHelper.assertNoViolation(ruleName, script);
    });
    it('should pass when dom element with event handlers has implicit role', function () {
        var script = "\n            import React = require('react');\n\n            const a = <a href='hrefValue' onclick />;\n        ";
        TestHelper_1.TestHelper.assertNoViolation(ruleName, script);
    });
    it('should pass when dom element with event handlers has role attribute', function () {
        var script = "\n            import React = require('react');\n\n            const a = <div onclick role />;\n            const b = <div click role></div>;\n        ";
        TestHelper_1.TestHelper.assertNoViolation(ruleName, script);
    });
    it('should fail when dom element with event handlers has no role attribute and implicit role', function () {
        var script = "\n            import React = require('react');\n\n            const a = <div onclick />;\n            const b = <div onkeyup></div>;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                name: 'file.tsx',
                ruleName: ruleName,
                startPosition: { character: 23, line: 4 },
                failure: 'Elements with event handlers must have role attribute.'
            },
            {
                name: 'file.tsx',
                ruleName: ruleName,
                startPosition: { character: 23, line: 5 },
                failure: 'Elements with event handlers must have role attribute.'
            }
        ]);
    });
});
