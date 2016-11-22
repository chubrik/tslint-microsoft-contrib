"use strict";
/* tslint:disable:max-func-body-length */
/* tslint:disable:no-consecutive-blank-lines */
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noStringBasedSetIntervalRule', function () {
    var RULE_NAME = 'no-string-based-set-interval';
    it('should produce violations ', function () {
        var inputFile = "\nvar typedStringVariable = 'string variable';\nvar functionVariable = () => {};\nvar anyVariable : any = () => {};\nvar createFunction : () => (() => void) = () => {}; // function that produces a function\nvar untypedCreateFunction: () => any = () => {};    // function that produces a function\nvar stringFunction : () => string = () => { return ''; }; // function that produces a string\n\n// lambdas are OK\nsetInterval(() => {});\nthis.setInterval(() => {});\nwindow.setInterval(() => {});\n// functions are OK\nsetInterval(function () {});\nthis.setInterval(function () {});\nwindow.setInterval(function () {});\n// expressions of type function are OK\nsetInterval(functionVariable);\nthis.setInterval(functionVariable);\nwindow.setInterval(functionVariable);\nvar a = setInterval(functionVariable);\nvar b = this.setInterval(functionVariable);\nvar c = window.setInterval(functionVariable);\nsetInterval(createFunction());\nthis.setInterval(createFunction());\nwindow.setInterval(createFunction());\n\n\n\n// this used to be a false positive.\nfunction invoke(functionArg : () => void) {\n    setInterval(functionArg);\n}\n\n\n// these should all create violations\nsetInterval(\"var x = 'should fail'\");        // example 1\nsetInterval(typedStringVariable);            // example 2\nsetInterval(anyVariable);                    // example 3\nsetInterval(untypedCreateFunction());        // example 4\nsetInterval(stringFunction());               // example 5\nthis.setInterval(\"var x = 'should fail'\");   // example 6\nthis.setInterval(typedStringVariable);       // example 7\nthis.setInterval(anyVariable);               // example 8\nthis.setInterval(untypedCreateFunction());   // example 9\nthis.setInterval(stringFunction());          // example 10\nwindow.setInterval(\"var x = 'should fail'\"); // example 11\nwindow.setInterval(typedStringVariable);     // example 12\nwindow.setInterval(anyVariable);             // example 13\nwindow.setInterval(untypedCreateFunction()); // example 14\nwindow.setInterval(stringFunction());        // example 15\nfunction invoke2(stringArg : string) {\n    setInterval(stringArg);                  // example 16\n}\nfunction invoke3(anyArg : any) {\n    setInterval(anyArg);                     // example 17\n}\n";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "failure": "Forbidden setInterval string parameter: \"var x = 'should fail'\"",
                "name": "file.ts",
                "ruleName": "no-string-based-set-interval",
                "startPosition": { "line": 37, "character": 1 }
            },
            {
                "failure": "Forbidden setInterval string parameter: typedStringVariable",
                "name": "file.ts",
                "ruleName": "no-string-based-set-interval",
                "startPosition": { "line": 38, "character": 1 }
            },
            {
                "failure": "Forbidden setInterval string parameter: anyVariable",
                "name": "file.ts",
                "ruleName": "no-string-based-set-interval",
                "startPosition": { "line": 39, "character": 1 }
            },
            {
                "failure": "Forbidden setInterval string parameter: untypedCreateFunction()",
                "name": "file.ts",
                "ruleName": "no-string-based-set-interval",
                "startPosition": { "line": 40, "character": 1 }
            },
            {
                "failure": "Forbidden setInterval string parameter: stringFunction()",
                "name": "file.ts",
                "ruleName": "no-string-based-set-interval",
                "startPosition": { "line": 41, "character": 1 }
            },
            {
                "failure": "Forbidden setInterval string parameter: \"var x = 'should fail'\"",
                "name": "file.ts",
                "ruleName": "no-string-based-set-interval",
                "startPosition": { "line": 42, "character": 1 }
            },
            {
                "failure": "Forbidden setInterval string parameter: typedStringVariable",
                "name": "file.ts",
                "ruleName": "no-string-based-set-interval",
                "startPosition": { "line": 43, "character": 1 }
            },
            {
                "failure": "Forbidden setInterval string parameter: anyVariable",
                "name": "file.ts",
                "ruleName": "no-string-based-set-interval",
                "startPosition": { "line": 44, "character": 1 }
            },
            {
                "failure": "Forbidden setInterval string parameter: untypedCreateFunction()",
                "name": "file.ts",
                "ruleName": "no-string-based-set-interval",
                "startPosition": { "line": 45, "character": 1 }
            },
            {
                "failure": "Forbidden setInterval string parameter: stringFunction()",
                "name": "file.ts",
                "ruleName": "no-string-based-set-interval",
                "startPosition": { "line": 46, "character": 1 }
            },
            {
                "failure": "Forbidden setInterval string parameter: \"var x = 'should fail'\"",
                "name": "file.ts",
                "ruleName": "no-string-based-set-interval",
                "startPosition": { "line": 47, "character": 1 }
            },
            {
                "failure": "Forbidden setInterval string parameter: typedStringVariable",
                "name": "file.ts",
                "ruleName": "no-string-based-set-interval",
                "startPosition": { "line": 48, "character": 1 }
            },
            {
                "failure": "Forbidden setInterval string parameter: anyVariable",
                "name": "file.ts",
                "ruleName": "no-string-based-set-interval",
                "startPosition": { "line": 49, "character": 1 }
            },
            {
                "failure": "Forbidden setInterval string parameter: untypedCreateFunction()",
                "name": "file.ts",
                "ruleName": "no-string-based-set-interval",
                "startPosition": { "line": 50, "character": 1 }
            },
            {
                "failure": "Forbidden setInterval string parameter: stringFunction()",
                "name": "file.ts",
                "ruleName": "no-string-based-set-interval",
                "startPosition": { "line": 51, "character": 1 }
            },
            {
                "failure": "Forbidden setInterval string parameter: stringArg",
                "name": "file.ts",
                "ruleName": "no-string-based-set-interval",
                "startPosition": { "line": 53, "character": 5 }
            },
            {
                "failure": "Forbidden setInterval string parameter: anyArg",
                "name": "file.ts",
                "ruleName": "no-string-based-set-interval",
                "startPosition": { "line": 56, "character": 5 }
            }
        ]);
    });
});
/* tslint:enable:max-func-body-length */
/* tslint:enable:no-consecutive-blank-lines */
