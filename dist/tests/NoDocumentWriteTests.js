"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noDocumentWriteRule', function () {
    var RULE_NAME = 'no-document-write';
    it('should not produce violations ', function () {
        var script = "\ninterface DocumentLikeAPI {\n    write: ((arg : string) => void);\n    writeln: ((arg : string) => void);\n}\n\nfunction documentLikeAPIFunction() : DocumentLikeAPI {\n    return {\n        write: () => {},\n        writeln: () => {},\n    };\n}\n\n// These usages are OK because they are not on the DOM document\nvar documentAPI : DocumentLikeAPI = documentLikeAPIFunction();\ndocumentAPI.write('...');\ndocumentAPI.writeln('...');\ndocumentLikeAPIFunction().write('...');\ndocumentLikeAPIFunction().writeln('...');\n\n// wrong # of args\ndocument.write();\ndocument.write('', '');\ndocument.writeln();\ndocument.writeln('', '');\n\n// type system has no idea what 'doc' is\nvar doc = document;\ndoc.write('...');\ndoc.writeln('...');\n\n// type system has no idea what 'documentFunction' returns\nfunction documentFunction() : Document {\n    return window.document;\n}\ndocumentFunction().write('...');\ndocumentFunction().writeln('...');\n\n// this is not the window presumably\nthis.document.write('...');\nthis.document.writeln('...');\n";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, script, []);
    });
    it('should produce violations ', function () {
        var script = "\ndocument.write('...');\ndocument.writeln('...');\nwindow.document.write('...');\nwindow.document.writeln('...');\n";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, script, [
            {
                "failure": "Forbidden call to document.write",
                "name": "file.ts",
                "ruleName": "no-document-write",
                "startPosition": { "character": 1, "line": 2 }
            },
            {
                "failure": "Forbidden call to document.writeln",
                "name": "file.ts",
                "ruleName": "no-document-write",
                "startPosition": { "character": 1, "line": 3 }
            },
            {
                "failure": "Forbidden call to document.write",
                "name": "file.ts",
                "ruleName": "no-document-write",
                "startPosition": { "character": 1, "line": 4 }
            },
            {
                "failure": "Forbidden call to document.writeln",
                "name": "file.ts",
                "ruleName": "no-document-write",
                "startPosition": { "character": 1, "line": 5 }
            }
        ]);
    });
});
