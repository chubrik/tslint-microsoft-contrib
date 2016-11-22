"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noCookiesRule', function () {
    it('should not produce violations', function () {
        var ruleName = 'no-cookies';
        var inputFile = "\ninterface DocumentLikeAPI {\n    cookie: string;\n}\n\nfunction documentLikeAPIFunction() : DocumentLikeAPI {\n    return null;\n}\n\n// These usages are OK because they are not on the DOM document\nvar document : DocumentLikeAPI = documentLikeAPIFunction();\ndocument.cookie = '...';\ndocument.cookie = '...';\ndocumentLikeAPIFunction().cookie = '...';";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, []);
    });
    it('should produce violations', function () {
        var ruleName = 'no-cookies';
        var inputFile = 'test-data/NoCookies/NoCookiesFailingTestInput.ts';
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, [
            {
                "failure": "Forbidden call to document.cookie",
                "name": "test-data/NoCookies/NoCookiesFailingTestInput.ts",
                "ruleName": "no-cookies",
                "startPosition": { "line": 7, "character": 1 }
            },
            {
                "failure": "Forbidden call to document.cookie",
                "name": "test-data/NoCookies/NoCookiesFailingTestInput.ts",
                "ruleName": "no-cookies",
                "startPosition": { "line": 8, "character": 1 }
            },
            {
                "failure": "Forbidden call to document.cookie",
                "name": "test-data/NoCookies/NoCookiesFailingTestInput.ts",
                "ruleName": "no-cookies",
                "startPosition": { "line": 9, "character": 1 }
            },
            {
                "failure": "Forbidden call to document.cookie",
                "name": "test-data/NoCookies/NoCookiesFailingTestInput.ts",
                "ruleName": "no-cookies",
                "startPosition": { "line": 11, "character": 1 }
            },
            {
                "failure": "Forbidden call to document.cookie",
                "name": "test-data/NoCookies/NoCookiesFailingTestInput.ts",
                "ruleName": "no-cookies",
                "startPosition": { "line": 14, "character": 1 }
            }
        ]);
    });
    it('should not throw error ', function () {
        var ruleName = 'no-cookies';
        var inputFile = 'test-data/NoCookies/NoCookiesTestInput-error.ts';
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, [
            {
                "failure": "Forbidden call to document.cookie",
                "name": "test-data/NoCookies/NoCookiesTestInput-error.ts",
                "ruleName": "no-cookies",
                "startPosition": { "line": 5, "character": 16 }
            }
        ]);
    });
});
