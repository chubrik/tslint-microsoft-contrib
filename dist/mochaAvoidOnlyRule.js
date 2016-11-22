"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var SyntaxKind_1 = require("./utils/SyntaxKind");
var MochaUtils_1 = require("./utils/MochaUtils");
/**
 * Implementation of the mocha-avoid-only rule.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new MochaAvoidOnlyRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'mocha-avoid-only',
    type: 'maintainability',
    description: 'Do not invoke Mocha\'s describe.only, it.only or context.only functions.',
    options: null,
    optionsDescription: "",
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Opportunity for Excellence',
    group: 'Correctness'
};
Rule.FAILURE_STRING_IT = 'Do not commit Mocha it.only function call';
Rule.FAILURE_STRING_SPECIFY = 'Do not commit Mocha specify.only function call';
Rule.FAILURE_STRING_DESCRIBE = 'Do not commit Mocha describe.only function call';
Rule.FAILURE_STRING_CONTEXT = 'Do not commit Mocha context.only function call';
var MochaAvoidOnlyRuleWalker = (function (_super) {
    __extends(MochaAvoidOnlyRuleWalker, _super);
    function MochaAvoidOnlyRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    MochaAvoidOnlyRuleWalker.prototype.visitSourceFile = function (node) {
        if (MochaUtils_1.MochaUtils.isMochaTest(node)) {
            _super.prototype.visitSourceFile.call(this, node);
        }
    };
    MochaAvoidOnlyRuleWalker.prototype.visitCallExpression = function (node) {
        if (node.expression.kind === SyntaxKind_1.SyntaxKind.current().PropertyAccessExpression) {
            if (node.arguments.length === 2) {
                if (node.arguments[0].kind === SyntaxKind_1.SyntaxKind.current().StringLiteral) {
                    if (node.arguments[1].kind === SyntaxKind_1.SyntaxKind.current().FunctionExpression
                        || node.arguments[1].kind === SyntaxKind_1.SyntaxKind.current().ArrowFunction) {
                        if (node.expression.getText() === 'it.only') {
                            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING_IT));
                        }
                        else if (node.expression.getText() === 'specify.only') {
                            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING_SPECIFY));
                        }
                        else if (node.expression.getText() === 'describe.only') {
                            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING_DESCRIBE));
                        }
                        else if (node.expression.getText() === 'context.only') {
                            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING_CONTEXT));
                        }
                    }
                }
            }
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    return MochaAvoidOnlyRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
