"use strict";
var TypeGuard_1 = require("../TypeGuard");
/**
 * @Returns the implicit role for an li tag.
 */
function getImplicitRoleForLi(node) {
    var parentNode = node.parent;
    var parentTagName;
    if (TypeGuard_1.isJsxElement(parentNode)) {
        parentTagName = parentNode.openingElement.tagName.getText();
    }
    return (parentTagName === 'ol' || parentTagName === 'ul') ? 'listitem' : undefined;
}
exports.li = getImplicitRoleForLi;
