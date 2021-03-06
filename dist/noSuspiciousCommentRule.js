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
var FAILURE_STRING = 'Suspicious comment found: ';
var SUSPICIOUS_WORDS = ['BUG', 'HACK', 'FIXME', 'LATER', 'LATER2', 'TODO'];
/**
 * Implementation of the no-suspicious-comment rule.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoSuspiciousCommentRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'no-suspicious-comment',
    type: 'maintainability',
    description: 'Do not use suspicious comments, such as BUG, HACK, FIXME, LATER, LATER2, TODO',
    options: null,
    optionsDescription: "",
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Low',
    level: 'Opportunity for Excellence',
    group: 'Clarity',
    commonWeaknessEnumeration: '546'
};
var NoSuspiciousCommentRuleWalker = (function (_super) {
    __extends(NoSuspiciousCommentRuleWalker, _super);
    function NoSuspiciousCommentRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoSuspiciousCommentRuleWalker.prototype.visitSourceFile = function (node) {
        var _this = this;
        var scanner = ts.createScanner(ts.ScriptTarget.ES5, false, // do not skip comments
        AstUtils_1.AstUtils.getLanguageVariant(node), node.text);
        Lint.scanAllTokens(scanner, function (scanner) {
            var startPos = scanner.getStartPos();
            if (_this.tokensToSkipStartEndMap[startPos] != null) {
                // tokens to skip are places where the scanner gets confused about what the token is, without
                // the proper context (specifically, regex, identifiers, and templates). So skip those tokens.
                scanner.setTextPos(_this.tokensToSkipStartEndMap[startPos]);
                return;
            }
            if (scanner.getToken() === SyntaxKind_1.SyntaxKind.current().SingleLineCommentTrivia ||
                scanner.getToken() === SyntaxKind_1.SyntaxKind.current().MultiLineCommentTrivia) {
                var commentText = scanner.getTokenText();
                var startPosition = scanner.getTokenPos();
                _this.scanCommentForSuspiciousWords(startPosition, commentText);
            }
        });
    };
    NoSuspiciousCommentRuleWalker.prototype.scanCommentForSuspiciousWords = function (startPosition, commentText) {
        var _this = this;
        SUSPICIOUS_WORDS.forEach(function (suspiciousWord) {
            _this.scanCommentForSuspiciousWord(suspiciousWord, commentText, startPosition);
        });
    };
    NoSuspiciousCommentRuleWalker.prototype.scanCommentForSuspiciousWord = function (suspiciousWord, commentText, startPosition) {
        var regexExactCaseNoColon = new RegExp('\\b' + suspiciousWord + '\\b');
        var regexCaseInsensistiveWithColon = new RegExp('\\b' + suspiciousWord + '\\b\:', 'i');
        if (regexExactCaseNoColon.test(commentText) || regexCaseInsensistiveWithColon.test(commentText)) {
            this.foundSuspiciousComment(startPosition, commentText, suspiciousWord);
        }
    };
    NoSuspiciousCommentRuleWalker.prototype.foundSuspiciousComment = function (startPosition, commentText, suspiciousWord) {
        var errorMessage = FAILURE_STRING + suspiciousWord;
        this.addFailure(this.createFailure(startPosition, commentText.length, errorMessage));
    };
    return NoSuspiciousCommentRuleWalker;
}(Lint.SkippableTokenAwareRuleWalker));
