"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('mochaUnneededDoneRule', function () {
    var ruleName = 'mocha-unneeded-done';
    it('should pass on standard usage - arrow functions', function () {
        var script = "\n            describe('...', (): void => {\n                before((done: MochaDone): void => {\n                    something(done);\n                });\n                after((done: MochaDone): void => {\n                    something(done);\n                });\n                beforeEach((done: MochaDone): void => {\n                    something(done);\n                });\n                afterEach((done: MochaDone): void => {\n                    something(done);\n                });\n                it('...', (done: MochaDone): void => {\n                    something(done);\n                });\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on standard usage - functions expressions', function () {
        var script = "\n            describe('...', function(): void {\n                before(function(done: MochaDone): void {\n                    something(done);\n                });\n                after(function(done: MochaDone): void {\n                    something(done);\n                });\n                beforeEach(function(done: MochaDone): void {\n                    something(done);\n                });\n                afterEach(function(done: MochaDone): void {\n                    something(done);\n                });\n                it('...', function(done: MochaDone): void {\n                    something(done);\n                });\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on standard usage - context/specify', function () {
        var script = "\n            context('...', function(): void {\n                specify('...', function(done: MochaDone): void {\n                    something(done);\n                });\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on reassignment', function () {
        var script = "\n            describe('something...', (): void => {\n                it('...', (done): void => {\n                    var x = done;\n                    done();\n                });\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on unneeded dones in arrow functions', function () {
        var script = "\n            describe('...', (): void => {\n                before((done): void => {\n                    doSomething();\n                    done();\n                });\n                after((done: MochaDone): void => {\n                    done(); // it doesn't matter what order done() comes in.\n                    doSomething();\n                });\n                beforeEach((aliasedDone: MochaDone): void => {\n                    doSomething();\n                    aliasedDone();\n                });\n                afterEach((done: MochaDone): void => {\n                    doSomething();\n                    done();\n                });\n                it('...', (done: MochaDone): void => {\n                    doSomething();\n                    done();\n                });\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unneeded Mocha Done. Parameter can be safely removed: done",
                "name": "file.ts",
                "ruleName": "mocha-unneeded-done",
                "startPosition": { "character": 25, "line": 3 }
            },
            {
                "failure": "Unneeded Mocha Done. Parameter can be safely removed: done",
                "name": "file.ts",
                "ruleName": "mocha-unneeded-done",
                "startPosition": { "character": 24, "line": 7 }
            },
            {
                "failure": "Unneeded Mocha Done. Parameter can be safely removed: aliasedDone",
                "name": "file.ts",
                "ruleName": "mocha-unneeded-done",
                "startPosition": { "character": 29, "line": 11 }
            },
            {
                "failure": "Unneeded Mocha Done. Parameter can be safely removed: done",
                "name": "file.ts",
                "ruleName": "mocha-unneeded-done",
                "startPosition": { "character": 28, "line": 15 }
            },
            {
                "failure": "Unneeded Mocha Done. Parameter can be safely removed: done",
                "name": "file.ts",
                "ruleName": "mocha-unneeded-done",
                "startPosition": { "character": 28, "line": 19 }
            }
        ]);
    });
    it('should fail on unneeded dones - context/specify', function () {
        var script = "\n            context('...', (): void => {\n                specify('...', (done: MochaDone): void => {\n                    doSomething();\n                    done();\n                });\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unneeded Mocha Done. Parameter can be safely removed: done",
                "name": "file.ts",
                "ruleName": "mocha-unneeded-done",
                "startPosition": { "character": 33, "line": 3 }
            }
        ]);
    });
    it('should fail on unneeded done - functions expressions', function () {
        var script = "\n            describe('...', function(): void {\n                before(function(done): void {\n                    something();\n                    done()\n                });\n                after(function(myDone: MochaDone): void {\n                    myDone(); // it doesn't matter what order it comes in\n                    something();\n                });\n                beforeEach(function(done: MochaDone): void {\n                    something();\n                    done()\n                });\n                afterEach(function(done: MochaDone): void {\n                    something();\n                    done()\n                });\n                it('...', function(done: MochaDone): void {\n                    something();\n                    done()\n                });\n            });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Unneeded Mocha Done. Parameter can be safely removed: done",
                "name": "file.ts",
                "ruleName": "mocha-unneeded-done",
                "startPosition": { "character": 33, "line": 3 }
            },
            {
                "failure": "Unneeded Mocha Done. Parameter can be safely removed: myDone",
                "name": "file.ts",
                "ruleName": "mocha-unneeded-done",
                "startPosition": { "character": 32, "line": 7 }
            },
            {
                "failure": "Unneeded Mocha Done. Parameter can be safely removed: done",
                "name": "file.ts",
                "ruleName": "mocha-unneeded-done",
                "startPosition": { "character": 37, "line": 11 }
            },
            {
                "failure": "Unneeded Mocha Done. Parameter can be safely removed: done",
                "name": "file.ts",
                "ruleName": "mocha-unneeded-done",
                "startPosition": { "character": 36, "line": 15 }
            },
            {
                "failure": "Unneeded Mocha Done. Parameter can be safely removed: done",
                "name": "file.ts",
                "ruleName": "mocha-unneeded-done",
                "startPosition": { "character": 36, "line": 19 }
            }
        ]);
    });
});
