"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noExecScriptRule', function () {
    var RULE_NAME = 'no-exec-script';
    it('should produce violations ', function () {
        var inputFile = "\nexecScript('alert(\"hello world\")');\nthis.execScript('alert(\"hello world\")');\nwindow.execScript('alert(\"hello world\")');\n(<any>window).execScript('alert(\"hello world\")');\n\nvar a = execScript('alert(\"hello world\")');\nvar b = this.execScript('alert(\"hello world\")');\nvar c = window.execScript('alert(\"hello world\")');\nvar d = (<any>window).execScript('alert(\"hello world\")');\n\n";
        TestHelper_1.TestHelper.assertViolations(RULE_NAME, inputFile, [
            {
                "failure": "forbidden execScript: execScript",
                "name": "file.ts",
                "ruleName": "no-exec-script",
                "startPosition": {
                    "line": 2,
                    "character": 1
                }
            },
            {
                "failure": "forbidden execScript: this.execScript",
                "name": "file.ts",
                "ruleName": "no-exec-script",
                "startPosition": {
                    "line": 3,
                    "character": 1
                }
            },
            {
                "failure": "forbidden execScript: window.execScript",
                "name": "file.ts",
                "ruleName": "no-exec-script",
                "startPosition": {
                    "line": 4,
                    "character": 1
                }
            },
            {
                "failure": "forbidden execScript: (<any>window).execScript",
                "name": "file.ts",
                "ruleName": "no-exec-script",
                "startPosition": {
                    "line": 5,
                    "character": 1
                }
            },
            {
                "failure": "forbidden execScript: execScript",
                "name": "file.ts",
                "ruleName": "no-exec-script",
                "startPosition": {
                    "line": 7,
                    "character": 9
                }
            },
            {
                "failure": "forbidden execScript: this.execScript",
                "name": "file.ts",
                "ruleName": "no-exec-script",
                "startPosition": {
                    "line": 8,
                    "character": 9
                }
            },
            {
                "failure": "forbidden execScript: window.execScript",
                "name": "file.ts",
                "ruleName": "no-exec-script",
                "startPosition": {
                    "line": 9,
                    "character": 9
                }
            },
            {
                "failure": "forbidden execScript: (<any>window).execScript",
                "name": "file.ts",
                "ruleName": "no-exec-script",
                "startPosition": {
                    "line": 10,
                    "character": 9
                }
            }
        ]);
    });
});
