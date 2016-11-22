"use strict";
var JsxAttribute_1 = require("../JsxAttribute");
var altString = 'alt';
/**
 * @Returns the implicit role for an img tag.
 */
function getImplicitRoleForImg(node) {
    var alt = JsxAttribute_1.getJsxAttributesFromJsxElement(node)[altString];
    if (alt && JsxAttribute_1.getStringLiteral(alt)) {
        return 'img';
    }
    return 'presentation';
}
exports.img = getImplicitRoleForImg;
