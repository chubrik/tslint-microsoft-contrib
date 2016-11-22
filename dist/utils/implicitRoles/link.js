"use strict";
var JsxAttribute_1 = require("../JsxAttribute");
var hrefString = 'href';
/**
 * @Returns the implicit role for a link tag.
 */
function getImplicitRoleForLink(node) {
    return JsxAttribute_1.getJsxAttributesFromJsxElement(node)[hrefString] ? 'link' : undefined;
}
exports.link = getImplicitRoleForLink;
