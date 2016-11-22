"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('promiseMustCompleteRule', function () {
    var ruleName = 'promise-must-complete';
    describe('should pass', function () {
        it('when promise completes', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    if (something) {\n                        resolve('value');\n                    } else {\n                        if (somethingElse) {\n                            resolve('value');\n                        } else {\n                            reject();\n                        }\n                    }\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('on resolve - lambda', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    resolve('value');\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('on resolve - function', function () {
            var script = "\n                new Promise<string>(function (resolve, reject) {\n                    resolve('value');\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('on resolve - alternative name', function () {
            var script = "\n                new Promise<string>((someOtherName, reject) => {\n                    someOtherName('value');\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('on reject', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    reject('value);\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('on reject - function', function () {
            var script = "\n                new Promise<string>(function (resolve, reject) {\n                    reject('value);\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('on reject - alternative name', function () {
            var script = "\n                new Promise<string>((resolve, someOtherName) => {\n                    someOtherName('value);\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when single branch is completed - with if-statement', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    if (something) {\n                        resolve('value');\n                    }\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when single branch is completed - with if-else-statement', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    if (something) {\n                        resolve('value');\n                    } else {\n                        resolve('value');\n                    }\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when single branch is completed - with if-else-statement', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    if (something) {\n                        if (somethingElse) {\n                            resolve('value');\n                        } else {\n                            reject();\n                        }\n                    } else {\n                        if (somethingElse) {\n                            resolve('value');\n                        } else {\n                            reject();\n                        }\n                    }\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('with nested if-else statement', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    if (something) {\n                        if (somethingElse) {\n                            resolve('value');\n                        } else {\n                            reject();\n                        }\n                    } else {\n                        if (somethingElse) {\n                            somethingElse();\n                        } else {\n                            reject();\n                        }\n                        reject(); // branches are not even analyzed when main thread resolves\n                    }\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when resolved within a function', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    someCall(function () {\n                        resolve('value');\n                    });\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when resolved within a lambda', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    someCall(() => {\n                        resolve();\n                    });\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when resolved within a lambda - with extra parameter', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    someCall((someParm) => {\n                        resolve('value');\n                    });\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when resolved within a for loop', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    for(var x = 0; x < something.length; x++) {\n                        resolve('value');\n                    }\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when resolved within a for in loop', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    for(var x in something) {\n                        resolve('value');\n                    }\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when resolved within a while loop', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    while (something) {\n                        resolve();\n                    }\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when resolve reference escaped into a function call', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    doSomething(resolve); // reference escapes and we assume it resolves\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when reject reference escaped into a function call', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    doSomething(reject); // reference escapes and we assume it resolves\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when non-shadowed parameter resolves within a function', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    someCall(function (arg1, reject) {\n                        resolve('value');\n                    });\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when non-shadowed parameter rejects within a function', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    someCall(function (resolve, arg2) {\n                        reject();\n                    });\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when non-shadowed parameter resolves within a lambda', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    someCall((arg1, reject) => {\n                        resolve('value');\n                    });\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when non-shadowed parameter rejects within a lambda', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    someCall((resolve, arg2) => {\n                        reject();\n                    });\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
    });
    describe('should fail', function () {
        it('when empty lambda', function () {
            var script = "\n                new Promise<string>(() => {\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "A Promise was found that appears to not have resolve or reject invoked on all code paths",
                    "name": "file.ts",
                    "ruleName": "promise-must-complete",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('when empty function', function () {
            var script = "\n                new Promise<string>(function {\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "A Promise was found that appears to not have resolve or reject invoked on all code paths",
                    "name": "file.ts",
                    "ruleName": "promise-must-complete",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('when has no complete', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "A Promise was found that appears to not have resolve or reject invoked on all code paths",
                    "name": "file.ts",
                    "ruleName": "promise-must-complete",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('when single branch is missing complete - with if-statement', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    if (something) {\n                        someOtherFunction();\n                    }\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "A Promise was found that appears to not have resolve or reject invoked on all code paths",
                    "name": "file.ts",
                    "ruleName": "promise-must-complete",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('when single branch is missing complete - with if-else-statement', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    if (something) {\n                        resolve('value');\n                    } else {\n                        someOtherFunction()\n                    }\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "A Promise was found that appears to not have resolve or reject invoked on all code paths",
                    "name": "file.ts",
                    "ruleName": "promise-must-complete",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('with nested if-else statement', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    if (something) {\n                        if (somethingElse) {\n                            resolve('value');\n                        } else {\n                            reject();\n                        }\n                    } else {\n                        if (somethingElse) {\n                            somethingElse();\n                        } else {\n                            reject();\n                        }\n                    }\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "A Promise was found that appears to not have resolve or reject invoked on all code paths",
                    "name": "file.ts",
                    "ruleName": "promise-must-complete",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('when shadowed parameter resolved within a function', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    someCall(function (resolve) {  // this parameter actually shadows the one in the enclosing scope\n                        resolve();\n                    });\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "A Promise was found that appears to not have resolve or reject invoked on all code paths",
                    "name": "file.ts",
                    "ruleName": "promise-must-complete",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('when shadowed parameter rejects within a function', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    someCall(function (reject) {  // this parameter actually shadows the one in the enclosing scope\n                        reject();\n                    });\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "A Promise was found that appears to not have resolve or reject invoked on all code paths",
                    "name": "file.ts",
                    "ruleName": "promise-must-complete",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('when shadowed parameter resolved within a lambda', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    someCall((arg1, resolve) => { // this parameter actually shadows the one in the enclosing scope\n                        resolve('value');\n                    });\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "A Promise was found that appears to not have resolve or reject invoked on all code paths",
                    "name": "file.ts",
                    "ruleName": "promise-must-complete",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('when shadowed parameter rejects within a lambda', function () {
            var script = "\n                new Promise<string>((resolve, reject) => {\n                    someCall((reject) => {  // this parameter actually shadows the one in the enclosing scope\n                        reject();\n                    });\n                })";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "A Promise was found that appears to not have resolve or reject invoked on all code paths",
                    "name": "file.ts",
                    "ruleName": "promise-must-complete",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
    });
});
