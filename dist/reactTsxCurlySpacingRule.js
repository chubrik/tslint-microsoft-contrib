"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var SyntaxKind_1 = require("./utils/SyntaxKind");
/**
 * TSX curly spacing rule.
 *
 * Allows you to specify how spacing works around JSX Expressions.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new TsxCurlySpacingWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'react-tsx-curly-spacing',
    type: 'style',
    description: 'Consistently use spaces around the brace characters of JSX attributes.',
    options: null,
    optionsDescription: "",
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Low',
    level: 'Opportunity for Excellence',
    group: 'Whitespace'
};
var Spacing;
(function (Spacing) {
    Spacing[Spacing["always"] = 0] = "always";
    Spacing[Spacing["never"] = 1] = "never";
})(Spacing || (Spacing = {}));
var TsxCurlySpacingWalker = (function (_super) {
    __extends(TsxCurlySpacingWalker, _super);
    function TsxCurlySpacingWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        // default value is always
        _this.spacing = options.ruleArguments[0] === 'never' ? Spacing.never : Spacing.always;
        // default value is to not allow multiline
        _this.allowMultiline = false;
        if (options.ruleArguments[1] != null) {
            _this.allowMultiline = !(options.ruleArguments[1].allowMultiline === false);
        }
        return _this;
    }
    TsxCurlySpacingWalker.prototype.visitJsxExpression = function (node) {
        var childrenCount = node.getChildCount();
        var first = node.getFirstToken(); // '{' sign
        var last = node.getLastToken(); // '}' sign
        var second = node.getChildAt(1); // after '{' sign
        var penultimate = node.getChildAt(childrenCount - 2); // before '}' sign
        this.validateBraceSpacing(node, first, second, first);
        this.validateBraceSpacing(node, penultimate, last, last);
    };
    TsxCurlySpacingWalker.prototype.visitNode = function (node) {
        // This is hacked to visit JSX Expression. See https://github.com/palantir/tslint/pull/1292
        // newer versions of tslint have a public visitJsxExpression but older versions do not
        if (node.kind === SyntaxKind_1.SyntaxKind.current().JsxExpression) {
            this.visitJsxExpression(node);
            this.walkChildren(node);
        }
        else {
            _super.prototype.visitNode.call(this, node);
        }
    };
    TsxCurlySpacingWalker.prototype.validateBraceSpacing = function (node, first, second, violationRoot) {
        if (this.isMultiline(first, second)) {
            if (!this.allowMultiline) {
                this.reportFailure(node, violationRoot, this.getFailureForNewLine(first, violationRoot));
            }
        }
        else if (this.spacing === Spacing.always) {
            if (!this.isSpaceBetweenTokens(first, second)) {
                this.reportFailure(node, violationRoot, this.getFailureForSpace(first, violationRoot));
            }
        }
        else {
            if (this.isSpaceBetweenTokens(first, second)) {
                this.reportFailure(node, violationRoot, this.getFailureForSpace(first, violationRoot));
            }
        }
    };
    TsxCurlySpacingWalker.prototype.getFailureForSpace = function (first, violationRoot) {
        if (this.spacing === Spacing.always) {
            if (first === violationRoot) {
                return "A space is required after '" + violationRoot.getText() + "'";
            }
            else {
                return "A space is required before '" + violationRoot.getText() + "'";
            }
        }
        else {
            if (first === violationRoot) {
                return "There should be no space after '" + violationRoot.getText() + "'";
            }
            else {
                return "There should be no space before '" + violationRoot.getText() + "'";
            }
        }
    };
    TsxCurlySpacingWalker.prototype.getFailureForNewLine = function (first, violationRoot) {
        if (first === violationRoot) {
            return "There should be no newline after '" + violationRoot.getText() + "'";
        }
        else {
            return "There should be no newline before '" + violationRoot.getText() + "'";
        }
    };
    TsxCurlySpacingWalker.prototype.reportFailure = function (start, endNode, failure) {
        this.addFailure(this.createFailure(start.getStart(), endNode.getStart() - start.getStart(), failure));
    };
    TsxCurlySpacingWalker.prototype.isSpaceBetweenTokens = function (left, right) {
        // Inspired from https://github.com/eslint/eslint/blob/master/lib/util/source-code.js#L296
        var text = this.getSourceFile().getText().slice(left.getEnd(), right.getStart());
        return /\s/.test(text.replace(/\/\*.*?\*\//g, ''));
    };
    TsxCurlySpacingWalker.prototype.isMultiline = function (left, right) {
        var sourceFile = this.getSourceFile();
        var leftLine = sourceFile.getLineAndCharacterOfPosition(left.getStart()).line;
        var rightLine = sourceFile.getLineAndCharacterOfPosition(right.getStart()).line;
        return leftLine !== rightLine;
    };
    return TsxCurlySpacingWalker;
}(Lint.RuleWalker));
