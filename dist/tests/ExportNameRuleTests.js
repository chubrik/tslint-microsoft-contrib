"use strict";
var TestHelper_1 = require("./TestHelper");
var exportNameRule_1 = require("../exportNameRule");
/**
 * Unit tests.
 */
describe('exportNameRule', function () {
    var ruleName = 'export-name';
    var exceptions = [];
    var original;
    beforeEach(function () {
        original = exportNameRule_1.Rule.getExceptions;
        exportNameRule_1.Rule.getExceptions = function () { return exceptions; };
    });
    afterEach(function () {
        exportNameRule_1.Rule.getExceptions = original;
    });
    describe('should pass', function () {
        it('when export equals assignment matches', function () {
            exceptions.length = 0;
            var inputFile = 'test-data/ExportName/ExportNameRulePassingTestInput.ts';
            TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, []);
        });
        it('when export equals assignment matches in tsx file', function () {
            exceptions.length = 0;
            var inputFile = 'test-data/ExportName/ExportNameRulePassingTestInput2.tsx';
            TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, []);
        });
        it('for conflicting name when suppressed', function () {
            exceptions.push('ThisIsNot.*NameOfTheFile');
            var inputFile = 'test-data/ExportName/ExportNameRuleFailingTestInput.ts';
            TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, []);
        });
        it('when single module is named same as the file', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export module file {\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when single module is named same as the file with nested elements', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export module file {\n                    export module file2 {\n                    }\n                    export class file3 {\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when single class is named same as the file', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export class file {\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when a single namespaced class is named the same as the file', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                namespace com.example {\n                    export class file {\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when single class is name same as the file with nested elements', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export class file {\n                    export module file2 {\n                    }\n                    export class file3 {\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when multiple classes are exported within a namespace', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                namespace com.example {\n                    export class file2 {\n                    }\n                    export class file3 {\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when single let is named same as the file', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export let file = [];\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when single const is named same as the file', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export const file = [];\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when single function is named same as the file', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export function file() {};\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when anonymous Object is exported', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export {};\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when multiple classes are exported', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export class file { }\n                export class file2 { }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('multiple modules are exported', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export module file { }\n                export module file2 { }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('multiple variables are exported', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export var x, y;\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when multiple consts are exported', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export const x = '', y = '';\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when multiple lets are exported', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export let x = '', y = '';\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when a variety of things are exported', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export let y = '';\n                export module file2 { }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when a module and a function are exported', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                module file {\n                    export function toErrorReport() {\n                    }\n                }\n                export = file;\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
    });
    describe('should fail', function () {
        it('for conflicting name', function () {
            exceptions.length = 0;
            var inputFile = 'test-data/ExportName/ExportNameRuleFailingTestInput.ts';
            TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, [
                {
                    "failure": "The exported module or identifier name must match the file name. " +
                        "Found: test-data/ExportName/ExportNameRuleFailingTestInput.ts and ThisIsNotTheNameOfTheFile",
                    "name": "test-data/ExportName/ExportNameRuleFailingTestInput.ts",
                    "ruleName": "export-name",
                    "startPosition": { "character": 10, "line": 4 }
                }
            ]);
        });
        it('for conflicting name in tsx file', function () {
            exceptions.length = 0;
            var inputFile = 'test-data/ExportName/ExportNameRuleFailingTestInput2.tsx';
            TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, [
                {
                    "failure": "The exported module or identifier name must match the file name. " +
                        "Found: test-data/ExportName/ExportNameRuleFailingTestInput2.tsx and ThisIsNotTheNameOfTheFile",
                    "name": "test-data/ExportName/ExportNameRuleFailingTestInput2.tsx",
                    "ruleName": "export-name",
                    "startPosition": { "character": 10, "line": 4 }
                }
            ]);
        });
        it('for conflicting name in namespace', function () {
            exceptions.length = 0;
            var inputScript = "\n                namespace com.example {\n                    export class NotMatching {\n                    }\n                }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, [
                {
                    "failure": "The exported module or identifier name must match the file name. Found: file.ts and NotMatching",
                    "name": "file.ts",
                    "ruleName": "export-name",
                    "startPosition": { "character": 21, "line": 3 }
                }
            ]);
        });
        it('when mis-named module is exported', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export module Example1 {}\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "The exported module or identifier name must match the file name. Found: file.ts and Example1",
                    "name": "file.ts",
                    "ruleName": "export-name",
                    "startPosition": { "character": 17, "line": 2
                    }
                }
            ]);
        });
        it('when mis-named class is exported', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export class Example2 {}\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "The exported module or identifier name must match the file name. Found: file.ts and Example2",
                    "name": "file.ts",
                    "ruleName": "export-name",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('when mis-named function is exported', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export function Example3() {}\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "The exported module or identifier name must match the file name. Found: file.ts and Example3",
                    "name": "file.ts",
                    "ruleName": "export-name",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('when mis-named let defined variable is exported', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export let Example4 = [];\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "The exported module or identifier name must match the file name. Found: file.ts and Example4",
                    "name": "file.ts",
                    "ruleName": "export-name",
                    "startPosition": { "character": 28, "line": 2 }
                }
            ]);
        });
        it('when mis-named const is exported', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export const Example5 = [];\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "The exported module or identifier name must match the file name. Found: file.ts and Example5",
                    "name": "file.ts",
                    "ruleName": "export-name",
                    "startPosition": { "character": 30, "line": 2 }
                }
            ]);
        });
        it('when mis-named var defined variable is exported', function () {
            // TestHelper assumes that all scripts are within file.ts
            var script = "\n                export var Example6 = [];\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "The exported module or identifier name must match the file name. Found: file.ts and Example6",
                    "name": "file.ts",
                    "ruleName": "export-name",
                    "startPosition": { "character": 28, "line": 2 }
                }
            ]);
        });
    });
});
