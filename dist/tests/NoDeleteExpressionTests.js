"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noDeleteExpressionRule', function () {
    var RULE_NAME = 'no-delete-expression';
    it('should not produce violations', function () {
        var script = "\n            var x = {\n                myProperty: 'sometext'\n            };\n            delete x.myProperty;\n            delete x[myProperty]\n\n            delete this.router.routes[routeName];\n\n            delete this.router.routes.moreRoutes[routeName];";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, script, []);
    });
    it('should not fail when using subelement notation', function () {
        var script = "\n            delete rights[name];\n        ";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, script, []);
    });
    it('should produce violations ', function () {
        var inputFile = "\n            var something: int = 22;\n\n            if (something) {\n                var variableForDeletion = 10;\n                delete variableForDeletion;\n            } ";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "failure": "Variables should not be deleted: variableForDeletion",
                "name": "file.ts",
                "ruleName": "no-delete-expression",
                "startPosition": {
                    "line": 6,
                    "character": 24
                }
            }
        ]);
    });
});
