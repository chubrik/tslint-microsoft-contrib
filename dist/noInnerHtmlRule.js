"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var SyntaxKind_1 = require("./utils/SyntaxKind");
var AstUtils_1 = require("./utils/AstUtils");
var FAILURE_INNER = 'Writing a string to the innerHTML property is insecure: ';
var FAILURE_OUTER = 'Writing a string to the outerHTML property is insecure: ';
var FAILURE_JQUERY = 'Using the html() function to write a string to innerHTML is insecure: ';
/**
 * Implementation of the no-inner-html rule.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoInnerHtmlRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'no-inner-html',
    type: 'maintainability',
    description: 'Do not write values to innerHTML, outerHTML, or set HTML using the JQuery html() function.',
    options: null,
    optionsDescription: "",
    typescriptOnly: true,
    issueClass: 'SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Mandatory',
    group: 'Security',
    commonWeaknessEnumeration: '79, 85, 710'
};
var NoInnerHtmlRuleWalker = (function (_super) {
    __extends(NoInnerHtmlRuleWalker, _super);
    function NoInnerHtmlRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoInnerHtmlRuleWalker.prototype.visitBinaryExpression = function (node) {
        // look for assignments to property expressions where the
        // left hand side is either innerHTML or outerHTML
        if (node.operatorToken.kind === SyntaxKind_1.SyntaxKind.current().EqualsToken) {
            if (node.left.kind === SyntaxKind_1.SyntaxKind.current().PropertyAccessExpression) {
                var propAccess = node.left;
                var propName = propAccess.name.text;
                if (propName === 'innerHTML') {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_INNER + node.getText()));
                }
                else if (propName === 'outerHTML') {
                    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_OUTER + node.getText()));
                }
            }
        }
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    NoInnerHtmlRuleWalker.prototype.visitCallExpression = function (node) {
        var functionName = AstUtils_1.AstUtils.getFunctionName(node);
        if (functionName === 'html') {
            if (node.arguments.length > 0) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_JQUERY + node.getText()));
            }
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    return NoInnerHtmlRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
