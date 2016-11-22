"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noRelativeImportsRule', function () {
    var ruleName = 'no-relative-imports';
    it('should pass on absolute path require imports', function () {
        var script = "\n            import App = require('App');\n            import App = require('common/App');\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on absolute path ES6 imports', function () {
        var script = "\n            \uFEFFimport OfficeApp from 'OfficeApp';\n            \uFEFFimport OfficeApp from 'common/OfficeApp';\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on relative path require import', function () {
        var script = "\n            import App = require('./App');\n            import App = require('../common/App');\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "External module is being loaded from a relative path. Please use an absolute path: require('./App')",
                "name": "file.ts",
                "ruleName": "no-relative-imports",
                "startPosition": { "character": 26, "line": 2 }
            },
            {
                "failure": "External module is being loaded from a relative path. Please use an absolute path: require('../common/App')",
                "name": "file.ts",
                "ruleName": "no-relative-imports",
                "startPosition": { "character": 26, "line": 3 }
            }
        ]);
    });
    it('should fail on relative path ES6 import', function () {
        var script = "\n            \uFEFFimport OfficeApp from './OfficeApp';\n            \uFEFFimport OfficeApp from '../common/OfficeApp';\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Imported module is being loaded from a relative path. " +
                    "Please use an absolute path: import OfficeApp from './OfficeApp';",
                "name": "file.ts",
                "ruleName": "no-relative-imports",
                "startPosition": { "character": 14, "line": 2 }
            },
            {
                "failure": "Imported module is being loaded from a relative path. " +
                    "Please use an absolute path: import OfficeApp from '../common/OfficeApp';",
                "name": "file.ts",
                "ruleName": "no-relative-imports",
                "startPosition": { "character": 14, "line": 3 }
            }
        ]);
    });
});
