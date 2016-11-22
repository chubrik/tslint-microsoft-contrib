"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var AstUtils_1 = require("./utils/AstUtils");
var Utils_1 = require("./utils/Utils");
var SyntaxKind_1 = require("./utils/SyntaxKind");
/**
 * Implementation of the jquery-deferred-must-complete rule.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new JQueryDeferredAnalyzer(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'jquery-deferred-must-complete',
    type: 'maintainability',
    description: 'When a JQuery Deferred instance is created, then either reject() or resolve() must be called ' +
        'on it within all code branches in the scope.',
    options: null,
    optionsDescription: "",
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Opportunity for Excellence',
    group: 'Correctness'
};
Rule.FAILURE_STRING = 'A JQuery deferred was found that appears to not have resolve or reject invoked on all code paths: ';
function isPromiseInstantiation(expression) {
    if (expression != null && expression.kind === SyntaxKind_1.SyntaxKind.current().CallExpression) {
        var functionName = AstUtils_1.AstUtils.getFunctionName(expression);
        var functionTarget = AstUtils_1.AstUtils.getFunctionTarget(expression);
        if (functionName === 'Deferred' && AstUtils_1.AstUtils.isJQuery(functionTarget)) {
            return true;
        }
    }
    return false;
}
function isCompletionFunction(functionName) {
    return /^(resolve|reject)$/.test(functionName);
}
var JQueryDeferredAnalyzer = (function (_super) {
    __extends(JQueryDeferredAnalyzer, _super);
    function JQueryDeferredAnalyzer() {
        return _super.apply(this, arguments) || this;
    }
    JQueryDeferredAnalyzer.prototype.visitBinaryExpression = function (node) {
        if (node.operatorToken.getText() === '=' && isPromiseInstantiation(node.right)) {
            if (node.left.kind === SyntaxKind_1.SyntaxKind.current().Identifier) {
                if (node.left.text != null) {
                    var name_1 = node.left;
                    this.validateDeferredUsage(node, name_1);
                }
            }
        }
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    JQueryDeferredAnalyzer.prototype.visitVariableDeclaration = function (node) {
        if (isPromiseInstantiation(node.initializer)) {
            if (node.name.text != null) {
                var name_2 = node.name;
                this.validateDeferredUsage(node, name_2);
            }
        }
        _super.prototype.visitVariableDeclaration.call(this, node);
    };
    JQueryDeferredAnalyzer.prototype.validateDeferredUsage = function (rootNode, deferredIdentifier) {
        var parent = AstUtils_1.AstUtils.findParentBlock(rootNode);
        var blockAnalyzer = new DeferredCompletionWalker(this.getSourceFile(), this.getOptions(), deferredIdentifier);
        blockAnalyzer.visitNode(parent);
        if (!blockAnalyzer.isAlwaysCompleted()) {
            var failureString = Rule.FAILURE_STRING + '\'' + rootNode.getText() + '\'';
            var failure = this.createFailure(rootNode.getStart(), rootNode.getWidth(), failureString);
            this.addFailure(failure);
        }
    };
    return JQueryDeferredAnalyzer;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
var DeferredCompletionWalker = (function (_super) {
    __extends(DeferredCompletionWalker, _super);
    function DeferredCompletionWalker(sourceFile, options, deferredIdentifier) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.wasCompleted = false;
        _this.allBranchesCompleted = true; // by default, there are no branches, so this is true
        _this.hasBranches = false;
        _this.walkerOptions = options; // we need to store this because this.getOptions() returns undefined even when this has a value
        _this.deferredIdentifier = deferredIdentifier;
        return _this;
    }
    // need to make this public so it can invoked from parent walker
    /* tslint:disable:no-unnecessary-override */
    DeferredCompletionWalker.prototype.visitNode = function (node) {
        _super.prototype.visitNode.call(this, node);
    };
    /* tslint:enable:no-unnecessary-override */
    DeferredCompletionWalker.prototype.isAlwaysCompleted = function () {
        if (this.wasCompleted) {
            return true; // if the main code path completed then it doesn't matter what the child branches did
        }
        if (!this.hasBranches) {
            return false; // if there were no branches and it is not complete... then it is in total not complete.
        }
        return this.allBranchesCompleted; // if main path did *not* complete, the look at child branch status
    };
    DeferredCompletionWalker.prototype.visitIfStatement = function (node) {
        this.hasBranches = true;
        // an if statement is a branch, so we need to see if this branch completes.
        var ifAnalyzer = new DeferredCompletionWalker(this.getSourceFile(), this.walkerOptions, this.deferredIdentifier);
        var elseAnalyzer = new DeferredCompletionWalker(this.getSourceFile(), this.walkerOptions, this.deferredIdentifier);
        ifAnalyzer.visitNode(node.thenStatement);
        if (!ifAnalyzer.isAlwaysCompleted()) {
            this.allBranchesCompleted = false;
        }
        else if (node.elseStatement != null) {
            elseAnalyzer.visitNode(node.elseStatement);
            if (!elseAnalyzer.isAlwaysCompleted()) {
                this.allBranchesCompleted = false;
            }
        }
        // there is no need to call super.visit because we already took care of walking all the branches
    };
    DeferredCompletionWalker.prototype.visitCallExpression = function (node) {
        var _this = this;
        if (node.expression.kind === SyntaxKind_1.SyntaxKind.current().PropertyAccessExpression) {
            var prop = node.expression;
            if (AstUtils_1.AstUtils.isSameIdentifer(this.deferredIdentifier, prop.expression)) {
                var functionName = prop.name.getText(); // possibly resolve or reject
                if (isCompletionFunction(functionName)) {
                    this.wasCompleted = true;
                    return; // this branch was completed, do not walk any more.
                }
            }
        }
        var referenceEscaped = Utils_1.Utils.exists(node.arguments, function (argument) {
            return AstUtils_1.AstUtils.isSameIdentifer(_this.deferredIdentifier, argument);
        });
        if (referenceEscaped) {
            this.wasCompleted = true;
            return; // this branch was completed, do not walk any more.
        }
        _super.prototype.visitCallExpression.call(this, node);
    };
    DeferredCompletionWalker.prototype.visitArrowFunction = function (node) {
        var _this = this;
        var isDeferredShadowed = Utils_1.Utils.exists(node.parameters, function (param) {
            return AstUtils_1.AstUtils.isSameIdentifer(_this.deferredIdentifier, param.name);
        });
        if (isDeferredShadowed) {
            this.hasBranches = true;
            this.allBranchesCompleted = false;
            return; // this branch was completed, do not walk any more.
        }
        _super.prototype.visitArrowFunction.call(this, node);
    };
    DeferredCompletionWalker.prototype.visitFunctionExpression = function (node) {
        var _this = this;
        var isDeferredShadowed = Utils_1.Utils.exists(node.parameters, function (param) {
            return AstUtils_1.AstUtils.isSameIdentifer(_this.deferredIdentifier, param.name);
        });
        if (isDeferredShadowed) {
            this.hasBranches = true;
            this.allBranchesCompleted = false;
            return; // this branch was completed, do not walk any more.
        }
        _super.prototype.visitFunctionExpression.call(this, node);
    };
    return DeferredCompletionWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
