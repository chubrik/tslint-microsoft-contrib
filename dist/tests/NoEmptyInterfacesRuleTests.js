"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noEmptyInterfacesRule', function () {
    var ruleName = 'no-empty-interfaces';
    it('should pass on interface with 1 attribute', function () {
        var script = "\n            interface MyInterface {\n                attribute: string;\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on interface with two different parents', function () {
        var script = "\n            interface MyInterface extends First, Second {\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on interface with only 1 parent (what is the point?)', function () {
        var script = "\n            interface MyInterface extends First {\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Do not declare empty interfaces: 'MyInterface'",
                "name": "file.ts",
                "ruleName": "no-empty-interfaces",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on empty interface', function () {
        var script = "\n            interface MyInterface {\n                // adding comments will not help you.\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Do not declare empty interfaces: 'MyInterface'",
                "name": "file.ts",
                "ruleName": "no-empty-interfaces",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
});
