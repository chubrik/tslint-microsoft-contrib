"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var JsxAttribute_1 = require("./utils/JsxAttribute");
var TypeGuard_1 = require("./utils/TypeGuard");
var ROLE_STRING = 'role';
var ALT_STRING = 'alt';
function getFailureStringNoAlt(tagName) {
    return "<" + tagName + "> elements must have an non-empty alt attribute or use empty alt attribute as well as role='presentation' for decorative/presentational images. A reference for the presentation role can be found at https://www.w3.org/TR/wai-aria/roles#presentation.";
}
exports.getFailureStringNoAlt = getFailureStringNoAlt;
function getFailureStringEmptyAltAndNotPresentationRole(tagName) {
    return "The value of alt attribute in <" + tagName + "> tag is empty and role value is not presentation. Add more details in alt attribute or specify role attribute to equal 'presentation' when 'alt' attribute is empty.";
}
exports.getFailureStringEmptyAltAndNotPresentationRole = getFailureStringEmptyAltAndNotPresentationRole;
function getFailureStringNonEmptyAltAndPresentationRole(tagName) {
    return "The value of alt attribute in <" + tagName + "> tag is non-empty and role value is presentation. Remove role='presentation' or specify 'alt' attributeto be empty when role attributes equals 'presentation'.";
}
exports.getFailureStringNonEmptyAltAndPresentationRole = getFailureStringNonEmptyAltAndPresentationRole;
/**
 * Enforces that img elements have alt text.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return sourceFile.languageVariant === ts.LanguageVariant.JSX
            ? this.applyWithWalker(new ImgHasAltWalker(sourceFile, this.getOptions()))
            : [];
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'react-a11y-img-has-alt',
    type: 'maintainability',
    description: 'Enforce that an img element contains the non-empty alt attribute. ' +
        'For decorative images, using empty alt attribute and role="presentation".',
    options: 'string[]',
    optionsDescription: "",
    optionExamples: ['true', '[true, ["Image"]]'],
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Warning',
    severity: 'Important',
    level: 'Opportunity for Excellence',
    group: 'Accessibility'
};
var ImgHasAltWalker = (function (_super) {
    __extends(ImgHasAltWalker, _super);
    function ImgHasAltWalker() {
        return _super.apply(this, arguments) || this;
    }
    ImgHasAltWalker.prototype.visitJsxElement = function (node) {
        this.checkJsxOpeningElement(node.openingElement);
        _super.prototype.visitJsxElement.call(this, node);
    };
    ImgHasAltWalker.prototype.visitJsxSelfClosingElement = function (node) {
        this.checkJsxOpeningElement(node);
        _super.prototype.visitJsxSelfClosingElement.call(this, node);
    };
    ImgHasAltWalker.prototype.checkJsxOpeningElement = function (node) {
        // Tag name is sensitive on lowercase or uppercase, we shoudn't normalize tag names in this rule.
        var tagName = node.tagName.getText();
        var options = this.getOptions(); // tslint:disable-line:no-any
        // The additionalTagNames are specified by tslint config to check not only 'img' tag but also customized tag.
        // @example checking a customized component 'Image' which should require 'alt' attribute.
        var additionalTagNames = options.length > 1 ? options[1] : [];
        // The targetTagNames is the list of tag names we want to check.
        var targetTagNames = ['img'].concat(additionalTagNames);
        if (!tagName || targetTagNames.indexOf(tagName) === -1) {
            return;
        }
        // If element contains JsxSpreadElement in which there could possibly be alt attribute, don't check it.
        if (JsxAttribute_1.getAllAttributesFromJsxElement(node).some(TypeGuard_1.isJsxSpreadAttribute)) {
            return;
        }
        var attributes = JsxAttribute_1.getJsxAttributesFromJsxElement(node);
        var altAttribute = attributes[ALT_STRING];
        if (!altAttribute) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), getFailureStringNoAlt(tagName)));
        }
        else {
            var roleAttribute = attributes[ROLE_STRING];
            var roleAttributeValue = roleAttribute ? JsxAttribute_1.getStringLiteral(roleAttribute) : '';
            var isPresentationRole = !!roleAttributeValue.toLowerCase().match(/\bpresentation\b/);
            var isEmptyAlt = JsxAttribute_1.isEmpty(altAttribute) || JsxAttribute_1.getStringLiteral(altAttribute) === '';
            var allowNonEmptyAltWithRolePresentation = options.length > 2
                ? options[2].allowNonEmptyAltWithRolePresentation
                : false;
            // <img alt='altValue' role='presentation' />
            if (!isEmptyAlt && isPresentationRole && !allowNonEmptyAltWithRolePresentation) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), getFailureStringNonEmptyAltAndPresentationRole(tagName)));
            }
            else if (isEmptyAlt && !isPresentationRole) {
                this.addFailure(this.createFailure(node.getStart(), node.getWidth(), getFailureStringEmptyAltAndNotPresentationRole(tagName)));
            }
        }
    };
    return ImgHasAltWalker;
}(Lint.RuleWalker));
