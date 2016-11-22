"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noDisableAutoSanitizationRule', function () {
    it('should produce violation for execUnsafeLocalFunction', function () {
        var ruleName = 'no-disable-auto-sanitization';
        var script = 'var retVal = MSApp.execUnsafeLocalFunction(() => {});';
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Forbidden call to execUnsafeLocalFunction",
                "ruleName": "no-disable-auto-sanitization",
                "name": "file.ts",
                "startPosition": { "line": 1, "character": 14 }
            }
        ]);
    });
    it('should produce violation for setInnerHTMLUnsafe', function () {
        var ruleName = 'no-disable-auto-sanitization';
        var script = 'WinJS.Utilities.setInnerHTMLUnsafe(element, text);';
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Forbidden call to setInnerHTMLUnsafe",
                "ruleName": "no-disable-auto-sanitization",
                "name": "file.ts",
                "startPosition": { "line": 1, "character": 1 }
            }
        ]);
    });
});
