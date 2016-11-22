"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var SyntaxKind_1 = require("./utils/SyntaxKind");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var AstUtils_1 = require("./utils/AstUtils");
/**
 * Implementation of the no-backbone-get-set-outside-model rule.
 *
 * Currently only makes sure that get and set Backbone methods are called
 * on the this reference.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoBackboneGetSetOutsideModelRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'no-backbone-get-set-outside-model',
    type: 'maintainability',
    description: 'Avoid using `model.get(\'x\')` and `model.set(\'x\', value)` Backbone accessors outside of the owning model.',
    options: null,
    optionsDescription: "",
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Important',
    level: 'Opportunity for Excellence',
    group: 'Correctness',
    commonWeaknessEnumeration: '398, 710'
};
Rule.GET_FAILURE_STRING = 'Backbone get() called outside of owning model: ';
Rule.SET_FAILURE_STRING = 'Backbone set() called outside of owning model: ';
var NoBackboneGetSetOutsideModelRuleWalker = (function (_super) {
    __extends(NoBackboneGetSetOutsideModelRuleWalker, _super);
    function NoBackboneGetSetOutsideModelRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoBackboneGetSetOutsideModelRuleWalker.prototype.visitCallExpression = function (node) {
        if (AstUtils_1.AstUtils.getFunctionTarget(node) !== 'this') {
            var functionName = AstUtils_1.AstUtils.getFunctionName(node);
            if (functionName === 'get' && node.arguments.length === 1 && node.arguments[0].kind === SyntaxKind_1.SyntaxKind.current().StringLiteral) {
                var msg = Rule.GET_FAILURE_STRING + node.getText();
                this.addFailure(this.createFailure(node.getStart(), node.getEnd(), msg));
            }
            if (functionName === 'set' && node.arguments.length === 2 && node.arguments[0].kind === SyntaxKind_1.SyntaxKind.current().StringLiteral) {
                var msg = Rule.SET_FAILURE_STRING + node.getText();
                this.addFailure(this.createFailure(node.getStart(), node.getEnd(), msg));
            }
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    return NoBackboneGetSetOutsideModelRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
