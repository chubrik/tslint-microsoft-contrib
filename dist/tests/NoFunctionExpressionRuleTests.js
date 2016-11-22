"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noFunctionExpressionRule', function () {
    var ruleName = 'no-function-expression';
    it('should pass on arrow function', function () {
        var script = "\n            var x = (): void => {\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on generator', function () {
        var script = "\n            var x = (): void => {\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on function with this', function () {
        var script = "\n            var x = function() {\n                this.accessBoundProperty;\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on function expression', function () {
        var script = "\n            var x = function() {\n                var y = function() {\n                    this.accessProperty;\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [{
                "failure": "Use arrow function instead of function expression",
                "name": "file.ts",
                "ruleName": "no-function-expression",
                "startPosition": {
                    "character": 21,
                    "line": 2
                }
            }]);
    });
    it('should fail on nested function expression', function () {
        var script = "\n            var x = function() {\n                this.someReference;\n                var y = function() {\n                    this.someOtherReference;\n                    var z = function() {\n                        // violation here\n                        var z1 = function() {\n                            // violation here\n                        }\n                    }\n                }\n            ab}\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Use arrow function instead of function expression",
                "name": "file.ts",
                "ruleName": "no-function-expression",
                "startPosition": { "character": 29, "line": 6 }
            },
            {
                "failure": "Use arrow function instead of function expression",
                "name": "file.ts",
                "ruleName": "no-function-expression",
                "startPosition": { "character": 34, "line": 8 }
            }
        ]);
    });
});
