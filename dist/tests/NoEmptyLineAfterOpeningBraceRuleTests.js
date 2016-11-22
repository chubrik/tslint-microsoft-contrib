"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noEmptyLineAfterOpeningBraceRule', function () {
    var ruleName = 'no-empty-line-after-opening-brace';
    it('should allow a single-line block', function () {
        var inputScript = 'function () { }';
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
    });
    it('should allow a multiline block without a newline after the opening brace', function () {
        var inputScript = "\n            function () {\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
    });
    it('should ban a multiline block with a newline after the opening brace', function () {
        var inputScript = "\n            function () {\n\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, [
            {
                failure: 'Opening brace cannot be followed by empty line',
                name: 'file.ts',
                ruleName: ruleName,
                startPosition: {
                    character: 1,
                    line: 3
                }
            }
        ]);
    });
});
