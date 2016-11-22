"use strict";
var AstUtils_1 = require("./AstUtils");
var SyntaxKind_1 = require("./SyntaxKind");
var Utils_1 = require("./Utils");
/**
 * Common functions for Mocha AST.
 */
var MochaUtils;
(function (MochaUtils) {
    function isMochaTest(node) {
        return Utils_1.Utils.exists(node.statements, function (statement) {
            return isStatementDescribeCall(statement);
        });
    }
    MochaUtils.isMochaTest = isMochaTest;
    function isStatementDescribeCall(statement) {
        if (statement.kind === SyntaxKind_1.SyntaxKind.current().ExpressionStatement) {
            var expression = statement.expression;
            if (expression.kind === SyntaxKind_1.SyntaxKind.current().CallExpression) {
                var call = expression;
                return isDescribe(call);
            }
        }
        return false;
    }
    MochaUtils.isStatementDescribeCall = isStatementDescribeCall;
    /**
     * Tells you if the call is a describe or context call.
     */
    function isDescribe(call) {
        var functionName = AstUtils_1.AstUtils.getFunctionName(call);
        var callText = call.expression.getText();
        return functionName === 'describe'
            || functionName === 'context'
            || /(describe|context)\.(only|skip|timeout)/.test(callText);
    }
    MochaUtils.isDescribe = isDescribe;
    /**
     * Tells you if the call is an it(), specify(), before(), etc.
     */
    function isLifecycleMethod(call) {
        var functionName = AstUtils_1.AstUtils.getFunctionName(call);
        return functionName === 'it' || functionName === 'specify'
            || functionName === 'before' || functionName === 'beforeEach' || functionName === 'beforeAll'
            || functionName === 'after' || functionName === 'afterEach' || functionName === 'afterAll';
    }
    MochaUtils.isLifecycleMethod = isLifecycleMethod;
})(MochaUtils = exports.MochaUtils || (exports.MochaUtils = {}));
