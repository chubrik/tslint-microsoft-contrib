"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('useNamedParameterRule', function () {
    var ruleName = 'use-named-parameter';
    it('should ban referencing arguments by numeric index', function () {
        var inputScript = "\nfunction add() {\n    return arguments[0] + arguments[1];\n}";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, [
            {
                "failure": "Use a named parameter instead: 'arguments[0]'",
                "name": "file.ts",
                "ruleName": "use-named-parameter",
                "startPosition": { "character": 12, "line": 3 }
            },
            {
                "failure": "Use a named parameter instead: 'arguments[1]'",
                "name": "file.ts",
                "ruleName": "use-named-parameter",
                "startPosition": { "character": 27, "line": 3 }
            }
        ]);
    });
    it('should allow referencing arguments by variable index', function () {
        var inputScript = "\nfunction add() {\n    return arguments[whatever()] + arguments[n];\n}";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
    });
});
