"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noConstantConditionRule', function () {
    var ruleName = 'no-constant-condition';
    it('should pass on comparisons', function () {
        var script = "\n            if (something === false) {}\n            if (something === true) {}\n            if (something > 1) {}\n            if (1 > something) {}\n            if (0 < 9 < 4 > something) {}\n            if (something < 9 < 4 > 2) {}\n            if (0 && 9 || 4 && !something) {}\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on hard coded loops when checkLoops is false', function () {
        var script = "\n            while (true) {\n                doSomething();\n            };\n\n            for (;true;) {\n                doSomething();\n            };\n\n            do {\n                doSomething();\n            } while (true)";
        var options = [true, { 'checkLoops': false }];
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, options, script, []);
    });
    it('should fail on if-booleans', function () {
        var script = "\n            if (false) {}\n            if (true) {}\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found constant conditional: if (false)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found constant conditional: if (true)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 3 }
            }
        ]);
    });
    it('should fail on constant comparisons', function () {
        var script = "\n            if (0 < 9) {}\n            if (0 > 9) {}\n            if (0 <= 9) {}\n            if (0 >= 9) {}\n            if (0 == 9) {}\n            if (0 != 9) {}\n            if (0 === 9) {}\n            if (0 !== 9) {}\n            if (0 >= 9) {}\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found constant conditional: if (0 < 9)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found constant conditional: if (0 > 9)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 3 }
            },
            {
                "failure": "Found constant conditional: if (0 <= 9)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 4 }
            },
            {
                "failure": "Found constant conditional: if (0 >= 9)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 5 }
            },
            {
                "failure": "Found constant conditional: if (0 == 9)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 6 }
            },
            {
                "failure": "Found constant conditional: if (0 != 9)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 7 }
            },
            {
                "failure": "Found constant conditional: if (0 === 9)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 8 }
            },
            {
                "failure": "Found constant conditional: if (0 !== 9)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 9 }
            },
            {
                "failure": "Found constant conditional: if (0 >= 9)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 10 }
            }
        ]);
    });
    it('should fail on nested constant comparison', function () {
        var script = "\n            if (0 < 9 < 4 > 2) {}\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found constant conditional: if (0 < 9 < 4 > 2)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on constant infix arithmetic', function () {
        var script = "\n            if (0 + 9) {}\n            if (0 - 9) {}\n            if (0 * 9) {}\n            if (0 / 9) {}\n            if (0 % 9) {}\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found constant conditional: if (0 + 9)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found constant conditional: if (0 - 9)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 3 }
            },
            {
                "failure": "Found constant conditional: if (0 * 9)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 4 }
            },
            {
                "failure": "Found constant conditional: if (0 / 9)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 5 }
            },
            {
                "failure": "Found constant conditional: if (0 % 9)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 6 }
            }
        ]);
    });
    it('should fail on constant postfix arithmetic', function () {
        var script = "\n            if (0++) {}\n            if (0--) {}\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found constant conditional: if (0++)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found constant conditional: if (0--)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 3 }
            }
        ]);
    });
    it('should fail on constant prefix arithmetic', function () {
        var script = "\n            if (++0) {}\n            if (--0) {}\n            if (!true) {}\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found constant conditional: if (++0)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found constant conditional: if (--0)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 3 }
            },
            {
                "failure": "Found constant conditional: if (!true)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 4 }
            }
        ]);
    });
    it('should fail on logic operators', function () {
        var script = "\n            if (0 && 2) {}\n            if (3 || 9) {}\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found constant conditional: if (0 && 2)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found constant conditional: if (3 || 9)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 3 }
            }
        ]);
    });
    it('should fail on if-numbers', function () {
        var script = "\n            if (0) {}\n            if (1) {}\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found constant conditional: if (0)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found constant conditional: if (1)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 13, "line": 3 }
            }
        ]);
    });
    it('should fail on ternary-booleans', function () {
        var script = "\n            var x = true ? 1 : 0;\n            var y = false ? 1 : 0;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found constant conditional: true ?",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 21, "line": 2 }
            },
            {
                "failure": "Found constant conditional: false ?",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": { "character": 21, "line": 3 }
            }
        ]);
    });
    it('should fail on ternary-numbers', function () {
        var script = "\n            var x = 1 ? 1 : 0;\n            var y = 0 ? 1 : 0;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found constant conditional: 1 ?",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": {
                    "character": 21,
                    "line": 2
                }
            },
            {
                "failure": "Found constant conditional: 0 ?",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": {
                    "character": 21,
                    "line": 3
                }
            }
        ]);
    });
    it('should fail on while-booleans', function () {
        var script = "\n            while (false) {}\n            while (true) {}\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found constant conditional: while (false)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": {
                    "character": 13,
                    "line": 2
                }
            },
            {
                "failure": "Found constant conditional: while (true)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": {
                    "character": 13,
                    "line": 3
                }
            }
        ]);
    });
    it('should fail on while-numbers', function () {
        var script = "\n            while (0) {}\n            while (1) {}\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found constant conditional: while (0)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": {
                    "character": 13,
                    "line": 2
                }
            },
            {
                "failure": "Found constant conditional: while (1)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": {
                    "character": 13,
                    "line": 3
                }
            }
        ]);
    });
    it('should fail on do-while-booleans', function () {
        var script = "\n            do {} while (true)\n            do {} while (false)\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found constant conditional: while (true)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": {
                    "character": 13,
                    "line": 2
                }
            },
            {
                "failure": "Found constant conditional: while (false)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": {
                    "character": 13,
                    "line": 3
                }
            }
        ]);
    });
    it('should fail on do-while-numbers', function () {
        var script = "\n            do {} while (1)\n            do {} while (0)\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found constant conditional: while (1)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": {
                    "character": 13,
                    "line": 2
                }
            },
            {
                "failure": "Found constant conditional: while (0)",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": {
                    "character": 13,
                    "line": 3
                }
            }
        ]);
    });
    it('should fail on for-booleans', function () {
        var script = "\n            for (;true;) { }\n            for (;false;) { }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found constant conditional: ;true;",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": {
                    "character": 13,
                    "line": 2
                }
            },
            {
                "failure": "Found constant conditional: ;false;",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": {
                    "character": 13,
                    "line": 3
                }
            }
        ]);
    });
    it('should fail on for-numbers', function () {
        var script = "\n            for (;1;) { }\n            for (;0;) { }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found constant conditional: ;1;",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": {
                    "character": 13,
                    "line": 2
                }
            },
            {
                "failure": "Found constant conditional: ;0;",
                "name": "file.ts",
                "ruleName": "no-constant-condition",
                "startPosition": {
                    "character": 13,
                    "line": 3
                }
            }
        ]);
    });
});
