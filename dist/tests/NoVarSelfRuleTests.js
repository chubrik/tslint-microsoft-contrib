"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noVarSelfRule', function () {
    var ruleName = 'no-var-self';
    it('should pass on other variables named self', function () {
        var script = "\n            var self = other;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on variables set to this', function () {
        var script = "\n            var other = this;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Assigning this reference to local variable: other = this",
                "name": "file.ts",
                "ruleName": "no-var-self",
                "startPosition": { "character": 17, "line": 2 }
            }
        ]);
    });
    it('should fail on let statements set to this', function () {
        var script = "\n            let other = this;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Assigning this reference to local variable: other = this",
                "name": "file.ts",
                "ruleName": "no-var-self",
                "startPosition": { "character": 17, "line": 2 }
            }
        ]);
    });
    it('should fail on let statements set to this', function () {
        var script = "\n            const other = this;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Assigning this reference to local variable: other = this",
                "name": "file.ts",
                "ruleName": "no-var-self",
                "startPosition": { "character": 19, "line": 2 }
            }
        ]);
    });
    it('should fail on var self = this starting a chain', function () {
        var script = "\n            var self = this,\n                foo = bar;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Assigning this reference to local variable: self = this",
                "name": "file.ts",
                "ruleName": "no-var-self",
                "startPosition": { "character": 17, "line": 2 }
            }
        ]);
    });
    it('should fail on var self = this in a chain', function () {
        var script = "\n            var foo = bar,\n                self = this,\n                baz = qux;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Assigning this reference to local variable: self = this",
                "name": "file.ts",
                "ruleName": "no-var-self",
                "startPosition": { "character": 17, "line": 3 }
            }
        ]);
    });
    it('should fail on var that = this ending a chain', function () {
        var script = "\n            var foo = bar,\n                that = this;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Assigning this reference to local variable: that = this",
                "name": "file.ts",
                "ruleName": "no-var-self",
                "startPosition": { "character": 17, "line": 3 }
            }
        ]);
    });
    it('should respect any parameters passed', function () {
        var script = "\n            let xself = this;  // this one is OK\n            let selfx = this;  // this one is OK\n            let xselfx = this; // this one is OK\n            let self = this; // this one is not OK\n        ";
        // self is specifically banned
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, ['^self$'], script, [
            {
                "failure": "Assigning this reference to local variable: self = this",
                "name": "file.ts",
                "ruleName": "no-var-self",
                "startPosition": { "character": 17, "line": 5 }
            }
        ]);
    });
    it('should respect any parameters passed with regex negation', function () {
        var script = "\n            let xself = this;  // this one is OK\n            let selfx = this;  // this one is OK\n            let self = this; // this one is not OK\n        ";
        // anything *but* self is specifically banned
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, ['^(?!self$)'], script, [
            {
                "failure": "Assigning this reference to local variable: xself = this",
                "name": "file.ts",
                "ruleName": "no-var-self",
                "startPosition": { "character": 17, "line": 2 }
            },
            {
                "failure": "Assigning this reference to local variable: selfx = this",
                "name": "file.ts",
                "ruleName": "no-var-self",
                "startPosition": { "character": 17, "line": 3 }
            }
        ]);
    });
});
