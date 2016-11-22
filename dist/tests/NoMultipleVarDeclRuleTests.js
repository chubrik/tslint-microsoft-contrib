"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noMultipleVarDeclRule', function () {
    var ruleName = 'no-multiple-var-decl';
    it('should pass on separate var declaration and multiple var declarations within a for loop', function () {
        var script = "\n            var x = 1;\n            var y: number = 2;\n            var z = [3, 4];\n            for (var i = x, j = y; i < j; i++) {}\n        ";
        TestHelper_1.TestHelper.assertNoViolation(ruleName, script);
    });
    it('should fail on multiple var declaration', function () {
        var script = "\n            var x = 1,\n                y = 2;\n            var x, y = 2, z;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [{
                "failure": "Do not use comma separated variable declarations: x = 1,",
                "name": "file.ts",
                "ruleName": "no-multiple-var-decl",
                "startPosition": { "character": 13, "line": 2 }
            }, {
                "failure": "Do not use comma separated variable declarations: x,",
                "name": "file.ts",
                "ruleName": "no-multiple-var-decl",
                "startPosition": { "character": 13, "line": 4 }
            }]);
    });
});
