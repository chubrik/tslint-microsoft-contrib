"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var SyntaxKind_1 = require("./utils/SyntaxKind");
var FAILURE_NOT_FOUND = 'An iframe element requires a sandbox attribute';
var FAILURE_INVALID_ENTRY = 'An iframe element defines an invalid sandbox attribute: ';
var FAILURE_INVALID_COMBINATION = 'An iframe element defines a sandbox with both allow-scripts and allow-same-origin';
// If specified as an empty string, this attribute enables extra restrictions on the content that can
// appear in the inline frame. The value of the attribute can either be an empty string (all the restrictions
// are applied), or a space-separated list of tokens that lift particular restrictions.
// Setting both 'allow-scripts'; and 'allow-same-origin' for a single <iframe> tag is not advised. Valid tokens are:
var ALLOWED_VALUES = [
    '',
    'allow-forms',
    'allow-modals',
    'allow-orientation-lock',
    'allow-pointer-lock',
    'allow-popups',
    'allow-popups-to-escape-sandbox',
    'allow-same-origin',
    'allow-scripts',
    'allow-top-navigation'
];
/**
 * Implementation of the react-iframe-missing-sandbox rule.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        if (sourceFile.languageVariant === ts.LanguageVariant.JSX) {
            return this.applyWithWalker(new ReactIframeMissingSandboxRuleWalker(sourceFile, this.getOptions()));
        }
        else {
            return [];
        }
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'react-iframe-missing-sandbox',
    type: 'functionality',
    description: 'React iframes must specify a sandbox attribute',
    options: null,
    optionsDescription: "",
    typescriptOnly: true,
    issueClass: 'SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Opportunity for Excellence',
    group: 'Security',
    commonWeaknessEnumeration: '915'
};
var ReactIframeMissingSandboxRuleWalker = (function (_super) {
    __extends(ReactIframeMissingSandboxRuleWalker, _super);
    function ReactIframeMissingSandboxRuleWalker() {
        return _super.apply(this, arguments) || this;
    }
    ReactIframeMissingSandboxRuleWalker.prototype.visitJsxElement = function (node) {
        this.handleJsxOpeningElement(node.openingElement);
        _super.prototype.visitJsxElement.call(this, node);
    };
    ReactIframeMissingSandboxRuleWalker.prototype.visitJsxSelfClosingElement = function (node) {
        this.handleJsxOpeningElement(node);
        _super.prototype.visitJsxSelfClosingElement.call(this, node);
    };
    ReactIframeMissingSandboxRuleWalker.prototype.handleJsxOpeningElement = function (node) {
        var _this = this;
        if (node.tagName.getText() !== 'iframe') {
            return;
        }
        var sandboxAttributeFound = false;
        node.attributes.forEach(function (attribute) {
            if (attribute.kind === SyntaxKind_1.SyntaxKind.current().JsxAttribute) {
                var jsxAttribute = attribute;
                var attributeName = jsxAttribute.name.text;
                if (attributeName === 'sandbox') {
                    sandboxAttributeFound = true;
                    if (jsxAttribute.initializer != null && jsxAttribute.initializer.kind === SyntaxKind_1.SyntaxKind.current().StringLiteral) {
                        _this.validateSandboxValue(jsxAttribute.initializer);
                    }
                }
            }
        });
        if (!sandboxAttributeFound) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_NOT_FOUND));
        }
    };
    ReactIframeMissingSandboxRuleWalker.prototype.validateSandboxValue = function (node) {
        var _this = this;
        var values = node.text.split(' ');
        var allowScripts = false;
        var allowSameOrigin = false;
        values.forEach(function (attributeValue) {
            if (ALLOWED_VALUES.indexOf(attributeValue) === -1) {
                _this.addFailure(_this.createFailure(node.getStart(), node.getWidth(), FAILURE_INVALID_ENTRY + attributeValue));
            }
            if (attributeValue === 'allow-scripts') {
                allowScripts = true;
            }
            if (attributeValue === 'allow-same-origin') {
                allowSameOrigin = true;
            }
        });
        if (allowScripts && allowSameOrigin) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), FAILURE_INVALID_COMBINATION));
        }
    };
    return ReactIframeMissingSandboxRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
