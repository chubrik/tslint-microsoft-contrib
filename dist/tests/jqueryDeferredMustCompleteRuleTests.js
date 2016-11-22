"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('jquery-deferred-must-complete', function () {
    var ruleName = 'jquery-deferred-must-complete';
    describe('should pass', function () {
        it('when deferred named jquery completes', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                if (something) {\n                    deferred.resolve();\n                } else {\n                    if (somethingElse) {\n                        deferred.resolve();\n                    } else {\n                        deferred.reject();\n                    }\n                }\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when deferred named jquery completes - let declaration', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                let deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                if (something) {\n                    deferred.resolve();\n                } else {\n                    if (somethingElse) {\n                        deferred.resolve();\n                    } else {\n                        deferred.reject();\n                    }\n                }\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when deferred named $ completes', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = $.Deferred<void>();\n                if (something) {\n                    deferred.resolve();\n                } else {\n                    if (somethingElse) {\n                        deferred.resolve();\n                    } else {\n                        deferred.reject();\n                    }\n                }\n                return deferred.promise();\n            }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('on resolve', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = $.Deferred<void>();\n                deferred.resolve();\n                return deferred.promise();\n            }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('on reject', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = $.Deferred<void>();\n                deferred.reject();\n                return deferred.promise();\n            }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when single branch is completed - with if-statement', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                if (something) {\n                    deferred.resolve();\n                }\n                return deferred.promise();\n            }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when single branch is completed - with if-else-statement', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                if (something) {\n                    deferred.resolve();\n                } else {\n                    deferred.resolve();\n                }\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when single branch is completed - with if-else-statement', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                if (something) {\n                    if (somethingElse) {\n                        deferred.resolve();\n                    } else {\n                        deferred.reject();\n                    }\n                } else {\n                    if (somethingElse) {\n                        deferred.resolve();\n                    } else {\n                        deferred.reject();\n                    }\n                }\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('with nested if-else statement', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                if (something) {\n                    if (somethingElse) {\n                        deferred.resolve();\n                    } else {\n                        deferred.reject();\n                    }\n                } else {\n                    if (somethingElse) {\n                        deferred.somethingElse();\n                    } else {\n                        deferred.reject();\n                    }\n                    deferred.reject(); // branches are not even analyzed when main thread resolves\n                }\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when resolved within a function', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                someCall(function () {\n                    deferred.resolve();\n                });\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when resolved within a lambda', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                someCall(() => {\n                    deferred.resolve();\n                });\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when resolved within a function', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                someCall(function (someParm) {\n                    deferred.resolve();\n                });\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when resolved within a lambda', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                someCall((someParm) => { // this parameter actually shadows the one in the enclosing scope\n                    deferred.resolve();\n                });\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when resolved within a for loop', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                for(var x = 0; x < something.length; x++) {\n                    deferred.resolve();\n                }\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when resolved within a for in loop', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                for(var x in something) {\n                    deferred.resolve();\n                }\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when resolved within a while loop', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                while (something) {\n                    deferred.resolve();\n                }\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('when deferred reference escaped into a function call', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                doSomething(deferred); // reference escapes and we assume it resolves\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
    });
    describe('should fail', function () {
        it('when has no complete', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = $.Deferred<void>();\n                return deferred.promise();\n            }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "A JQuery deferred was found that appears to not have resolve or reject invoked on all code paths: " +
                        "'deferred: JQueryDeferred<void> = $.Deferred<void>()'",
                    "name": "file.ts",
                    "ruleName": "jquery-deferred-must-complete",
                    "startPosition": { "character": 21, "line": 3 }
                }
            ]);
        });
        it('when has no complete - var declared on two lines', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void>;\n                deferred = $.Deferred<void>();\n                return deferred.promise();\n            }\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "A JQuery deferred was found that appears to not have resolve or reject invoked on all code paths: " +
                        "'deferred = $.Deferred<void>()'",
                    "name": "file.ts",
                    "ruleName": "jquery-deferred-must-complete",
                    "startPosition": { "character": 17, "line": 4 }
                }
            ]);
        });
        it('when single branch is missing complete - with if-statement', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                if (something) {\n                    deferred.someOtherFunction();\n                }\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "A JQuery deferred was found that appears to not have resolve or reject invoked on all code paths: " +
                        "'deferred: JQueryDeferred<void> = jquery.Deferred<void>()'",
                    "name": "file.ts",
                    "ruleName": "jquery-deferred-must-complete",
                    "startPosition": { "character": 21, "line": 3 }
                }
            ]);
        });
        it('when single branch is missing complete - with if-else-statement', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                if (something) {\n                    deferred.resolve();\n                } else {\n                    deferred.someOtherFunction()\n                }\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "A JQuery deferred was found that appears to not have resolve or reject invoked on all code paths: " +
                        "'deferred: JQueryDeferred<void> = jquery.Deferred<void>()'",
                    "name": "file.ts",
                    "ruleName": "jquery-deferred-must-complete",
                    "startPosition": { "character": 21, "line": 3 }
                }
            ]);
        });
        it('with nested if-else statement', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                let deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                if (something) {\n                    if (somethingElse) {\n                        deferred.resolve();\n                    } else {\n                        deferred.reject();\n                    }\n                } else {\n                    if (somethingElse) {\n                        deferred.somethingElse();\n                    } else {\n                        deferred.reject();\n                    }\n                }\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "A JQuery deferred was found that appears to not have resolve or reject invoked on all code paths: " +
                        "'deferred: JQueryDeferred<void> = jquery.Deferred<void>()'",
                    "name": "file.ts",
                    "ruleName": "jquery-deferred-must-complete",
                    "startPosition": { "character": 21, "line": 3 }
                }
            ]);
        });
        it('when shadowed parameter resolved within a function', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                someCall(function (deferred) {  // this parameter actually shadows the one in the enclosing scope\n                    deferred.resolve();\n                });\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "A JQuery deferred was found that appears to not have resolve or reject invoked on all code paths: " +
                        "'deferred: JQueryDeferred<void> = jquery.Deferred<void>()'",
                    "name": "file.ts",
                    "ruleName": "jquery-deferred-must-complete",
                    "startPosition": { "character": 21, "line": 3 }
                }
            ]);
        });
        it('when shadowed parameter resolved within a lambda', function () {
            var script = "\n            function myMethod() : JQueryPromise<void> {\n                var deferred: JQueryDeferred<void> = jquery.Deferred<void>();\n                someCall((arg1, deferred) => { // this parameter actually shadows the one in the enclosing scope\n                    deferred.resolve();\n                });\n                return deferred.promise();\n            }";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "A JQuery deferred was found that appears to not have resolve or reject invoked on all code paths: " +
                        "'deferred: JQueryDeferred<void> = jquery.Deferred<void>()'",
                    "name": "file.ts",
                    "ruleName": "jquery-deferred-must-complete",
                    "startPosition": { "character": 21, "line": 3 }
                }
            ]);
        });
    });
});
