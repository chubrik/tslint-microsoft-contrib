"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var SyntaxKind_1 = require("./utils/SyntaxKind");
/**
 * Implementation of the no-control-regex rule.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoControlRegexRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'no-control-regex',
    type: 'maintainability',
    description: 'Do not use control characters in regular expressions',
    options: null,
    optionsDescription: "",
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Important',
    level: 'Opportunity for Excellence',
    group: 'Correctness'
};
Rule.FAILURE_STRING = 'Unexpected control character in regular expression';
var NoControlRegexRuleWalker = (function (_super) {
    __extends(NoControlRegexRuleWalker, _super);
    function NoControlRegexRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoControlRegexRuleWalker.prototype.visitNewExpression = function (node) {
        this.validateCall(node);
        _super.prototype.visitNewExpression.call(this, node);
    };
    NoControlRegexRuleWalker.prototype.visitCallExpression = function (node) {
        this.validateCall(node);
        _super.prototype.visitCallExpression.call(this, node);
    };
    NoControlRegexRuleWalker.prototype.visitRegularExpressionLiteral = function (node) {
        if (/(\\x[0-1][0-9a-f])/.test(node.getText())) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
        _super.prototype.visitRegularExpressionLiteral.call(this, node);
    };
    /* tslint:disable:no-control-regex */
    NoControlRegexRuleWalker.prototype.validateCall = function (expression) {
        if (expression.expression.getText() === 'RegExp') {
            if (expression.arguments.length > 0) {
                var arg1 = expression.arguments[0];
                if (arg1.kind === SyntaxKind_1.SyntaxKind.current().StringLiteral) {
                    var regexpText = arg1.text;
                    if (/[\x00-\x1f]/.test(regexpText)) {
                        this.addFailure(this.createFailure(arg1.getStart(), arg1.getWidth(), Rule.FAILURE_STRING));
                    }
                }
            }
        }
    };
    return NoControlRegexRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
