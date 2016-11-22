"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noUnusedImportsRule', function () {
    var ruleName = 'no-unused-imports';
    it('should pass on require import', function () {
        var inputFile = "\n            import chai = require('chai')\n\n            class NoUnusedImportsTestInput {\n                constructor() {\n                    console.log(chai);\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, []);
    });
    it('should pass on ES6 star import', function () {
        var inputFile = "\n            import * as chai2 from 'chai'\n\n            class NoUnusedImportsTestInput {\n                constructor() {\n                    console.log(chai2);\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, []);
    });
    it('should pass on ES6 import', function () {
        var inputFile = "\n            import chai3 from 'chai'\n\n            class NoUnusedImportsTestInput {\n                constructor() {\n                    console.log(chai3);\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, []);
    });
    it('should pass on ES6 braced import', function () {
        var inputFile = "\n            import { chai4 } from 'chai'\n\n            class NoUnusedImportsTestInput {\n                constructor() {\n                    console.log(chai4);\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, []);
    });
    it('should pass on ES6 braced multi-import', function () {
        var inputFile = "\n            import { chai5, chai6 } from 'chai'\n\n            class NoUnusedImportsTestInput {\n                constructor() {\n                    console.log(chai5);\n                    console.log(chai6);\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, []);
    });
    it('should fail on unused require import', function () {
        var inputFile = "\n            import NoUnusedImportsRule = require('../src/noUnusedImportsRule');\n\n            class NoUnusedImportsTestInput {\n                constructor() {\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, [
            {
                "failure": "unused import: 'NoUnusedImportsRule'",
                "name": "file.ts",
                "ruleName": "no-unused-imports",
                "startPosition": { "line": 2, "character": 20 }
            }
        ]);
    });
    it('should be able to handle React imports in tsx files', function () {
        var inputFile = "import React = require('react');\nimport BaseComponent = require('common/component/BaseComponent');\nimport I18nFacade = require('common/i18n/I18nFacade');\n\nexport class AuthorSummary extends BaseComponent.BaseComponent<Props, BaseComponent.State> {\n\n    public render() {\n        return <div\n            className='AuthorSummary'\n            dir={I18nFacade.getLanguageDirectionality()}>\n            'some text'\n        </div>;\n    }\n}\n";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, []);
    });
    it('should be able to handle React ES6 imports in tsx files', function () {
        var inputFile = "import React from 'React';\nimport BaseComponent from 'common/component/BaseComponent';\n\nexport class AuthorSummary extends BaseComponent.BaseComponent<Props, BaseComponent.State> {\n\n    public render() {\n        return <div\n            className='AuthorSummary'>\n            'some text'\n        </div>;\n    }\n}\n";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, []);
    });
    it('should be able to handle import static references in tsx files', function () {
        var inputFile = "import React = require('react');\nimport BaseComponent = require('common/component/BaseComponent');\nimport I18nFacade = require('common/i18n/I18nFacade');\n\nexport class AuthorSummary extends BaseComponent.BaseComponent<Props, BaseComponent.State> {\n\n    public render() {\n        return <div\n            className='AuthorSummary'\n            dir={I18nFacade.getLanguageDirectionality()}>\n            'some text'\n        </div>;\n    }\n}\n";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, []);
    });
    it('should flag an unused relative import', function () {
        var inputScript = "\nimport DM = require(\"DM\");\nimport AB = DM.Dependency;\nconsole.log(DM);"; // AB import is not used!
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, [
            {
                "failure": "unused import: 'AB'",
                "name": "file.ts",
                "ruleName": "no-unused-imports",
                "startPosition": { "line": 3, "character": 8 }
            }
        ]);
    });
    it('should flag an unused relative ES6 import', function () {
        var inputScript = "\nimport DM from \"DM\";\nimport AB as DM.Dependency;\nconsole.log(DM);"; // AB import is not used!
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, [
            {
                "failure": "unused import: 'AB'",
                "name": "file.ts",
                "ruleName": "no-unused-imports",
                "startPosition": { "line": 3, "character": 8 }
            }
        ]);
    });
    it('should not flag imports that are used as other imports', function () {
        var inputScript = "\nimport DM = require(\"DM\");\nimport AB = DM.Dependency;\nconsole.log(AB);";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
    });
    it('should not flag imports that are used as other ES6 imports', function () {
        var inputScript = "\nimport DM as \"DM\";\nimport AB as DM.Dependency;\nconsole.log(AB);";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
    });
    it('should pass on dot-import (from MSE)', function () {
        var inputScript = "\n            import React = require('react');\n            import Simulate = React.addons.TestUtils.Simulate;\n            Simulate.doit();\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
    });
    it('should fail on ES6 star import', function () {
        var inputFile = "\n            import * as chai2 from 'chai'\n\n            class NoUnusedImportsTestInput {\n                constructor() {\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, [
            {
                "failure": "unused import: 'chai2'",
                "name": "file.ts",
                "ruleName": "no-unused-imports",
                "startPosition": { "line": 2, "character": 25 }
            }
        ]);
    });
    it('should fail on ES6 import', function () {
        var inputFile = "\n            import chai3 from 'chai'\n\n            class NoUnusedImportsTestInput {\n                constructor() {\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, [
            {
                "failure": "unused import: 'chai3'",
                "name": "file.ts",
                "ruleName": "no-unused-imports",
                "startPosition": { "line": 2, "character": 20 }
            }
        ]);
    });
    it('should fail on ES6 braced import', function () {
        var inputFile = "\n            import { chai4 } from 'chai'\n\n            class NoUnusedImportsTestInput {\n                constructor() {\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, [
            {
                "failure": "unused import: 'chai4'",
                "name": "file.ts",
                "ruleName": "no-unused-imports",
                "startPosition": { "line": 2, "character": 22 }
            }
        ]);
    });
    it('should fail on ES6 braced multi-import', function () {
        var inputFile = "\n            import { chai5, chai6 } from 'chai'\n\n            class NoUnusedImportsTestInput {\n                constructor() {\n                    console.log(chai5);\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, [
            {
                "failure": "unused import: 'chai6'",
                "name": "file.ts",
                "ruleName": "no-unused-imports",
                "startPosition": { "line": 2, "character": 29 }
            }
        ]);
    });
    it('should fail on unused require import', function () {
        var inputFile = "\n            import NoUnusedImportsRule = require('../src/noUnusedImportsRule');\n\n            class NoUnusedImportsTestInput {\n                constructor() {\n                }\n            }\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, [
            {
                "failure": "unused import: 'NoUnusedImportsRule'",
                "name": "file.ts",
                "ruleName": "no-unused-imports",
                "startPosition": { "line": 2, "character": 20 }
            }
        ]);
    });
    it('should fail on missing reference in tsx files', function () {
        var inputFile = "import React = require('react');\nimport BaseComponent = require('common/component/BaseComponent');\nimport I18nFacade = require('common/i18n/I18nFacade');\n\nexport class AuthorSummary extends BaseComponent.BaseComponent<Props, BaseComponent.State> {\n\n    public render() {\n        return <div\n            className='AuthorSummary'>\n            'some text'\n        </div>;\n    }\n}\n";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputFile, [
            {
                "failure": "unused import: 'I18nFacade'",
                "name": "file.tsx",
                "ruleName": "no-unused-imports",
                "startPosition": { "character": 8, "line": 3 }
            }
        ]);
    });
});
