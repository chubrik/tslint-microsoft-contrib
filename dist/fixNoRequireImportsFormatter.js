'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseFormatter_1 = require("./utils/BaseFormatter");
/**
 * Formatter that fixes your unused imports.
 */
/* tslint:disable:export-name */
var Formatter = (function (_super) {
    __extends(Formatter, _super);
    /* tslint:enable:export-name */
    function Formatter() {
        return _super.call(this, 'no-require-imports', function (failure) {
            var fileName = failure.getFileName();
            var fileContents = this.readFile(fileName);
            var start = failure.getStartPosition().getPosition();
            var end = failure.getEndPosition().getPosition();
            var importStartIndex = fileContents.lastIndexOf('\n', start) + 1;
            if (importStartIndex === -1) {
                importStartIndex = 0;
            }
            var importEndIndex = fileContents.indexOf('\n', end);
            var leftSide = fileContents.substring(0, importStartIndex);
            var middle = fileContents.substring(importStartIndex, importEndIndex).trim();
            var rightSide = fileContents.substring(importEndIndex);
            var newImport = middle.replace(/import\s+(.*)\s+=\s*require\(((.|\s)*)\);/m, 'import {$1} from $2;');
            newImport = newImport.replace(/from \n/, 'from\n'); // clean up some spacing
            var newContent = leftSide + newImport + rightSide;
            this.writeFile(fileName, newContent);
            /* tslint:disable:no-console */
            console.log('Automatically converting require-style import to an ES6 import. Please re-compile and re-lint: ' + fileName);
            /* tslint:enable:no-console */
        }) || this;
    }
    return Formatter;
}(BaseFormatter_1.BaseFormatter));
exports.Formatter = Formatter;
