"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('missingOptionalAnnotationRule', function () {
    var ruleName = 'missing-optional-annotation';
    it('should not produce violations', function () {
        var inputScript = "\nclass MissingOptionalAnnotationPassingTestInput {\n\n    constructor() {}\n    constructor(arg1?) {}\n    constructor(arg1, arg2?) {}\n    constructor(arg1, arg2?, arg3?) {}\n\n    voidMethod() {}\n    unaryMethod(arg1) {}\n    bindaryMethod(arg1, arg2?) {}\n    ternaryMethod(arg1, arg2?, arg3?) {}\n\n    private arrow0 = () => {};\n    private arrow1 = (arg?) => {};\n    private arrow2 = (arg1, arg2?) => {};\n    private arrow3 = (arg1, arg2?, arg3?) => {};\n\n    private literalFunction0 = function() {};\n    private literalFunction1 = function(arg?) {};\n    private literalFunction2 = function(arg1, arg2?) {};\n    private literalFunction3 = function(arg1, arg2?, arg3?) {};\n\n}\n\n// these declarations need to be made outside of a class\nfunction function0() {}\nfunction function1(arg) {}\nfunction function2(arg1, arg2?) {}\nfunction function3(arg1, arg2?, arg3?) {}";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
    });
    it('should not produce violations for 2nd parameter that has a default initializer', function () {
        var script = 'function something(data? : any, others: Object = {}) { }';
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should produce a violation when 1st parameter has a default initializer', function () {
        var script = 'function something(data : Object = {}, others: any) { }';
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Argument following optional argument missing optional annotation:  others: any",
                "name": "file.ts",
                "ruleName": "missing-optional-annotation",
                "startPosition": {
                    "character": 40,
                    "line": 1
                }
            }
        ]);
    });
    it('should produce violations', function () {
        var inputFile = "\nclass MissingOptionalAnnotationPassingTestInput {\n\n    constructor(optionalArg1?, requiredArg2) {}\n    constructor(requiredArg1, optionalArg2?, requiredArg3) {}\n\n    bindaryMethod(optionalArg1?, requiredArg2) {}\n    ternaryMethod(requiredArg1, optionalArg2?, requiredArg3) {}\n\n    private arrow2 = (optionalArg1?, requiredArg2) => {};\n    private arrow3 = (requiredArg1, optionalArg2?, requiredArg3) => {};\n\n    private literalFunction2 = function(optionalArg1?, requiredArg2) {};\n    private literalFunction3 = function(requiredArg1, optionalArg2?, requiredArg3) {};\n\n}\n\n// these declarations need to be made outside of a class\nfunction function2(optionalArg1?, requiredArg2) {}\nfunction function3(requiredArg1, optionalArg2?, requiredArg3) {}";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, [
            {
                "failure": "Argument following optional argument missing optional annotation:  requiredArg2",
                "name": "file.ts",
                "ruleName": "missing-optional-annotation",
                "startPosition": { "line": 4, "character": 32 }
            },
            {
                "failure": "Argument following optional argument missing optional annotation:  requiredArg3",
                "name": "file.ts",
                "ruleName": "missing-optional-annotation",
                "startPosition": { "line": 5, "character": 46 }
            },
            {
                "failure": "Argument following optional argument missing optional annotation:  requiredArg2",
                "name": "file.ts",
                "ruleName": "missing-optional-annotation",
                "startPosition": { "line": 7, "character": 34 }
            },
            {
                "failure": "Argument following optional argument missing optional annotation:  requiredArg3",
                "name": "file.ts",
                "ruleName": "missing-optional-annotation",
                "startPosition": { "line": 8, "character": 48 }
            },
            {
                "failure": "Argument following optional argument missing optional annotation:  requiredArg2",
                "name": "file.ts",
                "ruleName": "missing-optional-annotation",
                "startPosition": { "line": 10, "character": 38 }
            },
            {
                "failure": "Argument following optional argument missing optional annotation:  requiredArg3",
                "name": "file.ts",
                "ruleName": "missing-optional-annotation",
                "startPosition": { "line": 11, "character": 52 }
            },
            {
                "failure": "Argument following optional argument missing optional annotation:  requiredArg2",
                "name": "file.ts",
                "ruleName": "missing-optional-annotation",
                "startPosition": { "line": 13, "character": 56 }
            },
            {
                "failure": "Argument following optional argument missing optional annotation:  requiredArg3",
                "name": "file.ts",
                "ruleName": "missing-optional-annotation",
                "startPosition": { "line": 14, "character": 70 }
            },
            {
                "failure": "Argument following optional argument missing optional annotation:  requiredArg2",
                "name": "file.ts",
                "ruleName": "missing-optional-annotation",
                "startPosition": { "line": 19, "character": 35 }
            },
            {
                "failure": "Argument following optional argument missing optional annotation:  requiredArg3",
                "name": "file.ts",
                "ruleName": "missing-optional-annotation",
                "startPosition": { "line": 20, "character": 49 }
            }
        ]);
    });
});
