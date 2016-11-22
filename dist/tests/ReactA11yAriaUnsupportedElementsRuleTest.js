"use strict";
var TestHelper_1 = require("./TestHelper");
var reactA11yAriaUnsupportedElementsRule_1 = require("../reactA11yAriaUnsupportedElementsRule");
/**
 * Unit test for react-a11y-aria-unsupported-elements rule.
 */
describe('reactA11yAriaUnsupportedElementsRule', function () {
    var ruleName = 'react-a11y-aria-unsupported-elements';
    it('should pass when tag name is not dom elements', function () {
        var script = "\n            import React = require('react);\n\n            const a = <DIV aria-label/>;\n            const b = <DIV role></DIV>;\n        ";
        TestHelper_1.TestHelper.assertNoViolation(ruleName, script);
    });
    it('should pass when tag name is supported aria element', function () {
        var script = "\n            import React = require('react);\n\n            const a = <div />;\n            const b = <div aria-label role { ...this.props }></div>;\n        ";
        TestHelper_1.TestHelper.assertNoViolation(ruleName, script);
    });
    it('should fail when unsupported aria elements have aria-* or role attributes', function () {
        var script = "\n            import React = require('react');\n\n            const a = <base aria-label role { ...this.props }></base>;\n            const b = <base aria-label role { ...this.props } />;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                name: 'file.tsx',
                ruleName: ruleName,
                startPosition: { character: 23, line: 4 },
                failure: reactA11yAriaUnsupportedElementsRule_1.getFailureString('base', ['aria-label', 'role'])
            },
            {
                name: 'file.tsx',
                ruleName: ruleName,
                startPosition: { character: 23, line: 5 },
                failure: reactA11yAriaUnsupportedElementsRule_1.getFailureString('base', ['aria-label', 'role'])
            }
        ]);
    });
});
