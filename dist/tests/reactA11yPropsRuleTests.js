"use strict";
var TestHelper_1 = require("./TestHelper");
var reactA11yPropsRule_1 = require("../reactA11yPropsRule");
/**
 * Unit tests for aria-props rule.
 */
describe('a11yPropsRule', function () {
    var ruleName = 'react-a11y-props';
    describe('should pass', function () {
        it('when the aria-* attribute name is correct', function () {
            var fileName = 'test-data/a11yProps/PassingTestInputs/CorrectAriaAttributeName.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when the attribute name is not aria-*', function () {
            var fileName = 'test-data/a11yProps/PassingTestInputs/AttributeNotAria.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
    });
    describe('should fail', function () {
        it('when the aria-* attribute name is not defined', function () {
            var fileName = 'test-data/a11yProps/FailingTestInputs/InvalidAriaAttributeName.tsx';
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 3 },
                    failure: reactA11yPropsRule_1.getFailureString('aria-')
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 4 },
                    failure: reactA11yPropsRule_1.getFailureString('Aria-')
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 5 },
                    failure: reactA11yPropsRule_1.getFailureString('aria-a')
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 6 },
                    failure: reactA11yPropsRule_1.getFailureString('aria-lable')
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 7 },
                    failure: reactA11yPropsRule_1.getFailureString('aria-la')
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 29, line: 7 },
                    failure: reactA11yPropsRule_1.getFailureString('aria-unchecked')
                }
            ]);
        });
    });
});
