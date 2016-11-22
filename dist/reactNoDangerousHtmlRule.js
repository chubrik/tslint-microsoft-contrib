"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var SyntaxKind_1 = require("./utils/SyntaxKind");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
/**
 * Implementation of the react-no-dangerous-html rule.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        var documentRegistry = ts.createDocumentRegistry();
        var languageServiceHost = Lint.createLanguageServiceHost(sourceFile.fileName, sourceFile.getFullText());
        var languageService = ts.createLanguageService(languageServiceHost, documentRegistry);
        return this.applyWithWalker(new NoDangerousHtmlWalker(sourceFile, this.getOptions(), languageService));
    };
    /**
     * Exposed for testing.
     */
    /* tslint:disable:function-name */
    Rule.getExceptions = function (options) {
        /* tslint:enable:function-name */
        if (options.ruleArguments instanceof Array) {
            return options.ruleArguments[0];
        }
        if (options instanceof Array) {
            return options; // MSE version of tslint somehow requires this
        }
        return null;
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'react-no-dangerous-html',
    type: 'maintainability',
    description: 'Do not use React\'s dangerouslySetInnerHTML API.',
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
var NoDangerousHtmlWalker = (function (_super) {
    __extends(NoDangerousHtmlWalker, _super);
    function NoDangerousHtmlWalker(sourceFile, options, languageServices) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.languageServices = languageServices;
        _this.currentMethodName = '<unknown>';
        return _this;
    }
    NoDangerousHtmlWalker.prototype.visitMethodDeclaration = function (node) {
        this.currentMethodName = node.name.text;
        _super.prototype.visitMethodDeclaration.call(this, node);
        this.currentMethodName = '<unknown>';
    };
    NoDangerousHtmlWalker.prototype.visitPropertyAssignment = function (node) {
        _super.prototype.visitPropertyAssignment.call(this, node);
        var keyNode = node.name;
        if (keyNode.kind === SyntaxKind_1.SyntaxKind.current().Identifier) {
            if (keyNode.text === 'dangerouslySetInnerHTML') {
                this.addFailureIfNotSuppressed(node, keyNode);
            }
        }
        _super.prototype.visitPropertyAssignment.call(this, node);
    };
    NoDangerousHtmlWalker.prototype.visitJsxElement = function (node) {
        this.handleJsxOpeningElement(node.openingElement);
        _super.prototype.visitJsxElement.call(this, node);
    };
    NoDangerousHtmlWalker.prototype.visitJsxSelfClosingElement = function (node) {
        this.handleJsxOpeningElement(node);
        _super.prototype.visitJsxSelfClosingElement.call(this, node);
    };
    NoDangerousHtmlWalker.prototype.handleJsxOpeningElement = function (node) {
        var _this = this;
        node.attributes.forEach(function (attribute) {
            if (attribute.kind === SyntaxKind_1.SyntaxKind.current().JsxAttribute) {
                var jsxAttribute = attribute;
                var attributeName = jsxAttribute.name.text;
                if (attributeName === 'dangerouslySetInnerHTML') {
                    _this.addFailureIfNotSuppressed(node, jsxAttribute.name);
                }
            }
        });
    };
    NoDangerousHtmlWalker.prototype.addFailureIfNotSuppressed = function (parent, node) {
        if (!this.isSuppressed(this.currentMethodName)) {
            var failureString = 'Invalid call to dangerouslySetInnerHTML in method "' + this.currentMethodName + '"\n' +
                '    of source file ' + this.getSourceFile().fileName + '"\n' +
                '    Do *NOT* add a suppression for this warning. If you absolutely must use this API then you need\n' +
                '    to review the usage with a security expert/QE representative. If they decide that this is an\n' +
                '    acceptable usage then add the exception to xss_exceptions.json';
            var position = parent.getStart();
            var failure = this.createFailure(position, node.text.length, failureString);
            this.addFailure(failure);
        }
    };
    NoDangerousHtmlWalker.prototype.isSuppressed = function (methodName) {
        var _this = this;
        var exceptions = Rule.getExceptions(this.getOptions());
        if (exceptions == null || exceptions.length === 0) {
            return false; // no file specified means the usage is not suppressed
        }
        var found = false;
        exceptions.forEach(function (exception) {
            if (exception.file === _this.getSourceFile().fileName) {
                if (exception.method === methodName) {
                    if (exception.comment != null) {
                        found = true;
                    }
                }
            }
        });
        return found;
    };
    return NoDangerousHtmlWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
