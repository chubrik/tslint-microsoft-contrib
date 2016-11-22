"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('preferConstRule', function () {
    var ruleName = 'prefer-const';
    describe('global scoped variables', function () {
        it('should allow a const declaration', function () {
            var inputScript = 'const x = 123;';
            TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
        });
        it('should allow a let declaration if the variable is reassigned', function () {
            var inputScript = "\n                let x = 123;\n                x = 456;\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
        });
        it('should ban a let declaration if the variable is never reassigned', function () {
            var inputScript = 'let x = 123;';
            TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, [
                {
                    failure: 'Identifier \'x\' never appears on the LHS of an assignment - use const instead of let for its declaration.',
                    name: 'file.ts',
                    ruleName: ruleName,
                    startPosition: {
                        character: 5,
                        line: 1
                    }
                }
            ]);
        });
    });
    describe('function scoped variables', function () {
        it('should allow a const declaration', function () {
            var inputScript = "\n                function () {\n                    const x = 123;\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
        });
        it('should allow a let declaration if the variable is reassigned', function () {
            var inputScript = "\n                function () {\n                    let x = 123;\n                    x = 456;\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
        });
        it('should ban a let declaration if the variable is never reassigned', function () {
            var inputScript = "\n                function () {\n                    let x = 123;\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, [
                {
                    failure: 'Identifier \'x\' never appears on the LHS of an assignment - use const instead of let for its declaration.',
                    name: 'file.ts',
                    ruleName: ruleName,
                    startPosition: {
                        character: 25,
                        line: 3
                    }
                }
            ]);
        });
    });
    describe('mixed scope variables', function () {
        it('should allow a let declaration if the variable is reassigned', function () {
            var inputScript = "\n                let x = 123;\n                function () {\n                    x = 456;\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
        });
    });
    describe('for loop variables', function () {
        it('should allow a for-in loop variable const declaration that is never reassigned', function () {
            var inputScript = 'for (const x in []) { }';
            TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
        });
        it('should ban a for-in loop variable let declaration that is never reassigned', function () {
            var inputScript = 'for (let x in []) { }';
            TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, [
                {
                    failure: 'Identifier \'x\' never appears on the LHS of an assignment - use const instead of let for its declaration.',
                    name: 'file.ts',
                    ruleName: ruleName,
                    startPosition: {
                        character: 10,
                        line: 1
                    }
                }
            ]);
        });
        it('should allow a for-in loop variable let declaration that is reassigned', function () {
            var inputScript = "\n                for (let x in []) {\n                    x = 123;\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
        });
        it('should allow a for-of loop variable const declaration that is never reassigned', function () {
            var inputScript = 'for (const x of []) { }';
            TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
        });
        it('should ban a for-of loop variable let declaration that is never reassigned', function () {
            var inputScript = 'for (let x of []) { }';
            TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, [
                {
                    failure: 'Identifier \'x\' never appears on the LHS of an assignment - use const instead of let for its declaration.',
                    name: 'file.ts',
                    ruleName: ruleName,
                    startPosition: {
                        character: 10,
                        line: 1
                    }
                }
            ]);
        });
        it('should allow a for-of loop variable let declaration that is reassigned', function () {
            var inputScript = "\n                for (let x of []) {\n                    x = 123;\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
        });
    });
    it('should allow a let declaration that is incremented', function () {
        var inputScript = "\n            let x = 123;\n            x++;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
    });
    it('should allow a let declaration that is decremented', function () {
        var inputScript = "\n            let x = 123;\n            x--;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
    });
});
