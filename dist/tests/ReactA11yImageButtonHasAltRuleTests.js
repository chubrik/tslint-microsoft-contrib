"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests for react-a11y-image-button-has-alt rule.
 */
describe('reactA11yImageButtonHasAlt', function () {
    var ruleName = 'react-a11y-image-button-has-alt';
    describe('should pass', function () {
        it("when there has no input element with type='image'", function () {
            var script = "\n                import React = require('react');\n                const a = <input type='button' />;\n                const b = <div></div>;\n                const c = <INPUT type='image' />;\n            ";
            TestHelper_1.TestHelper.assertNoViolation(ruleName, script);
        });
        it("when input element with type='image' has non-empty alt attribute.", function () {
            var script = "\n                import React = require('react');\n                const a = <input type='image' alt='altString' />;\n                const b = <input type='IMAGE' alt='altString' />;\n            ";
            TestHelper_1.TestHelper.assertNoViolation(ruleName, script);
        });
    });
    describe('should fail', function () {
        it("when input element with type='image' has no alt attribute.", function () {
            var script = "\n                import React = require('react');\n                const a = <input type='image' />;\n                const b = <input type='IMAGE' />;\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    name: 'file.tsx',
                    ruleName: ruleName,
                    startPosition: { character: 27, line: 3 },
                    failure: 'Inputs element with type="image" must have alt attribute.'
                },
                {
                    name: 'file.tsx',
                    ruleName: ruleName,
                    startPosition: { character: 27, line: 4 },
                    failure: 'Inputs element with type="image" must have alt attribute.'
                }
            ]);
        });
        it("when input element with type='image' has an empty alt attribute.", function () {
            var script = "\n                import React = require('react');\n                const a = <input type='image' alt />;\n                const b = <input type='IMAGE' alt=\"\" />;\n                const c = <input type='image' alt={ undefined } />;\n                const d = <input type='IMAGE' alt={ \"\" } />;\n                const e = <input type='IMAGE' alt={ null } />;\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    name: 'file.tsx',
                    ruleName: ruleName,
                    startPosition: { character: 27, line: 3 },
                    failure: 'Inputs element with type="image" must have non-empty alt attribute.'
                },
                {
                    name: 'file.tsx',
                    ruleName: ruleName,
                    startPosition: { character: 27, line: 4 },
                    failure: 'Inputs element with type="image" must have non-empty alt attribute.'
                },
                {
                    name: 'file.tsx',
                    ruleName: ruleName,
                    startPosition: { character: 27, line: 5 },
                    failure: 'Inputs element with type="image" must have non-empty alt attribute.'
                },
                {
                    name: 'file.tsx',
                    ruleName: ruleName,
                    startPosition: { character: 27, line: 6 },
                    failure: 'Inputs element with type="image" must have non-empty alt attribute.'
                },
                {
                    name: 'file.tsx',
                    ruleName: ruleName,
                    startPosition: { character: 27, line: 7 },
                    failure: 'Inputs element with type="image" must have non-empty alt attribute.'
                }
            ]);
        });
    });
});
