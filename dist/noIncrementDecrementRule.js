"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var SyntaxKind_1 = require("./utils/SyntaxKind");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
/**
 * Implementation of the no-increment-decrement rule.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoIncrementDecrementWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'no-increment-decrement',
    type: 'maintainability',
    description: 'Avoid use of increment and decrement operators particularly as part of complicated expressions',
    options: null,
    optionsDescription: "",
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Low',
    level: 'Opportunity for Excellence',
    group: 'Correctness',
    commonWeaknessEnumeration: '398, 710'
};
var NoIncrementDecrementWalker = (function (_super) {
    __extends(NoIncrementDecrementWalker, _super);
    function NoIncrementDecrementWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoIncrementDecrementWalker.prototype.visitPostfixUnaryExpression = function (node) {
        this.validateUnaryExpression(node);
        _super.prototype.visitPostfixUnaryExpression.call(this, node);
    };
    NoIncrementDecrementWalker.prototype.visitPrefixUnaryExpression = function (node) {
        this.validateUnaryExpression(node);
        _super.prototype.visitPrefixUnaryExpression.call(this, node);
    };
    NoIncrementDecrementWalker.prototype.validateUnaryExpression = function (node) {
        if (node.operator === SyntaxKind_1.SyntaxKind.current().PlusPlusToken) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), 'Forbidden ++ operator'));
        }
        else if (node.operator === SyntaxKind_1.SyntaxKind.current().MinusMinusToken) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), 'Forbidden -- operator'));
        }
    };
    return NoIncrementDecrementWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
