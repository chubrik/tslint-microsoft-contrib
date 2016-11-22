"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
/**
 * Implementation of the no-function-expression rule.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoFunctionExpressionRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'no-function-expression',
    type: 'maintainability',
    description: 'Do not use function expressions; use arrow functions (lambdas) instead.',
    options: null,
    optionsDescription: "",
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Important',
    level: 'Opportunity for Excellence',
    group: 'Clarity',
    commonWeaknessEnumeration: '398, 710'
};
Rule.FAILURE_STRING = 'Use arrow function instead of function expression';
var NoFunctionExpressionRuleWalker = (function (_super) {
    __extends(NoFunctionExpressionRuleWalker, _super);
    function NoFunctionExpressionRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoFunctionExpressionRuleWalker.prototype.visitFunctionExpression = function (node) {
        var walker = new SingleFunctionWalker(this.getSourceFile(), this.getOptions());
        node.getChildren().forEach(function (node) {
            walker.walk(node);
        });
        // function expression that access 'this' is allowed
        if (!walker.isAccessingThis) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
        _super.prototype.visitFunctionExpression.call(this, node);
    };
    return NoFunctionExpressionRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
var SingleFunctionWalker = (function (_super) {
    __extends(SingleFunctionWalker, _super);
    function SingleFunctionWalker() {
        var _this = _super.apply(this, arguments) || this;
        _this.isAccessingThis = false;
        return _this;
        /* tslint:enable:no-empty */
    }
    SingleFunctionWalker.prototype.visitNode = function (node) {
        if (node.getText() === 'this') {
            this.isAccessingThis = true;
        }
        _super.prototype.visitNode.call(this, node);
    };
    /* tslint:disable:no-empty */
    SingleFunctionWalker.prototype.visitFunctionExpression = function (node) {
        // do not visit inner blocks
    };
    SingleFunctionWalker.prototype.visitArrowFunction = function (node) {
        // do not visit inner blocks
    };
    return SingleFunctionWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
