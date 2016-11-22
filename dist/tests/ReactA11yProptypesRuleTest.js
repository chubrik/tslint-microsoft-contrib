"use strict";
var TestHelper_1 = require("./TestHelper");
var reactA11yProptypesRule_1 = require("../reactA11yProptypesRule");
/**
 * Unit test for react-a11y-proptypes rule.
 */
describe('reactA11yProptypesRule', function () {
    var ruleName = 'react-a11y-proptypes';
    describe('should pass', function () {
        var fileDirectory = 'test-data/a11yProptypes/PassingTestInputs/';
        it('when can not check the type of attribute value until running time', function () {
            var fileName = fileDirectory + 'canNotCheckUntilRunTime.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when allowing undefined attribute value is undefined', function () {
            var fileName = fileDirectory + 'allowUndefined.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when boolean type value is vaild', function () {
            var fileName = fileDirectory + 'boolean.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when integer type value is vaild', function () {
            var fileName = fileDirectory + 'integer.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when number type value is vaild', function () {
            var fileName = fileDirectory + 'number.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when string type value is vaild', function () {
            var fileName = fileDirectory + 'string.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when token type value is vaild', function () {
            var fileName = fileDirectory + 'token.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when tokenlist type value is vaild', function () {
            var fileName = fileDirectory + 'tokenlist.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when tristate type value is vaild', function () {
            var fileName = fileDirectory + 'tristate.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
    });
    describe('should fail', function () {
        var fileDirectory = 'test-data/a11yProptypes/FailingTestInputs/';
        it('when not allowing undefined attribute value is undefined', function () {
            var fileName = fileDirectory + 'notAllowUndefined.tsx';
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 3 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-label', 'string', [])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 4 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-label', 'string', [])
                }
            ]);
        });
        it('when boolean type value is invalid', function () {
            var fileName = fileDirectory + 'boolean.tsx';
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 3 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-hidden', 'boolean', [])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 4 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-hidden', 'boolean', [])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 5 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-hidden', 'boolean', [])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 6 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-hidden', 'boolean', [])
                }
            ]);
        });
        it('when integer type value is invalid', function () {
            var fileName = fileDirectory + 'integer.tsx';
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 3 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-level', 'integer', [])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 4 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-level', 'integer', [])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 5 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-level', 'integer', [])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 6 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-level', 'integer', [])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 7 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-level', 'integer', [])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 8 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-level', 'integer', [])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 9 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-level', 'integer', [])
                }
            ]);
        });
        it('when number type value is invalid', function () {
            var fileName = fileDirectory + 'number.tsx';
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 3 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-valuemax', 'number', [])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 4 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-valuemax', 'number', [])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 5 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-valuemax', 'number', [])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 6 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-valuemax', 'number', [])
                }
            ]);
        });
        it('when string type value is invalid', function () {
            var fileName = fileDirectory + 'string.tsx';
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 3 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-label', 'string', [])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 4 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-label', 'string', [])
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 5 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-label', 'string', [])
                }
            ]);
        });
        it('when token type value is invalid', function () {
            var fileName = fileDirectory + 'token.tsx';
            var permittedValues = ['ascending', 'descending', 'none', 'other'];
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 3 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-sort', 'token', permittedValues)
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 4 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-sort', 'token', permittedValues)
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 5 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-sort', 'token', permittedValues)
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 6 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-sort', 'token', permittedValues)
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 7 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-sort', 'token', permittedValues)
                }
            ]);
        });
        it('when tokenlist type value is invalid', function () {
            var fileName = fileDirectory + 'tokenlist.tsx';
            var permittedValues = ['additions', 'removals', 'text', 'all'];
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 3 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-relevant', 'tokenlist', permittedValues)
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 4 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-relevant', 'tokenlist', permittedValues)
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 5 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-relevant', 'tokenlist', permittedValues)
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 6 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-relevant', 'tokenlist', permittedValues)
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 7 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-relevant', 'tokenlist', permittedValues)
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 8 },
                    failure: reactA11yProptypesRule_1.getFailureString('aria-relevant', 'tokenlist', permittedValues)
                }
            ]);
        });
    });
});
