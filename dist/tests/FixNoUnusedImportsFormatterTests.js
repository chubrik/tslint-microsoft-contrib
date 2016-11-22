"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var chai = require("chai");
var TestHelper_1 = require("./TestHelper");
var fixNoUnusedImportsFormatter_1 = require("../fixNoUnusedImportsFormatter");
var FixNoUnusedImportsFormatterForTesting = (function (_super) {
    __extends(FixNoUnusedImportsFormatterForTesting, _super);
    function FixNoUnusedImportsFormatterForTesting(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    FixNoUnusedImportsFormatterForTesting.prototype.getOutput = function () {
        return this.output;
    };
    FixNoUnusedImportsFormatterForTesting.prototype.readFile = function (fileName) {
        return this.input;
    };
    FixNoUnusedImportsFormatterForTesting.prototype.writeFile = function (fileName, fileContents) {
        this.output = fileContents;
    };
    return FixNoUnusedImportsFormatterForTesting;
}(fixNoUnusedImportsFormatter_1.Formatter));
/**
 * Unit tests.
 */
describe('fixNoUnusedImportsFormatter', function () {
    var ruleName = 'no-unused-imports';
    it('should fix an unused import at start of file', function () {
        var input = "import Unused = require('Unused');\nclass NoUnusedImportsTestInput {\n    constructor() {\n    }\n}";
        var formatter = new FixNoUnusedImportsFormatterForTesting(input);
        formatter.format(TestHelper_1.TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput().trim()).to.equal("class NoUnusedImportsTestInput {\n    constructor() {\n    }\n}".trim());
    });
    it('should fix an unused import at last import line', function () {
        var input = "import Used = require('Used');\nimport Unused = require('Unused');\n\nclass NoUnusedImportsTestInput {\n    constructor() {\n        console.log(Used);\n    }\n}";
        var formatter = new FixNoUnusedImportsFormatterForTesting(input);
        formatter.format(TestHelper_1.TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput().trim()).to.equal("import Used = require('Used');\nclass NoUnusedImportsTestInput {\n    constructor() {\n        console.log(Used);\n    }\n}");
    });
});
