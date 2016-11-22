"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var chai = require("chai");
var TestHelper_1 = require("./TestHelper");
var fixNoVarKeywordFormatter_1 = require("../fixNoVarKeywordFormatter");
/* tslint:disable:no-consecutive-blank-lines */
var FixNoVarKeywordFormatterForTesting = (function (_super) {
    __extends(FixNoVarKeywordFormatterForTesting, _super);
    function FixNoVarKeywordFormatterForTesting(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    FixNoVarKeywordFormatterForTesting.prototype.getOutput = function () {
        return this.output;
    };
    FixNoVarKeywordFormatterForTesting.prototype.readFile = function (fileName) {
        return this.input;
    };
    FixNoVarKeywordFormatterForTesting.prototype.writeFile = function (fileName, fileContents) {
        this.output = fileContents;
    };
    return FixNoVarKeywordFormatterForTesting;
}(fixNoVarKeywordFormatter_1.Formatter));
/**
 * Unit tests.
 */
describe('fixNoVarKeywordFormatter', function () {
    var ruleName = 'no-var-keyword';
    it('should fix a var keyword', function () {
        var input = "\nvar foo = bar;\n";
        var formatter = new FixNoVarKeywordFormatterForTesting(input);
        formatter.format(TestHelper_1.TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput()).to.equal("\nlet foo = bar;\n");
    });
    it('should fix a var keyword with no proceeding carriage return', function () {
        var input = "var foo = bar;\n";
        var formatter = new FixNoVarKeywordFormatterForTesting(input);
        formatter.format(TestHelper_1.TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput()).to.equal("let foo = bar;\n");
    });
    it('should fix a var keyword with multiple proceeding carriage returns', function () {
        var input = "\n\n\nvar foo = bar;\n";
        var formatter = new FixNoVarKeywordFormatterForTesting(input);
        formatter.format(TestHelper_1.TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput()).to.equal("\n\n\nlet foo = bar;\n");
    });
    it('should fix a var keyword with windows line endings', function () {
        var input = "\r\nvar foo = bar;\r\n";
        var formatter = new FixNoVarKeywordFormatterForTesting(input);
        formatter.format(TestHelper_1.TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput()).to.equal("\r\nlet foo = bar;\r\n");
    });
    it('should fix a var keyword with multiple windows line endings', function () {
        var input = "\r\n    var foo = bar;\r\n";
        var formatter = new FixNoVarKeywordFormatterForTesting(input);
        formatter.format(TestHelper_1.TestHelper.runRule(ruleName, null, input).failures);
        chai.expect(formatter.getOutput()).to.equal("\r\n    let foo = bar;\r\n");
    });
});
/* tslint:enable:no-consecutive-blank-lines */
