"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noUnexternalizedStringsRule', function () {
    var ruleName = 'no-unexternalized-strings';
    it('should pass on single quote', function () {
        var script = "\n            let str = 'Hello Worlds';\n        ";
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [{ signatures: ['localize', 'nls.localize'], messageIndex: 1 }], script, []);
    });
    it('should pass on template expression', function () {
        var script = 'let str = `Hello ${var} Worlds`;';
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [{ signatures: ['localize', 'nls.localize'], messageIndex: 1 }], script, []);
    });
    it('should pass on localize', function () {
        var script = "\n            let str = localize(\"key\", \"Hello Worlds\");\n        ";
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [{ signatures: ['localize', 'nls.localize'], messageIndex: 1 }], script, []);
    });
    it('should pass on nls.localize', function () {
        var script = "\n            import nls = require('nls');\n            let str = nls.localize(\"Key\", \"Hello World\");\n        ";
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [{ signatures: ['localize', 'nls.localize'], messageIndex: 1 }], script, []);
    });
    it('should pass on import', function () {
        var script = "\n            import { localize } from \"nls\";\n            let str = localize(\"Key\", \"Hello World\");\n        ";
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [{ signatures: ['localize', 'nls.localize'], messageIndex: 1 }], script, []);
    });
    it('should pass on import equals', function () {
        var script = "\n            import nls = require(\"nls\");\n            let str = nls.localize(\"Key\", \"Hello World\");\n        ";
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [{ signatures: ['localize', 'nls.localize'], messageIndex: 1 }], script, []);
    });
    it('should pass on ignores', function () {
        var script = "\n            var nls = require(\"nls\");\n            let str = nls.localize(\"Key\", \"Hello World\");\n        ";
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [{ signatures: ['localize', 'nls.localize'], messageIndex: 1, ignores: ['require'] }], script, []);
    });
    it('should fail on my.localize', function () {
        var script = "\n            let str = my.localize('key', \"Needs localization\");\n        ";
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [{ signatures: ['localize', 'nls.localize'], messageIndex: 1 }], script, [
            {
                "failure": "Unexternalized string found: \"Needs localization\"",
                "name": "file.ts",
                "ruleName": "no-unexternalized-strings",
                "startPosition": {
                    "character": 42,
                    "line": 2
                }
            }
        ]);
    });
    it('should fail on function call inside localize', function () {
        var script = "\n            let str = localize('key', foo(\"Needs localization\"));\n        ";
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [{ signatures: ['localize', 'nls.localize'], messageIndex: 1 }], script, [
            {
                "failure": "Unexternalized string found: \"Needs localization\"",
                "name": "file.ts",
                "ruleName": "no-unexternalized-strings",
                "startPosition": {
                    "character": 43,
                    "line": 2
                }
            }
        ]);
    });
    it('should fail on method call inside localize', function () {
        var script = "\n            let str = localize('key', this.foo(\"Needs localization\"));\n        ";
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [{ signatures: ['localize', 'nls.localize'], messageIndex: 1 }], script, [
            {
                "failure": "Unexternalized string found: \"Needs localization\"",
                "name": "file.ts",
                "ruleName": "no-unexternalized-strings",
                "startPosition": {
                    "character": 48,
                    "line": 2
                }
            }
        ]);
    });
    it('should fail on variable declaration', function () {
        var script = "\n            let str = \"Needs localization\";\n        ";
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [{ signatures: ['localize', 'nls.localize'], messageIndex: 1 }], script, [
            {
                "failure": "Unexternalized string found: \"Needs localization\"",
                "name": "file.ts",
                "ruleName": "no-unexternalized-strings",
                "startPosition": {
                    "character": 23,
                    "line": 2
                }
            }
        ]);
    });
    it('should fail on function declaration', function () {
        var script = "\n            let str: string = undefined;\n            function foo() {\n                str = \"Hello World\";\n            }\n        ";
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [{ signatures: ['localize', 'nls.localize'], messageIndex: 1 }], script, [
            {
                "failure": "Unexternalized string found: \"Hello World\"",
                "name": "file.ts",
                "ruleName": "no-unexternalized-strings",
                "startPosition": {
                    "character": 23,
                    "line": 4
                }
            }
        ]);
    });
    it('should fail on binary expression', function () {
        var script = "\n            localize('key', \"Hello \" + \"World\");\n        ";
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [{ signatures: ['localize', 'nls.localize'], messageIndex: 1 }], script, [
            {
                "failure": "Message argument to 'localize' must be a string literal.",
                "name": "file.ts",
                "ruleName": "no-unexternalized-strings",
                "startPosition": {
                    "character": 29,
                    "line": 2
                }
            }
        ]);
    });
});
