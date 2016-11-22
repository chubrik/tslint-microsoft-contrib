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
 * Implementation of the valid-typeof rule.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new ValidTypeofRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'valid-typeof',
    type: 'maintainability',
    description: 'Ensures that the results of typeof are compared against a valid string.',
    options: null,
    optionsDescription: "",
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Opportunity for Excellence',
    group: 'Correctness'
};
Rule.FAILURE_STRING = 'Invalid comparison in typeof. Did you mean ';
Rule.VALID_TERMS = ['undefined', 'object', 'boolean', 'number', 'string', 'function', 'symbol'];
var ValidTypeofRuleWalker = (function (_super) {
    __extends(ValidTypeofRuleWalker, _super);
    function ValidTypeofRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    ValidTypeofRuleWalker.prototype.visitBinaryExpression = function (node) {
        if (node.left.kind === SyntaxKind_1.SyntaxKind.current().TypeOfExpression && node.right.kind === SyntaxKind_1.SyntaxKind.current().StringLiteral) {
            this.validateTypeOf(node.right);
        }
        else if (node.right.kind === SyntaxKind_1.SyntaxKind.current().TypeOfExpression && node.left.kind === SyntaxKind_1.SyntaxKind.current().StringLiteral) {
            this.validateTypeOf(node.left);
        }
        _super.prototype.visitBinaryExpression.call(this, node);
    };
    ValidTypeofRuleWalker.prototype.validateTypeOf = function (node) {
        if (Rule.VALID_TERMS.indexOf(node.text) === -1) {
            var start = node.getStart();
            var width = node.getWidth();
            this.addFailure(this.createFailure(start, width, Rule.FAILURE_STRING + this.getClosestTerm(node.text) + '?'));
        }
    };
    ValidTypeofRuleWalker.prototype.getClosestTerm = function (term) {
        var _this = this;
        var closestMatch = 99999999;
        return Rule.VALID_TERMS.reduce(function (closestTerm, thisTerm) {
            var distance = _this.levenshteinDistance(term, thisTerm);
            if (distance < closestMatch) {
                closestMatch = distance;
                closestTerm = thisTerm;
            }
            return closestTerm;
        }, '');
    };
    /**
     Copyright (c) 2011 Andrei Mackenzie
     Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
     associated documentation files (the "Software"), to deal in the Software without restriction,
     including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
     and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
     subject to the following conditions:
     The above copyright notice and this permission notice shall be included in all copies or substantial
     portions of the Software.
     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
     LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
     IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
     WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
     */
    /**
     * Inspired from: https://gist.github.com/andrei-m/982927
     */
    /* tslint:disable:no-increment-decrement */
    ValidTypeofRuleWalker.prototype.levenshteinDistance = function (a, b) {
        if (a.length === 0) {
            return b.length;
        }
        if (b.length === 0) {
            return a.length;
        }
        var matrix = [];
        // increment first column
        for (var i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        // increment first row
        for (var i = 0; i <= a.length; i++) {
            matrix[0][i] = i;
        }
        // populate matrix
        for (var i = 1; i <= b.length; i++) {
            for (var j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                }
                else {
                    var substitutionValue = matrix[i - 1][j - 1] + 1;
                    var insertionValue = matrix[i][j - 1] + 1;
                    var deletionDistance = matrix[i - 1][j] + 1;
                    var minDistance = Math.min(substitutionValue, insertionValue, deletionDistance);
                    matrix[i][j] = minDistance;
                }
            }
        }
        return matrix[b.length][a.length];
    };
    ;
    return ValidTypeofRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
