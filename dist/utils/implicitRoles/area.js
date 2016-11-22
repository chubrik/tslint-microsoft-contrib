"use strict";
var JsxAttribute_1 = require("../JsxAttribute");
var hrefString = 'href';
/**
 * @Returns the implicit role for an area tag.
 */
function getImplicitRoleForArea(node) {
    return JsxAttribute_1.getJsxAttributesFromJsxElement(node)[hrefString] ? 'link' : undefined;
}
exports.area = getImplicitRoleForArea;
