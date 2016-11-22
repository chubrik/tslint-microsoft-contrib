"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('unnecessaryFieldInitializationRule', function () {
    var ruleName = 'no-unnecessary-field-initialization';
    it('should pass on settings fields to different values', function () {
        var script = "\n            class MyClass {\n                private myField1;\n                private myField2 = 'value';\n                private myField3 = null;\n\n                constructor() {\n                    this.myField1 = 'something';\n                    this.myField2 = undefined;\n                    this.myField3 = undefined;\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on initializing to undefined', function () {
        var script = "\n            class MyClass {\n                private myField = undefined;\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unnecessary field initialization. Field explicitly initialized to undefined: myField",
                "name": "file.ts",
                "ruleName": "no-unnecessary-field-initialization",
                "startPosition": { "character": 35, "line": 3 }
            }
        ]);
    });
    it('should fail on setting to undefined', function () {
        var script = "\n            class MyClass {\n                private myField;\n                constructor() {\n                    this.myField = undefined;\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unnecessary field initialization. Field explicitly initialized to undefined: this.myField",
                "name": "file.ts",
                "ruleName": "no-unnecessary-field-initialization",
                "startPosition": { "character": 21, "line": 5 }
            }
        ]);
    });
    it('should fail on initializing and setting to same values', function () {
        var script = "\n            class MyClass {\n                private myField1 = null;\n                private myField2 = 'value';\n                private myField3 = 12345;\n                private myField4 = true;\n                private myField5 = false;\n\n                constructor() {\n                    this.myField1 = null;\n                    this.myField2 = 'value';\n                    this.myField3 = 12345;\n                    this.myField4 = true;\n                    this.myField5 = false;\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unnecessary field initialization. Field value already initialized in declaration: this.myField1 = null",
                "name": "file.ts",
                "ruleName": "no-unnecessary-field-initialization",
                "startPosition": { "character": 21, "line": 10 }
            },
            {
                "failure": "Unnecessary field initialization. Field value already initialized in declaration: this.myField2 = 'value'",
                "name": "file.ts",
                "ruleName": "no-unnecessary-field-initialization",
                "startPosition": { "character": 21, "line": 11 }
            },
            {
                "failure": "Unnecessary field initialization. Field value already initialized in declaration: this.myField3 = 12345",
                "name": "file.ts",
                "ruleName": "no-unnecessary-field-initialization",
                "startPosition": { "character": 21, "line": 12 }
            },
            {
                "failure": "Unnecessary field initialization. Field value already initialized in declaration: this.myField4 = true",
                "name": "file.ts",
                "ruleName": "no-unnecessary-field-initialization",
                "startPosition": { "character": 21, "line": 13 }
            },
            {
                "failure": "Unnecessary field initialization. Field value already initialized in declaration: this.myField5 = false",
                "name": "file.ts",
                "ruleName": "no-unnecessary-field-initialization",
                "startPosition": { "character": 21, "line": 14 }
            }
        ]);
    });
});
