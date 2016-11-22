"use strict";
var JsxAttribute_1 = require("../JsxAttribute");
/**
 * @Returns the implicit role for a footer tag.
 */
function getImplicitRoleForFooter(node) {
    return JsxAttribute_1.getAncestorNode(node, 'article') || JsxAttribute_1.getAncestorNode(node, 'section') ? undefined : 'contentinfo';
}
exports.footer = getImplicitRoleForFooter;
