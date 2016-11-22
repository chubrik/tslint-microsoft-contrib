"use strict";
var TestHelper_1 = require("./TestHelper");
var reactA11yTabindexNoPositiveRule_1 = require("../reactA11yTabindexNoPositiveRule");
/**
 * Unit test for tabindex-no-positive
 */
describe('a11yTabindexNoPositive', function () {
    var ruleName = 'react-a11y-tabindex-no-positive';
    describe('should pass', function () {
        it('when the attribute name is not tabindex', function () {
            var fileName = 'test-data/a11yTabindexNoPositive/PassingTestInputs/AttributeNotTabindex.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when the tabindex value is not string or numeric literal', function () {
            var fileName = 'test-data/a11yTabindexNoPositive/PassingTestInputs/TabindexValueNotLiteral.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when the tabindex value is -1 or 0', function () {
            var fileName = 'test-data/a11yTabindexNoPositive/PassingTestInputs/CorrectTabindexValue.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
    });
    describe('should fail', function () {
        it('when the tabindex value is undefined', function () {
            var fileName = "import React = require('react');\n\nconst e = <div tabindex='' />\nconst j = <div tabIndex=\"\" />\nconst o = <div Tabindex ></div>\nconst t = <div tabindex=\"  \"></div>\nconst u = <div tabindex={null}></div>\nconst v = <div tabindex={undefined}></div>";
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    "failure": "The value of tabindex attribute is invalid or undefined. It must be either -1 or 0.",
                    "name": "file.tsx",
                    "ruleName": "react-a11y-tabindex-no-positive",
                    "startPosition": { "character": 16, "line": 3 }
                },
                {
                    "failure": "The value of tabindex attribute is invalid or undefined. It must be either -1 or 0.",
                    "name": "file.tsx",
                    "ruleName": "react-a11y-tabindex-no-positive",
                    "startPosition": { "character": 16, "line": 4 }
                },
                {
                    "failure": "The value of tabindex attribute is invalid or undefined. It must be either -1 or 0.",
                    "name": "file.tsx",
                    "ruleName": "react-a11y-tabindex-no-positive",
                    "startPosition": { "character": 16, "line": 5 }
                },
                {
                    "failure": "The value of tabindex attribute is invalid or undefined. It must be either -1 or 0.",
                    "name": "file.tsx",
                    "ruleName": "react-a11y-tabindex-no-positive",
                    "startPosition": { "character": 16, "line": 6 }
                },
                {
                    "failure": "The value of tabindex attribute is invalid or undefined. It must be either -1 or 0.",
                    "name": "file.tsx",
                    "ruleName": "react-a11y-tabindex-no-positive",
                    "startPosition": { "character": 16, "line": 7 }
                },
                {
                    "failure": "The value of tabindex attribute is invalid or undefined. It must be either -1 or 0.",
                    "name": "file.tsx",
                    "ruleName": "react-a11y-tabindex-no-positive",
                    "startPosition": { "character": 16, "line": 8 }
                }
            ]);
        });
        it('when tabindex value is not a number', function () {
            var fileName = 'test-data/a11yTabindexNoPositive/FailingTestInputs/TabindexValueNotNumericLiteral.tsx';
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 3 },
                    failure: reactA11yTabindexNoPositiveRule_1.getFailureString()
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 4 },
                    failure: reactA11yTabindexNoPositiveRule_1.getFailureString()
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 5 },
                    failure: reactA11yTabindexNoPositiveRule_1.getFailureString()
                }
            ]);
        });
        it('when the tabindex value is not -1 or 0', function () {
            var fileName = "import React = require('react');\n\nconst a = <div tabIndex='1'/>\nconst b = <div tabindex={ 1 }></div>\nconst c = <div tabindex='-2'></div>\nconst d = <div tabindex='-12345678910'></div>\nconst e = <div tabindex='+12345678910'></div>      ";
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    name: 'file.tsx',
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 3 },
                    failure: reactA11yTabindexNoPositiveRule_1.getFailureString()
                },
                {
                    name: 'file.tsx',
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 4 },
                    failure: reactA11yTabindexNoPositiveRule_1.getFailureString()
                },
                {
                    name: 'file.tsx',
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 5 },
                    failure: reactA11yTabindexNoPositiveRule_1.getFailureString()
                },
                {
                    name: 'file.tsx',
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 6 },
                    failure: reactA11yTabindexNoPositiveRule_1.getFailureString()
                },
                {
                    name: 'file.tsx',
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 7 },
                    failure: reactA11yTabindexNoPositiveRule_1.getFailureString()
                }
            ]);
        });
    });
});
