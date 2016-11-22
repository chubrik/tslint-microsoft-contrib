"use strict";
var JsxAttribute_1 = require("../JsxAttribute");
var typeString = 'type';
var listString = 'list';
/**
 * @Returns the implicit role for an input tag.
 */
function getImplicitRoleForInput(node) {
    var attributes = JsxAttribute_1.getJsxAttributesFromJsxElement(node);
    var typeAttribute = attributes[typeString];
    if (typeAttribute) {
        var value = JsxAttribute_1.getStringLiteral(typeAttribute) || '';
        // tslint:disable:no-switch-case-fall-through
        switch (value.toUpperCase()) {
            case 'BUTTON':
            case 'IMAGE':
            case 'RESET':
            case 'SUBMIT':
                return 'button';
            case 'CHECKBOX':
                return 'checkbox';
            case 'NUMBER':
                return 'spinbutton';
            case 'PASSWORD':
                return 'textbox';
            case 'RADIO':
                return 'radio';
            case 'RANGE':
                return 'slider';
            case 'SEARCH':
                return attributes[listString] ? 'combobox' : 'searchbox';
            case 'EMAIL':
            case 'TEL':
            case 'URL':
            case 'TEXT':
                return attributes[listString] ? 'combobox' : 'textbox';
            case 'COLOR':
            case 'DATE':
            case 'DATETIME':
            case 'FILE':
            case 'HIDDEN':
            case 'MONTH':
            case 'TIME':
            case 'WEEK':
                return undefined;
            default:
                return 'textbox';
        }
    }
    // tslint:enable:no-switch-case-fall-through
    return 'textbox';
}
exports.input = getImplicitRoleForInput;
