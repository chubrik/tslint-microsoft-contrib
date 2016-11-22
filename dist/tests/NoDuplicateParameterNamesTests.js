"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noDuplicateParameterNames', function () {
    var RULE_NAME = 'no-duplicate-parameter-names';
    it('should produce violations ', function () {
        /* tslint:disable:max-line-length */
        var inputFile = "\nclass NoDuplicateParameterNamesTestInput {\n\n    /**\n     * The following code should have no errors:\n     */\n    constructor() {}\n\n    constructor(arg1) {}\n\n    constructor(arg1, arg2) {}\n\n    voidMethod() {}\n    unaryMethod(arg1) {}\n    bindaryMethod(arg1, arg2) {}\n\n    private arrow0 = () => {};\n    private arrow1 = (arg) => {};\n    private arrow2 = (arg1, arg2) => {};\n\n    private arrowFunction0 = function() {};\n    private arrowFunction1 = function(arg) {};\n    private arrowFunction2 = function(arg1, arg2) {};\n\n    /**\n     * The following code should have errors:\n     */\n    constructor(arg1, duplicateConstructorParameter, duplicateConstructorParameter) {}                  // triggers visitConstructorDeclaration\n    binaryMethod2(duplicateMethodParameter, duplicateMethodParameter?) {}                               // triggers visitMethodDeclaration\n    private arrowFunction3 = (duplicateArrowFunctionParameter, duplicateArrowFunctionParameter) => {};  // triggers visitArrowFunction\n    private function3 = function(duplicateFunctionExpParameter, duplicateFunctionExpParameter) {};      // triggers visitFunctionExpression\n}\n\n// these declarations need to be made outside of a class\nfunction function0() {}\nfunction function1(arg) {}\nfunction function2(arg1, arg2) {}\nfunction function3(duplicateFunctionParameter, duplicateFunctionParameter) {}                           // triggers visitFunctionDeclaration\n\n";
        /* tslint:enable:max-line-length */
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "failure": "Duplicate parameter name: 'duplicateConstructorParameter'",
                "name": "file.ts",
                "ruleName": "no-duplicate-parameter-names",
                "startPosition": {
                    "line": 28,
                    "character": 54
                }
            },
            {
                "failure": "Duplicate parameter name: 'duplicateMethodParameter'",
                "name": "file.ts",
                "ruleName": "no-duplicate-parameter-names",
                "startPosition": {
                    "line": 29,
                    "character": 45
                }
            },
            {
                "failure": "Duplicate parameter name: 'duplicateArrowFunctionParameter'",
                "name": "file.ts",
                "ruleName": "no-duplicate-parameter-names",
                "startPosition": {
                    "line": 30,
                    "character": 64
                }
            },
            {
                "failure": "Duplicate parameter name: 'duplicateFunctionExpParameter'",
                "name": "file.ts",
                "ruleName": "no-duplicate-parameter-names",
                "startPosition": {
                    "line": 31,
                    "character": 65
                }
            },
            {
                "failure": "Duplicate parameter name: 'duplicateFunctionParameter'",
                "name": "file.ts",
                "ruleName": "no-duplicate-parameter-names",
                "startPosition": {
                    "line": 38,
                    "character": 48
                }
            }
        ]);
    });
});
