"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noDocumentDomainRule', function () {
    var ruleName = 'no-document-domain';
    it('should pass when not setting a value to document.domain', function () {
        var script = "\n            console.log(document.domain);\n            console.log(document.domain.value);\n            let x = document.domain;\n            let y = document.domain.value;\n\n            document.domain.value = 'some value';\n            model.domain = 'some model value';\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on assigning constant', function () {
        var script = "\n            document.domain = 'some value';\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Forbidden write to document.domain: document.domain = 'some value'",
                "name": "file.ts",
                "ruleName": "no-document-domain",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on assigning variable', function () {
        var script = "\n            document.domain = someValue;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Forbidden write to document.domain: document.domain = someValue",
                "name": "file.ts",
                "ruleName": "no-document-domain",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on assigning variable on window', function () {
        var script = "\n            window.document.domain = someValue;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Forbidden write to document.domain: window.document.domain = someValue",
                "name": "file.ts",
                "ruleName": "no-document-domain",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should pass when document is aliased because the type checker is so weak', function () {
        var script = "\n            let doc: Document = document;\n            doc.domain = 'some value';\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
});
