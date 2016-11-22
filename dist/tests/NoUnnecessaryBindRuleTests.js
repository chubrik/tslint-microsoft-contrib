"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noUnnecessaryBindRule', function () {
    var ruleName = 'no-unnecessary-bind';
    describe('should pass', function () {
        it('should pass on function/lambda literals with multiple parameters', function () {
            var script = "\n            _.bind(function() {}, this, someArg);\n            (function() {}).bind(this, someArg);\n            (() => {}).bind(this, someArg);\n            (someReference).bind(this, someArg);\n        ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('should pass on function/lambda literals with non-this parameter', function () {
            var script = "\n            (function() {}).bind(context);\n            (() => {}).bind(context);\n            (someReference).bind(context);\n        ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('should pass on underscore static invocation with no context', function () {
            var script = "\n            _.forEach(list, function() {});\n            _.forEach(list, () => {});\n            _.forEach(list, someReference);\n        ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('should pass on underscore invocation with no context', function () {
            var script = "\n            _(list).collect(function() {});\n            _(list).collect(() => {});\n            _(list).collect(someReference);\n        ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('should pass on underscore static invocation with context', function () {
            var script = "\n            _.bind(function() {}, context);\n            _.map(list, function() {}, context);\n            _.map(list, () => {}, context);\n            _.map(list, someReference, context);\n        ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('should pass on underscore invocation with context', function () {
            var script = "\n            _(list).map(function() {}, context);\n            _(list).map(() => {}, context);\n            _(list).map(someReference, context);\n        ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('should pass on "this" context with non-literal function', function () {
            var script = "\n            (someReference).bind(this);\n            _(list).reject(someReference, this);\n            _.reject(list, someReference, this);\n        ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('should pass on _.sortedIndex', function () {
            // sortedIndex is unique because the function parameter is the 2nd in the list
            var script = "\n            _(list).sortedIndex(value, someReference, this);\n            _.sortedIndex(list, value, someReference, this);\n\n            _(list).sortedIndex(() => {}, someReference, this);\n            _.sortedIndex(function () {}, value, someReference, this);\n        ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('should pass on underscore static invocation with unknown method', function () {
            var script = "\n            _.not_an_underscore_function(list, function() {}, this);\n            _.not_an_underscore_function(list, () => {}, this);\n        ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
        it('should pass on underscore invocation with unknown method', function () {
            var script = "\n            _(list).not_an_underscore_function(function() {}, context);\n            _(list).not_an_underscore_function(() => {}, context);\n        ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
        });
    });
    describe('should fail', function () {
        it('should fail on binding this on function literal', function () {
            var script = "\n            (function() {}).bind(this);\n        ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Binding function literal with 'this' context. Use lambdas instead",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-bind",
                    "startPosition": { "character": 13, "line": 2 }
                }
            ]);
        });
        it('should fail on binding this on lambda', function () {
            var script = "\n            (() => {}).bind(this);\n        ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Binding lambda with 'this' context. Lambdas already have 'this' bound",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-bind",
                    "startPosition": { "character": 13, "line": 2 }
                }
            ]);
        });
        it('should fail on underscore static invocation with this as context and function', function () {
            var script = "\n                _.map(list, function() {}, this);\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Binding function literal with 'this' context. Use lambdas instead",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-bind",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('should fail on underscore static invocation with this as context and lambda', function () {
            var script = "\n                _.map(list, () => {}, this);\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Binding lambda with 'this' context. Lambdas already have 'this' bound",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-bind",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('should fail on underscore instance invocation with this as context and function', function () {
            var script = "\n                _(list).forEach(function() {}, this);\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Binding function literal with 'this' context. Use lambdas instead",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-bind",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('should fail on underscore instance invocation with this as context and lambda', function () {
            var script = "\n                _(list).every(() => {}, this);\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Binding lambda with 'this' context. Lambdas already have 'this' bound",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-bind",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('fail on _.reduce - static invocation - function parameter', function () {
            // reduce is a special case because the 2nd parameter in the list is a value
            var script = "\n                _.reduce(list, function () {}, memo, this);\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [{
                    "failure": "Binding function literal with 'this' context. Use lambdas instead",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-bind",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('fail on _.reduce - static invocation - lambda parameter', function () {
            // reduce is a special case because the 2nd parameter in the list is a value
            var script = "\n                _.reduce(list, () => {}, memo, this);\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Binding lambda with 'this' context. Lambdas already have 'this' bound",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-bind",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('fail on _.reduce - instance invocation - function parameter', function () {
            // reduce is a special case because the 2nd parameter in the list is a value
            var script = "\n                _(list).reduce(function () {}, memo, this);\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Binding function literal with 'this' context. Use lambdas instead",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-bind",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('fail on _.reduce - instance invocation - lambda parameter', function () {
            // reduce is a special case because the 2nd parameter in the list is a value
            var script = "\n                _(list).reduce(() => {}, memo, this);\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Binding lambda with 'this' context. Lambdas already have 'this' bound",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-bind",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('fail on _.sortedIndex - static invocation - function literal', function () {
            // sortedIndex is special case because the 2nd parameter in the list is a value
            var script = "\n                _.sortedIndex(list, value, function () {}, this);\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Binding function literal with 'this' context. Use lambdas instead",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-bind",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('fail on _.sortedIndex - static invocation - lambda', function () {
            // sortedIndex is special case because the 2nd parameter in the list is a value
            var script = "\n                _.sortedIndex(list, value, () => {}, this);\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Binding lambda with 'this' context. Lambdas already have 'this' bound",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-bind",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('fail on _.sortedIndex - instance invocation - function literal', function () {
            // sortedIndex is special case because the 2nd parameter in the list is a value
            var script = "\n                _(list).sortedIndex(value, function () {}, this);\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Binding function literal with 'this' context. Use lambdas instead",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-bind",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('fail on _.sortedIndex - instance invocation - lambda', function () {
            // sortedIndex is special case because the 2nd parameter in the list is a value
            var script = "\n                _(list).sortedIndex(value, () => {}, this);\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Binding lambda with 'this' context. Lambdas already have 'this' bound",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-bind",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('fail on _.bind - function literal', function () {
            var script = "\n                _.bind(function () {}, this);\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Binding function literal with 'this' context. Use lambdas instead",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-bind",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
        it('fail on _.bind - lambda', function () {
            var script = "\n                _.bind(() => {}, this);\n            ";
            TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                {
                    "failure": "Binding lambda with 'this' context. Lambdas already have 'this' bound",
                    "name": "file.ts",
                    "ruleName": "no-unnecessary-bind",
                    "startPosition": { "character": 17, "line": 2 }
                }
            ]);
        });
    });
});
