"use strict";
var TestHelper_1 = require("./TestHelper");
var reactA11yRoleRule_1 = require("../reactA11yRoleRule");
/**
 * Unit tests for a11y-role
 */
// tslint:disable:no-empty
describe('a11yRoleRule', function () {
    var ruleName = 'react-a11y-role';
    describe('should pass', function () {
        it('when the role name is correct', function () {
            var fileName = 'test-data/a11yRole/PassingTestInputs/CorrectName.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when the attribute name is not role', function () {
            var fileName = 'test-data/a11yRole/PassingTestInputs/AttributeNotRole.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('when the role name is not string literal', function () {
            var fileName = 'test-data/a11yRole/PassingTestInputs/RoleNameNotStringLiteral.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
        it('for multiple correct role names', function () {
            var fileName = 'test-data/a11yRole/PassingTestInputs/MultipleCorrectRole.tsx';
            TestHelper_1.TestHelper.assertNoViolation(ruleName, fileName);
        });
    });
    describe('should fail', function () {
        it('for role name not existant', function () {
            var fileName = 'test-data/a11yRole/FailingTestInputs/InvalidRole.tsx';
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 3 },
                    failure: reactA11yRoleRule_1.getFailureStringInvalidRole('myRoleName')
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 4 },
                    failure: reactA11yRoleRule_1.getFailureStringInvalidRole('wrong')
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 5 },
                    failure: reactA11yRoleRule_1.getFailureStringInvalidRole('role')
                }
            ]);
        });
        it('for role name that is abstract', function () {
            var fileName = 'test-data/a11yRole/FailingTestInputs/AbstractRole.tsx';
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 3 },
                    failure: reactA11yRoleRule_1.getFailureStringInvalidRole('input')
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 4 },
                    failure: reactA11yRoleRule_1.getFailureStringInvalidRole('landmark')
                },
                {
                    name: fileName,
                    ruleName: ruleName,
                    startPosition: { character: 16, line: 5 },
                    failure: reactA11yRoleRule_1.getFailureStringInvalidRole('structure')
                }
            ]);
        });
        it('when the role name is not defined', function () {
            var fileName = "import React = require('react');\n\n/**\n * It makes no sense to write code below.\n */\nconst a = <div role='' />\nconst b = <div role />\nconst c = <div role=\"\" />\nconst d = <div role={null} />\nconst e = <div role={undefined} /> ";
            TestHelper_1.TestHelper.assertViolations(ruleName, fileName, [
                {
                    "failure": "'role' attribute empty. Either select a role from https://www.w3.org/TR/wai-aria/roles#role" +
                        "_definitions, or simply remove this attribute",
                    "name": "file.tsx",
                    "ruleName": "react-a11y-role",
                    "startPosition": { "character": 16, "line": 6 }
                },
                {
                    "failure": "'role' attribute empty. Either select a role from https://www.w3.org/TR/wai-aria/roles#role" +
                        "_definitions, or simply remove this attribute",
                    "name": "file.tsx",
                    "ruleName": "react-a11y-role",
                    "startPosition": { "character": 16, "line": 7 }
                },
                {
                    "failure": "'role' attribute empty. Either select a role from https://www.w3.org/TR/wai-aria/roles#role" +
                        "_definitions, or simply remove this attribute",
                    "name": 'file.tsx',
                    "ruleName": "react-a11y-role",
                    "startPosition": { "character": 16, "line": 8 }
                },
                {
                    "failure": "'role' attribute empty. Either select a role from https://www.w3.org/TR/wai-aria/roles#role" +
                        "_definitions, or simply remove this attribute",
                    "name": 'file.tsx',
                    "ruleName": "react-a11y-role",
                    "startPosition": { "character": 16, "line": 9 }
                },
                {
                    "failure": "'role' attribute empty. Either select a role from https://www.w3.org/TR/wai-aria/roles#role" +
                        "_definitions, or simply remove this attribute",
                    "name": 'file.tsx',
                    "ruleName": "react-a11y-role",
                    "startPosition": { "character": 16, "line": 10 }
                }
            ]);
        });
    });
});
