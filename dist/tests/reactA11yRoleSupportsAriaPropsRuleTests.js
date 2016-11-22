"use strict";
var TestHelper_1 = require("./TestHelper");
var reactA11yRoleSupportsAriaPropsRule_1 = require("../reactA11yRoleSupportsAriaPropsRule");
/**
 * Unit test for a11y-role-supports-aria-props rule.
 */
describe('a11yRoleSupportsAriaPropsRule', function () {
    var ruleName = 'react-a11y-role-supports-aria-props';
    describe('should pass', function () {
        var fileDirectory = 'test-data/a11yRoleSupportsAriaProps/PassingTestInputs/';
        it('when the element is react custom element', function () {
            var fileName = fileDirectory + 'CustomElementSupportsAllAriaProps.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when empty role supports all aria props in element', function () {
            var fileName = "\n        import React = require('react');\n\n        // Empty role only supports global attributes.\n        const a = <div aria-atomic />\n        const b = <div aria-dropeffect />\n        const c = <div aria-errormessage />\n        const d = <div aria-flowto />\n        const e = <div aria-grabbed />\n        const f = <div aria-haspopup />\n        const g = <div aria-hidden />\n        const h = <div aria-invalid />\n        const i = <div aria-keyshortcuts />\n        const j = <div aria-label />\n        const k = <div aria-labelledby />\n        const l = <div aria-live />\n        const m = <div aria-owns />\n        const n = <div aria-relevant />\n        const o = <div aria-roledescription />\n        const p = <div role aria-busy />\n        const q = <div aria-controls />\n        const r = <div role='' aria-current />\n        const s = <div role={ '' } aria-describedby />\n        const t = <a aria-details />\n        const u = <input type='week' aria-disabled />      ";
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when explicit role supports all aria props in element', function () {
            var fileName = fileDirectory + 'ExplicitRoleSupportsAllAriaProps.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when implicit role supports all aria props in element', function () {
            var fileName = fileDirectory + 'ImplicitRoleSupportsAllAriaProps.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when role is defined but not retrievable', function () {
            var fileName = fileDirectory + 'UnretrievableRoleSupportsAllAriaProps.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
    });
    describe('should fail', function () {
        var fileDirectory = 'test-data/a11yRoleSupportsAriaProps/FailingTestInputs/';
        it('when element has not supported aria props for empty role', function () {
            var fileName = fileDirectory + 'ElementHasNotSupportedAriaPropsForEmptyRole.tsx';
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 11, line: 3 },
                    failure: reactA11yRoleSupportsAriaPropsRule_1.getFailureStringForNoRole('div', ['aria-checked'])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 11, line: 4 },
                    failure: reactA11yRoleSupportsAriaPropsRule_1.getFailureStringForNoRole('a', ['aria-checked'])
                }
            ]);
        });
        it('when element has not supported aria props for implicit role', function () {
            var fileName = fileDirectory + 'ElementHasNotSupportedAriaPropsForImplicitRole.tsx';
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 11, line: 3 },
                    failure: reactA11yRoleSupportsAriaPropsRule_1.getFailureStringForImplicitRole('a', 'link', ['aria-checked'])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 11, line: 4 },
                    failure: reactA11yRoleSupportsAriaPropsRule_1.getFailureStringForImplicitRole('area', 'link', ['aria-checked'])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 11, line: 5 },
                    failure: reactA11yRoleSupportsAriaPropsRule_1.getFailureStringForImplicitRole('link', 'link', ['aria-checked'])
                }
            ]);
        });
        it('when element has not supported aria props for explicit role', function () {
            var fileName = fileDirectory + 'ElementHasNotSupportedAriaPropsForExplicitRole.tsx';
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 11, line: 4 },
                    failure: reactA11yRoleSupportsAriaPropsRule_1.getFailureStringForNotImplicitRole(['button'], ['aria-checked'])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 11, line: 7 },
                    failure: reactA11yRoleSupportsAriaPropsRule_1.getFailureStringForNotImplicitRole(['button', 'img'], ['aria-checked'])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 11, line: 10 },
                    failure: reactA11yRoleSupportsAriaPropsRule_1.getFailureStringForNotImplicitRole(['button'], ['aria-checked'])
                }
            ]);
        });
    });
});
