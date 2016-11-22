"use strict";
var TestHelper_1 = require("./TestHelper");
var reactA11yImgHasAltRule_1 = require("../reactA11yImgHasAltRule");
/**
 * Unit test for react-a11y-img-has-alt rule
 */
describe('reactA11yImgHasAlt', function () {
    var ruleName = 'react-a11y-img-has-alt';
    describe('default tests', function () {
        describe('should pass', function () {
            var fileDirectory = 'test-data/a11yImgHasAlt/DefaltTests/PassingTestInputs/';
            it('when the element name is not img', function () {
                var fileName = fileDirectory + 'ElementNotImg.tsx';
                TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
            });
            it('when the img tag name is not lower case', function () {
                var fileName = fileDirectory + 'ImgElementNotLowerCase.tsx';
                TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
            });
            it('when the img element has spread attribute', function () {
                var fileName = fileDirectory + 'ImgElementHasSpreadAttribute.tsx';
                TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
            });
            it('when the img element has empty alt value and presentation role', function () {
                var fileName = "\n            import React = require('react');\n\n            const a = <img role='presentation' alt />\n            const b = <img role='presentation' alt='' />\n            const c = <img role='button presentation' alt={ undefined } />\n            const d = <img role={'presentation button'} alt={''} /> ";
                TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
            });
            it('when the img element has non-empty alt value and not presentation role', function () {
                var fileName = fileDirectory + 'ImgElementHasNonEmptyAltValueAndNotPresentationRole.tsx';
                TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
            });
            it('when the img element has non-empty alt value and presentation role when option is enabled', function () {
                var fileName = fileDirectory + 'ImgElementHasNonEmptyAltValueAndPresentationRole.tsx';
                var ruleOptions = [true, [], { allowNonEmptyAltWithRolePresentation: true }];
                TestHelper_1.TestHelper.assertNoViolationWithOptions(ruleName, ruleOptions, fileName);
            });
        });
        describe('should fail', function () {
            var fileDirectory = 'test-data/a11yImgHasAlt/DefaltTests/FailingTestInputs/';
            it('when the img element has no alt prop', function () {
                var fileName = fileDirectory + 'ImgElementHasNoAlt.tsx';
                TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 3 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringNoAlt('img')
                    },
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 4 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringNoAlt('img')
                    }
                ]);
            });
            it('when the img element has empty alt value and not presentation role', function () {
                var fileName = "import React = require('react');\n\nconst a = <img alt role='button'/>\nconst b = <img Alt='' />\nconst c = <img ALT={undefined} />\nconst d = <img alt={''} /> ";
                TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                    {
                        name: 'file.tsx',
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 3 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringEmptyAltAndNotPresentationRole('img')
                    },
                    {
                        name: 'file.tsx',
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 4 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringEmptyAltAndNotPresentationRole('img')
                    },
                    {
                        name: 'file.tsx',
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 5 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringEmptyAltAndNotPresentationRole('img')
                    },
                    {
                        name: 'file.tsx',
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 6 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringEmptyAltAndNotPresentationRole('img')
                    }
                ]);
            });
            it('when the img element has non-empty alt value and presentation role', function () {
                var fileName = fileDirectory + 'ImgElementHasNonEmptyAltValueAndPresentationRole.tsx';
                TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 5 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringNonEmptyAltAndPresentationRole('img')
                    },
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 6 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringNonEmptyAltAndPresentationRole('img')
                    },
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 7 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringNonEmptyAltAndPresentationRole('img')
                    },
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 8 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringNonEmptyAltAndPresentationRole('img')
                    }
                ]);
            });
        });
    });
    describe('custom element tests', function () {
        var options = [true, ['Picture']]; // tslint:disable-line:no-any
        describe('should pass', function () {
            var fileDirectory = 'test-data/a11yImgHasAlt/CustomElementTests/PassingTestInputs/';
            it('when the element is neither img nor custom element', function () {
                var fileName = fileDirectory + 'ElementNeitherImgNorCustomElement.tsx';
                TestHelper_1.TestHelper.assertNoViolationWithOptions(ruleName, options, fileName);
            });
            it('when custom element or img has empty alt value and presentation role', function () {
                var fileName = "\n            import React = require('react');\n\n            let Picture;\n\n            const a = <Picture role='presentation' alt />\n            const b = <Picture role={'presentation'} alt='' />\n            const c = <Picture role='button presentation' alt={undefined} />\n            const d = <img role='presentation' alt={ null } />\n            const e = <img role={'presentation'} alt={ '' } />\n            const f = <img role='button presentation' alt />\n                    ";
                TestHelper_1.TestHelper.assertNoViolationWithOptions(ruleName, options, fileName);
            });
            it('when custom element or img has non-empty alt value and not presentation role', function () {
                var fileName = fileDirectory + 'CustomElementHasNonEmptyAltValueAndNotPresentationRole.tsx';
                TestHelper_1.TestHelper.assertNoViolationWithOptions(ruleName, options, fileName);
            });
        });
        describe('should fail', function () {
            var fileDirectory = 'test-data/a11yImgHasAlt/CustomElementTests/FailingTestInputs/';
            it('when custom element or img has no alt prop', function () {
                var fileName = fileDirectory + 'CustomElementHasNoAltProp.tsx';
                TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, options, fileName, [
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 5 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringNoAlt('Picture')
                    },
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 6 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringNoAlt('Picture')
                    },
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 7 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringNoAlt('img')
                    },
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 8 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringNoAlt('img')
                    }
                ]);
            });
            it('when custom element or img has non-empty alt value and presentation role', function () {
                var fileName = fileDirectory + 'CustomElementHasNonEmptyAltValueAndPresentationRole.tsx';
                TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, options, fileName, [
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 6 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringNonEmptyAltAndPresentationRole('Picture')
                    },
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 7 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringNonEmptyAltAndPresentationRole('Picture')
                    },
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 8 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringNonEmptyAltAndPresentationRole('Picture')
                    },
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 9 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringNonEmptyAltAndPresentationRole('img')
                    },
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 10 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringNonEmptyAltAndPresentationRole('img')
                    },
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 11 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringNonEmptyAltAndPresentationRole('img')
                    }
                ]);
            });
            it('when custom element or img has empty alt value and not presentation role', function () {
                var fileName = fileDirectory + 'CustomElementHasEmptyAltValueAndNotPresentationRole.tsx';
                TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, options, fileName, [
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 5 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringEmptyAltAndNotPresentationRole('Picture')
                    },
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 6 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringEmptyAltAndNotPresentationRole('Picture')
                    },
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 7 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringEmptyAltAndNotPresentationRole('Picture')
                    },
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 8 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringEmptyAltAndNotPresentationRole('img')
                    },
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 9 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringEmptyAltAndNotPresentationRole('img')
                    },
                    {
                        name: fileName,
                        ruleName: ruleName,
                        startPosition: { character: 11, line: 10 },
                        failure: reactA11yImgHasAltRule_1.getFailureStringEmptyAltAndNotPresentationRole('img')
                    }
                ]);
            });
        });
    });
});
