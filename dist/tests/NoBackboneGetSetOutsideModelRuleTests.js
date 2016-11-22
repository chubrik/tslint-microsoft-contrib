"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noBackboneGetSetOutsideModelRule', function () {
    var ruleName = 'no-backbone-get-set-outside-model';
    it('should pass on get and set calls on the this reference', function () {
        var script = "\n            var datetime = this.get('timestamp');\n            this.set('modificationdate', datetime);\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on get and set calls with wrong # parameters and wrong parameter types', function () {
        var script = "\n            model.get();\n            model.get(someIdentifier);\n            model.get('timestamp', 'someOtherValue');\n\n            model.set();\n            model.set('modificationdate');\n            model.set('modificationdate', value1, value2);\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on get and set on an object different than this', function () {
        var script = "\n            var datetime = model.get('timestamp');\n            model.set('modificationdate', datetime);\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Backbone get() called outside of owning model: model.get('timestamp')",
                "name": "file.ts",
                "ruleName": "no-backbone-get-set-outside-model",
                "startPosition": { "character": 28, "line": 2 }
            },
            {
                "failure": "Backbone set() called outside of owning model: model.set('modificationdate', datetime)",
                "name": "file.ts",
                "ruleName": "no-backbone-get-set-outside-model",
                "startPosition": { "character": 13, "line": 3 }
            }
        ]);
    });
});
