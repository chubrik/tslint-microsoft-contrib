"use strict";
/* tslint:disable:max-func-body-length */
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
/* tslint:disable:no-consecutive-blank-lines */
describe('noStringBasedSetImmediateRule', function () {
    var RULE_NAME = 'no-string-based-set-immediate';
    it('should produce violations ', function () {
        var inputFile = "\nvar typedStringVariable = 'string variable';\nvar functionVariable = () => {};\nvar anyVariable : any = () => {};\nvar createFunction : () => (() => void) = () => {}; // function that produces a function\nvar untypedCreateFunction: () => any = () => {};    // function that produces a function\nvar stringFunction : () => string = () => { return ''; }; // function that produces a string\n\n// lambdas are OK\nsetImmediate(() => {});\nthis.setImmediate(() => {});\nwindow.setImmediate(() => {});\n// functions are OK\nsetImmediate(function () {});\nthis.setImmediate(function () {});\nwindow.setImmediate(function () {});\n// expressions of type function are OK\nsetImmediate(functionVariable);\nthis.setImmediate(functionVariable);\nwindow.setImmediate(functionVariable);\nvar a = setImmediate(functionVariable);\nvar b = this.setImmediate(functionVariable);\nvar c = window.setImmediate(functionVariable);\nsetImmediate(createFunction());\nthis.setImmediate(createFunction());\nwindow.setImmediate(createFunction());\n\n\n\n// this is no longer a false positive\nfunction invoke(functionArg : () => void) {\n    setImmediate(functionArg);\n}\n\n\n// these should all create violations\nsetImmediate(\"var x = 'should fail'\");        // example 1\nsetImmediate(typedStringVariable);            // example 2\nsetImmediate(anyVariable);                    // example 3\nsetImmediate(untypedCreateFunction());        // example 4\nsetImmediate(stringFunction());               // example 5\nthis.setImmediate(\"var x = 'should fail'\");   // example 6\nthis.setImmediate(typedStringVariable);       // example 7\nthis.setImmediate(anyVariable);               // example 8\nthis.setImmediate(untypedCreateFunction());   // example 9\nthis.setImmediate(stringFunction());          // example 10\nwindow.setImmediate(\"var x = 'should fail'\"); // example 11\nwindow.setImmediate(typedStringVariable);     // example 12\nwindow.setImmediate(anyVariable);             // example 13\nwindow.setImmediate(untypedCreateFunction()); // example 14\nwindow.setImmediate(stringFunction());        // example 15\nfunction invoke2(stringArg : string) {\n    setImmediate(stringArg);                  // example 16\n}\nfunction invoke3(anyArg : any) {\n    setImmediate(anyArg);                     // example 17\n}\n";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "failure": "Forbidden setImmediate string parameter: \"var x = 'should fail'\"",
                "name": "file.ts",
                "ruleName": "no-string-based-set-immediate",
                "startPosition": { "line": 37, "character": 1 }
            },
            {
                "failure": "Forbidden setImmediate string parameter: typedStringVariable",
                "name": "file.ts",
                "ruleName": "no-string-based-set-immediate",
                "startPosition": { "line": 38, "character": 1 }
            },
            {
                "failure": "Forbidden setImmediate string parameter: anyVariable",
                "name": "file.ts",
                "ruleName": "no-string-based-set-immediate",
                "startPosition": { "line": 39, "character": 1 }
            },
            {
                "failure": "Forbidden setImmediate string parameter: untypedCreateFunction()",
                "name": "file.ts",
                "ruleName": "no-string-based-set-immediate",
                "startPosition": { "line": 40, "character": 1 }
            },
            {
                "failure": "Forbidden setImmediate string parameter: stringFunction()",
                "name": "file.ts",
                "ruleName": "no-string-based-set-immediate",
                "startPosition": { "line": 41, "character": 1 }
            },
            {
                "failure": "Forbidden setImmediate string parameter: \"var x = 'should fail'\"",
                "name": "file.ts",
                "ruleName": "no-string-based-set-immediate",
                "startPosition": { "line": 42, "character": 1 }
            },
            {
                "failure": "Forbidden setImmediate string parameter: typedStringVariable",
                "name": "file.ts",
                "ruleName": "no-string-based-set-immediate",
                "startPosition": { "line": 43, "character": 1 }
            },
            {
                "failure": "Forbidden setImmediate string parameter: anyVariable",
                "name": "file.ts",
                "ruleName": "no-string-based-set-immediate",
                "startPosition": { "line": 44, "character": 1 }
            },
            {
                "failure": "Forbidden setImmediate string parameter: untypedCreateFunction()",
                "name": "file.ts",
                "ruleName": "no-string-based-set-immediate",
                "startPosition": { "line": 45, "character": 1 }
            },
            {
                "failure": "Forbidden setImmediate string parameter: stringFunction()",
                "name": "file.ts",
                "ruleName": "no-string-based-set-immediate",
                "startPosition": { "line": 46, "character": 1 }
            },
            {
                "failure": "Forbidden setImmediate string parameter: \"var x = 'should fail'\"",
                "name": "file.ts",
                "ruleName": "no-string-based-set-immediate",
                "startPosition": { "line": 47, "character": 1 }
            },
            {
                "failure": "Forbidden setImmediate string parameter: typedStringVariable",
                "name": "file.ts",
                "ruleName": "no-string-based-set-immediate",
                "startPosition": { "line": 48, "character": 1 }
            },
            {
                "failure": "Forbidden setImmediate string parameter: anyVariable",
                "name": "file.ts",
                "ruleName": "no-string-based-set-immediate",
                "startPosition": { "line": 49, "character": 1 }
            },
            {
                "failure": "Forbidden setImmediate string parameter: untypedCreateFunction()",
                "name": "file.ts",
                "ruleName": "no-string-based-set-immediate",
                "startPosition": { "line": 50, "character": 1 }
            },
            {
                "failure": "Forbidden setImmediate string parameter: stringFunction()",
                "name": "file.ts",
                "ruleName": "no-string-based-set-immediate",
                "startPosition": { "line": 51, "character": 1 }
            },
            {
                "failure": "Forbidden setImmediate string parameter: stringArg",
                "name": "file.ts",
                "ruleName": "no-string-based-set-immediate",
                "startPosition": { "line": 53, "character": 5 }
            },
            {
                "failure": "Forbidden setImmediate string parameter: anyArg",
                "name": "file.ts",
                "ruleName": "no-string-based-set-immediate",
                "startPosition": { "line": 56, "character": 5 }
            }
        ]);
    });
});
/* tslint:enable:max-func-body-length */
/* tslint:enable:no-consecutive-blank-lines */
