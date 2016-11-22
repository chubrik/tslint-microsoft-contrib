"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noBannedTermsRule', function () {
    var RULE_NAME = 'no-banned-terms';
    describe('module variables', function () {
        it('should not refer to caller', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "module Sample {\n                    var caller;\n                }", [{
                    "failure": "Forbidden reference to banned term: caller",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 25, "line": 2 }
                }]);
        });
        it('should not refer to callee', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "module Sample {\n                    var callee;\n                }", [{
                    "failure": "Forbidden reference to banned term: callee",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 25, "line": 2 }
                }]);
        });
        it('should not refer to arguments', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "module Sample {\n                    var arguments;\n                }", [{
                    "failure": "Forbidden reference to banned term: arguments",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 25, "line": 2 }
                }]);
        });
        it('should not refer to eval', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "module Sample {\n                    var eval;\n                }", [{
                    "failure": "Forbidden reference to banned term: eval",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 25, "line": 2 }
                }]);
        });
    });
    describe('module functions', function () {
        it('should not refer to caller', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "module Sample {\n                    function caller() {}\n                }", [{
                    "failure": "Forbidden reference to banned term: caller",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 2 }
                }]);
        });
        it('should not refer to callee', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "module Sample {\n                    function callee() {}\n                }", [{
                    "failure": "Forbidden reference to banned term: callee",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 2 }
                }]);
        });
        it('should not refer to arguments', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "module Sample {\n                    function arguments() {}\n                }", [{
                    "failure": "Forbidden reference to banned term: arguments",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 2 }
                }]);
        });
        it('should not refer to eval', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "module Sample {\n                    function eval() {}\n                }", [{
                    "failure": "Forbidden reference to banned term: eval",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 2 }
                }]);
        });
    });
    describe('class variables', function () {
        it('should not refer to caller', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "class Sample {\n                    private caller;\n                }", [{
                    "failure": "Forbidden reference to banned term: caller",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 2 }
                }]);
        });
        it('should not refer to callee', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "class Sample {\n                    private callee;\n                }", [{
                    "failure": "Forbidden reference to banned term: callee",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 2 }
                }]);
        });
        it('should not refer to arguments', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "class Sample {\n                    private arguments;\n                }", [{
                    "failure": "Forbidden reference to banned term: arguments",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 2 }
                }]);
        });
        it('should not refer to eval', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "class Sample {\n                    private eval;\n                }", [{
                    "failure": "Forbidden reference to banned term: eval",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 2 }
                }]);
        });
    });
    describe('class properties', function () {
        it('should not refer to caller', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "class Sample {\n                    private var;\n                    set caller(value) {}\n                    get caller() { return var;}\n                }", [{
                    "failure": "Forbidden reference to banned term: caller",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 3 }
                },
                {
                    "failure": "Forbidden reference to banned term: caller",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 4 }
                }]);
        });
        it('should not refer to callee', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "class Sample {\n                    private var;\n                    set callee(value) {}\n                    get callee() { return var;}\n                }", [{
                    "failure": "Forbidden reference to banned term: callee",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 3 }
                },
                {
                    "failure": "Forbidden reference to banned term: callee",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 4 }
                }]);
        });
        it('should not refer to arguments', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "class Sample {\n                    private var;\n                    set arguments(value) {}\n                    get arguments() { return var;}\n                }", [{
                    "failure": "Forbidden reference to banned term: arguments",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 3 }
                },
                {
                    "failure": "Forbidden reference to banned term: arguments",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 4 }
                }]);
        });
        it('should not refer to eval', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "class Sample {\n                    private var;\n                    set eval(value) {}\n                    get eval() { return var;}\n                }", [{
                    "failure": "Forbidden reference to banned term: eval",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 3 }
                },
                {
                    "failure": "Forbidden reference to banned term: eval",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 4 }
                }]);
        });
    });
    describe('class methods', function () {
        it('should not refer to caller', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "class Sample {\n                    caller() {}\n                }", [{
                    "failure": "Forbidden reference to banned term: caller",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 2 }
                }]);
        });
        it('should not refer to callee', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "class Sample {\n                    callee() {}\n                }", [{
                    "failure": "Forbidden reference to banned term: callee",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 2 }
                }]);
        });
        it('should not refer to arguments', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "class Sample {\n                    arguments() {}\n                }", [{
                    "failure": "Forbidden reference to banned term: arguments",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 2 }
                }]);
        });
        it('should not refer to eval', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "class Sample {\n                    eval() {}\n                }", [{
                    "failure": "Forbidden reference to banned term: eval",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 2 }
                }]);
        });
    });
    describe('methods parameters', function () {
        it('should not refer to caller', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "class Sample {\n                    method(caller) {}\n                }", [{
                    "failure": "Forbidden reference to banned term: caller",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 28, "line": 2 }
                }]);
        });
        it('should not refer to callee', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "class Sample {\n                    method(callee) {}\n                }", [{
                    "failure": "Forbidden reference to banned term: callee",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 28, "line": 2 }
                }]);
        });
        it('should not refer to arguments', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "class Sample {\n                    method(arguments) {}\n                }", [{
                    "failure": "Forbidden reference to banned term: arguments",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 28, "line": 2 }
                }]);
        });
        it('should not refer to eval', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "class Sample {\n                    method(eval) {}\n                }", [{
                    "failure": "Forbidden reference to banned term: eval",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 28, "line": 2 }
                }]);
        });
    });
    describe('function parameters', function () {
        it('should not refer to caller', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "module Sample {\n                    function method(caller) {}\n                }", [{
                    "failure": "Forbidden reference to banned term: caller",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 37, "line": 2 }
                }]);
        });
        it('should not refer to callee', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "module Sample {\n                    function method(callee) {}\n                }", [{
                    "failure": "Forbidden reference to banned term: callee",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 37, "line": 2 }
                }]);
        });
        it('should not refer to arguments', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "module Sample {\n                    function method(arguments) {}\n                }", [{
                    "failure": "Forbidden reference to banned term: arguments",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 37, "line": 2 }
                }]);
        });
        it('should not refer to eval', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "module Sample {\n                    function method(eval) {}\n                }", [{
                    "failure": "Forbidden reference to banned term: eval",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 37, "line": 2 }
                }]);
        });
    });
    describe('arrow function parameters', function () {
        it('should not refer to caller', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "module Sample {\n                    var func = (caller) => {};\n                }", [{
                    "failure": "Forbidden reference to banned term: caller",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 33, "line": 2 }
                }]);
        });
        it('should not refer to callee', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "module Sample {\n                    var func = (callee) => {};\n                }", [{
                    "failure": "Forbidden reference to banned term: callee",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 33, "line": 2 }
                }]);
        });
        it('should not refer to arguments', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "module Sample {\n                    var func = (arguments) => {};\n                }", [{
                    "failure": "Forbidden reference to banned term: arguments",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 33, "line": 2 }
                }]);
        });
        it('should not refer to eval', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "module Sample {\n                    var func = (eval) => {};\n                }", [{
                    "failure": "Forbidden reference to banned term: eval",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 33, "line": 2 }
                }]);
        });
    });
    describe('local variables', function () {
        it('should not refer to caller', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "var caller;", [{
                    "failure": "Forbidden reference to banned term: caller",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 5, "line": 1 }
                }]);
        });
        it('should not refer to callee', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "var callee;", [{
                    "failure": "Forbidden reference to banned term: callee",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 5, "line": 1 }
                }]);
        });
        it('should not refer to arguments', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "var arguments", [{
                    "failure": "Forbidden reference to banned term: arguments",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 5, "line": 1 }
                }]);
        });
        it('should not refer to eval', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "var eval;", [{
                    "failure": "Forbidden reference to banned term: eval",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 5, "line": 1 }
                }]);
        });
    });
    describe('interface declarations', function () {
        it('should not refer to caller', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "interface Sample {\n                    caller: any;\n                }", [{
                    "failure": "Forbidden reference to banned term: caller",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 2 }
                }]);
        });
        it('should not refer to callee', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "interface Sample {\n                    callee: any;\n                }", [{
                    "failure": "Forbidden reference to banned term: callee",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 2 }
                }]);
        });
        it('should not refer to arguments', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "interface Sample {\n                    arguments: any;\n                }", [{
                    "failure": "Forbidden reference to banned term: arguments",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 2 }
                }]);
        });
        it('should not refer to eval', function () {
            TestHelper_1.TestHelper.assertViolations(RULE_NAME, "interface Sample {\n                    eval: any;\n                }", [{
                    "failure": "Forbidden reference to banned term: eval",
                    "name": "file.ts",
                    "ruleName": "no-banned-terms",
                    "startPosition": { "character": 21, "line": 2 }
                }]);
        });
    });
});
