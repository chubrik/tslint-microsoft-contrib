"use strict";
var TestHelper_1 = require("./TestHelper");
var reactA11yRoleHasRequiredAriaPropsRule_1 = require("../reactA11yRoleHasRequiredAriaPropsRule");
/**
 * Unit test for a11y-role-has-required-aria-props rule
 */
describe('a11yRoleHasRequiredAriaPropsRule', function () {
    var ruleName = 'react-a11y-role-has-required-aria-props';
    describe('should pass', function () {
        var fileDirectory = 'test-data/a11yRoleHasRequiredAriaProps/PassingTestInputs/';
        it('when the attribute has no valid role', function () {
            var fileName = fileDirectory + 'AttributeHasNoValidRole.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when the role value is not string', function () {
            var fileName = fileDirectory + 'RoleValueNotLiteralString.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when the role value has no required props', function () {
            var fileName = fileDirectory + 'RoleHasNoRequiredProps.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when the role value and attributes have required props', function () {
            var fileName = fileDirectory + 'RoleValueAndAttributesHaveRequiredProps.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
    });
    describe('should fail', function () {
        var fileDirectory = 'test-data/a11yRoleHasRequiredAriaProps/FailingTestInputs/';
        it('when explcit role missing required props', function () {
            var fileName = fileDirectory + 'ExplicitRoleMissingRequiredProps.tsx';
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 11, line: 3 },
                    failure: reactA11yRoleHasRequiredAriaPropsRule_1.getFailureStringForNotImplicitRole(['checkbox'], ['aria-checked'])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 11, line: 4 },
                    failure: reactA11yRoleHasRequiredAriaPropsRule_1.getFailureStringForNotImplicitRole(['menuitemcheckbox'], ['aria-checked'])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 11, line: 5 },
                    failure: reactA11yRoleHasRequiredAriaPropsRule_1.getFailureStringForNotImplicitRole(['radio'], ['aria-checked'])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 11, line: 6 },
                    failure: reactA11yRoleHasRequiredAriaPropsRule_1.getFailureStringForNotImplicitRole(['spinbutton'], ['aria-valuemax', 'aria-valuemin', 'aria-valuenow'])
                }
            ]);
        });
        it('when implicit role missing required props', function () {
            var fileName = "import React = require('react');\n\nconst a = <input type='text' list />\nconst b = <menuitem type='radio' />";
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    name: 'file.tsx',
                    ruleName: ruleName,
                    startPosition: { character: 11, line: 3 },
                    failure: reactA11yRoleHasRequiredAriaPropsRule_1.getFailureStringForImplicitRole('input', 'combobox', ['aria-expanded', 'aria-controls'])
                },
                {
                    name: 'file.tsx',
                    ruleName: ruleName,
                    startPosition: { character: 11, line: 4 },
                    failure: reactA11yRoleHasRequiredAriaPropsRule_1.getFailureStringForImplicitRole('menuitem', 'menuitemradio', ['aria-checked'])
                }
            ]);
        });
    });
});
