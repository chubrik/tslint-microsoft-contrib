"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var chai = require("chai");
var TestHelper_1 = require("./TestHelper");
var fixNoRequireImportsFormatter_1 = require("../fixNoRequireImportsFormatter");
var FormatterForTesting = (function (_super) {
    __extends(FormatterForTesting, _super);
    function FormatterForTesting(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    FormatterForTesting.prototype.getOutput = function () {
        return this.output;
    };
    FormatterForTesting.prototype.readFile = function (fileName) {
        return this.input;
    };
    FormatterForTesting.prototype.writeFile = function (fileName, fileContents) {
        this.output = fileContents;
    };
    return FormatterForTesting;
}(fixNoRequireImportsFormatter_1.Formatter));
/**
 * Unit tests.
 */
describe('fixPreferConstFormatter', function () {
    var ruleName = 'no-require-imports';
    it('should fix imports in middle of list', function () {
        var input = "\nimport {BaseFormatter} from './utils/BaseFormatter';\nimport TestHelper = require('./TestHelper');\nimport {SyntaxKind} from './utils/SyntaxKind';\n";
        var formatter = new FormatterForTesting(input);
        formatter.format(TestHelper_1.TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput().trim()).to.equal("\nimport {BaseFormatter} from './utils/BaseFormatter';\nimport {TestHelper} from './TestHelper';\nimport {SyntaxKind} from './utils/SyntaxKind';\n".trim());
    });
    it('should fix imports at start of list', function () {
        var input = "import TestHelper = require('./TestHelper');\nimport {SyntaxKind} from './utils/SyntaxKind';\n";
        var formatter = new FormatterForTesting(input);
        formatter.format(TestHelper_1.TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput().trim()).to.equal("import {TestHelper} from './TestHelper';\nimport {SyntaxKind} from './utils/SyntaxKind';\n".trim());
    });
    it('should fix imports at end of list', function () {
        var input = "import {SyntaxKind} from './utils/SyntaxKind';\nimport TestHelper = require('./TestHelper');\n\nconsole.log(TestHelper);";
        var formatter = new FormatterForTesting(input);
        formatter.format(TestHelper_1.TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput().trim()).to.equal("import {SyntaxKind} from './utils/SyntaxKind';\nimport {TestHelper} from './TestHelper';\n\nconsole.log(TestHelper);".trim());
    });
    it('should fix multiline import', function () {
        var input = "\nimport TestHelper = require(\n    './TestHelper'\n);\n";
        var formatter = new FormatterForTesting(input);
        formatter.format(TestHelper_1.TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput().trim()).to.equal("\nimport {TestHelper} from\n    './TestHelper'\n;\n".trim());
    });
});
