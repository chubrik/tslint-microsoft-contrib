/* tslint:disable:max-func-body-length */
"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noUnsupportedBrowserCodeRule', function () {
    var ruleName = 'no-unsupported-browser-code';
    var options = [true, [
            'Mobile IE 10',
            'IE >= 10',
            'Chrome > 45',
            'Firefox',
            'Mobile Safari < 10'
        ]];
    it('should pass on matching supported browsers', function () {
        var script = "\n            class Test {\n                // Browser Specific: Chrome 49\n                sayHey() {\n                    console.log('hey');\n                }\n\n                // browser specific: IE 10\n                sayHello() {\n                    console.log('hello');\n                }\n\n                /**\n                 * Says hi\n                 *\n                 * @browserspecific Firefox 48\n                 */\n                sayHi() {\n                    console.log('hi');\n                }\n\n                // Browser specific: firefox\n                sayBye() {\n                    console.log('bye');\n                }\n\n                /**\n                 * goes boom\n                 *\n                 * @browserspecific mobile safari 9\n                 * @browserspecific            IE 10\n                 */\n                goBoom() {\n                    throw new Error('boom');\n                }\n\n                /**\n                 * goes vroom\n                 *\n                 * @browserspecific mobile ie 10\n                 */\n                goVroom() {\n                    console.log('vroom');\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertNoViolationWithOptions(ruleName, options, script);
    });
    it('should fail on matching unsupported browsers', function () {
        var script = "\n            class Test {\n                // Browser Specific: Netscape 2\n                sayHey() {\n                    console.log('hey');\n                }\n\n                // browser specific: Chrome\n                sayHello() {\n                    console.log('hello');\n                }\n\n                /**\n                 * @browserspecific IE 8\n                 */\n                sayHi() {\n                    console.log('hi');\n                }\n\n                // Browser specific: aquaman\n                sayBye() {\n                    console.log('bye');\n                }\n\n                /**\n                 * goes boom\n                 *\n                 * @browserspecific mobile safari 10\n                 * @browserspecific            IE 8\n                 * @browserspecific            IE\n                 */\n                goBoom() {\n                    throw new Error('boom');\n                }\n\n                /**\n                 * goes vroom\n                 *\n                 * @browserspecific mobile ie 9\n                 */\n                goVroom() {\n                    console.log('vroom');\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, options, script, [
            {
                "failure": "Unsupported browser: Netscape",
                "name": "file.ts",
                "ruleName": "no-unsupported-browser-code",
                "startPosition": {
                    "character": 20,
                    "line": 3
                }
            },
            {
                "failure": "Unsupported browser version: Chrome unspecified version",
                "name": "file.ts",
                "ruleName": "no-unsupported-browser-code",
                "startPosition": {
                    "character": 20,
                    "line": 8
                }
            },
            {
                "failure": "Unsupported browser version: IE 8",
                "name": "file.ts",
                "ruleName": "no-unsupported-browser-code",
                "startPosition": {
                    "character": 20,
                    "line": 14
                }
            },
            {
                "failure": "Unsupported browser: aquaman",
                "name": "file.ts",
                "ruleName": "no-unsupported-browser-code",
                "startPosition": {
                    "character": 20,
                    "line": 20
                }
            },
            {
                "failure": "Unsupported browser version: mobile safari 10",
                "name": "file.ts",
                "ruleName": "no-unsupported-browser-code",
                "startPosition": {
                    "character": 20,
                    "line": 28
                }
            },
            {
                "failure": "Unsupported browser version: IE 8",
                "name": "file.ts",
                "ruleName": "no-unsupported-browser-code",
                "startPosition": {
                    "character": 20,
                    "line": 29
                }
            },
            {
                "failure": "Unsupported browser version: IE unspecified version",
                "name": "file.ts",
                "ruleName": "no-unsupported-browser-code",
                "startPosition": {
                    "character": 20,
                    "line": 30
                }
            },
            {
                "failure": "Unsupported browser version: mobile ie 9",
                "name": "file.ts",
                "ruleName": "no-unsupported-browser-code",
                "startPosition": {
                    "character": 20,
                    "line": 39
                }
            }
        ]);
    });
});
/* tslint:enable:max-func-body-length */ 
