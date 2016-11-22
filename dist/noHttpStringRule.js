"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var SyntaxKind_1 = require("./utils/SyntaxKind");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var Utils_1 = require("./utils/Utils");
/**
 * Implementation of the no-http-string rule.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoHttpStringWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'no-http-string',
    type: 'maintainability',
    /* tslint:disable:no-http-string */
    description: 'Do not use strings that start with \'http:\'. URL strings should start with \'https:\'. ',
    /* tslint:enable:no-http-string */
    options: null,
    optionsDescription: "",
    typescriptOnly: true,
    issueClass: 'SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Mandatory',
    group: 'Security',
    recommendation: '[true, "http://www.example.com/?.*", "http://www.examples.com/?.*"],',
    commonWeaknessEnumeration: '319'
};
Rule.FAILURE_STRING = 'Forbidden http url in string: ';
var NoHttpStringWalker = (function (_super) {
    __extends(NoHttpStringWalker, _super);
    function NoHttpStringWalker() {
        return _super.apply(this, arguments) || this;
    }
    NoHttpStringWalker.prototype.visitNode = function (node) {
        if (node.kind === SyntaxKind_1.SyntaxKind.current().StringLiteral) {
            var stringText = node.text;
            if (/.*http:.*/.test(stringText)) {
                if (!this.isSuppressed(stringText)) {
                    var failureString = Rule.FAILURE_STRING + '\'' + stringText + '\'';
                    var failure = this.createFailure(node.getStart(), node.getWidth(), failureString);
                    this.addFailure(failure);
                }
            }
        }
        _super.prototype.visitNode.call(this, node);
    };
    NoHttpStringWalker.prototype.isSuppressed = function (stringText) {
        var allExceptions = NoHttpStringWalker.getExceptions(this.getOptions());
        return Utils_1.Utils.exists(allExceptions, function (exception) {
            return new RegExp(exception).test(stringText);
        });
    };
    NoHttpStringWalker.getExceptions = function (options) {
        if (options.ruleArguments instanceof Array) {
            return options.ruleArguments[0];
        }
        if (options instanceof Array) {
            return options; // MSE version of tslint somehow requires this
        }
        return null;
    };
    return NoHttpStringWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
