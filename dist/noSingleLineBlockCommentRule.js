"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var SyntaxKind_1 = require("./utils/SyntaxKind");
var AstUtils_1 = require("./utils/AstUtils");
var FAILURE_STRING = 'Replace block comment with a single-line comment';
/**
 * Implementation of the no-single-line-block-comment rule.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoSingleLineBlockCommentRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'no-single-line-block-comment',
    type: 'maintainability',
    description: 'Avoid single line block comments; use single line comments instead',
    options: null,
    optionsDescription: "",
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Low',
    level: 'Opportunity for Excellence',
    group: 'Whitespace',
    commonWeaknessEnumeration: '710'
};
var NoSingleLineBlockCommentRuleWalker = (function (_super) {
    __extends(NoSingleLineBlockCommentRuleWalker, _super);
    function NoSingleLineBlockCommentRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoSingleLineBlockCommentRuleWalker.prototype.visitSourceFile = function (node) {
        var _this = this;
        var scanner = ts.createScanner(ts.ScriptTarget.ES5, false, // do not skip comments
        AstUtils_1.AstUtils.getLanguageVariant(node), node.text);
        Lint.scanAllTokens(scanner, function (scanner) {
            var startPos = scanner.getStartPos();
            if (_this.tokensToSkipStartEndMap[startPos] != null) {
                // tokens to skip are places where the scanner gets confused about what the token is, without the proper context
                // (specifically, regex, identifiers, and templates). So skip those tokens.
                scanner.setTextPos(_this.tokensToSkipStartEndMap[startPos]);
                return;
            }
            if (scanner.getToken() === SyntaxKind_1.SyntaxKind.current().MultiLineCommentTrivia) {
                var commentText = scanner.getTokenText();
                var startPosition = scanner.getTokenPos();
                if (_this.isSingleLineComment(commentText)
                    && _this.isNextTokenOnANewLine(scanner)
                    && _this.isTsLintSuppression(commentText) === false) {
                    _this.addFailure(_this.createFailure(startPosition, commentText.length, FAILURE_STRING));
                }
            }
        });
    };
    NoSingleLineBlockCommentRuleWalker.prototype.isNextTokenOnANewLine = function (scanner) {
        return scanner.lookAhead(function () {
            scanner.scan(); // scan the next token
            return scanner.hasPrecedingLineBreak(); // if the token is preceded by line break then it was on a new line
        });
    };
    NoSingleLineBlockCommentRuleWalker.prototype.isSingleLineComment = function (commentText) {
        var lines = commentText.split(/\r?\n/);
        return lines.length === 1;
    };
    NoSingleLineBlockCommentRuleWalker.prototype.isTsLintSuppression = function (commentText) {
        return /\/*\s*tslint:(enable|disable):.*/.test(commentText);
    };
    return NoSingleLineBlockCommentRuleWalker;
}(Lint.SkippableTokenAwareRuleWalker));
