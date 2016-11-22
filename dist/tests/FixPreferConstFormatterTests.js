"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var chai = require("chai");
var TestHelper_1 = require("./TestHelper");
var fixPreferConstFormatter_1 = require("../fixPreferConstFormatter");
var FixPreferConstFormatterForTesting = (function (_super) {
    __extends(FixPreferConstFormatterForTesting, _super);
    function FixPreferConstFormatterForTesting(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    FixPreferConstFormatterForTesting.prototype.getOutput = function () {
        return this.output;
    };
    FixPreferConstFormatterForTesting.prototype.readFile = function (fileName) {
        return this.input;
    };
    FixPreferConstFormatterForTesting.prototype.writeFile = function (fileName, fileContents) {
        this.output = fileContents;
    };
    return FixPreferConstFormatterForTesting;
}(fixPreferConstFormatter_1.Formatter));
/**
 * Unit tests.
 */
describe('fixPreferConstFormatter', function () {
    var ruleName = 'prefer-const';
    it('should fix a let keyword', function () {
        var input = "\nlet foo = bar;\n";
        var formatter = new FixPreferConstFormatterForTesting(input);
        formatter.format(TestHelper_1.TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput().trim()).to.equal("\nconst foo = bar;\n".trim());
    });
    it('should fix a let keyword and preserve whitespace', function () {
        var input = "\nlet   foo = bar;\n";
        var formatter = new FixPreferConstFormatterForTesting(input);
        formatter.format(TestHelper_1.TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput().trim()).to.equal("\nconst   foo = bar;\n".trim());
    });
});
