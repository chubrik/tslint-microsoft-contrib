"use strict";
var TestHelper_1 = require("./TestHelper");
var reactNoDangerousHtmlRule_1 = require("../reactNoDangerousHtmlRule");
var dangerousScript = "\nclass MyComponent {\n    public render() : ReactTypes.ReactElement<any> {\n        return React.createElement(\"div\", {\n                dangerouslySetInnerHTML: {__html: this.props.text}\n            }\n        );\n    }\n}";
/**
 * Unit tests.
 */
describe('reactNoDangerousHtmlRule', function () {
    var ruleName = 'react-no-dangerous-html';
    var exceptions = [];
    var original;
    beforeEach(function () {
        original = reactNoDangerousHtmlRule_1.Rule.getExceptions;
        reactNoDangerousHtmlRule_1.Rule.getExceptions = function () { return exceptions; };
    });
    afterEach(function () {
        reactNoDangerousHtmlRule_1.Rule.getExceptions = original;
    });
    it('should produce violation when function called with no suppression', function () {
        exceptions.length = 0;
        TestHelper_1.TestHelper.assertViolations(ruleName, dangerousScript, [
            {
                "failure": "Invalid call to dangerouslySetInnerHTML in method \"render\"\n" +
                    "    of source file file.ts\"\n    Do *NOT* add a suppression for this warning. " +
                    "If you absolutely must use this API then you need\n    to review the usage with a " +
                    "security expert/QE representative. If they decide that this is an\n    acceptable usage " +
                    "then add the exception to xss_exceptions.json",
                "name": "file.ts",
                "ruleName": ruleName,
                "startPosition": { "character": 17, "line": 5 }
            }
        ]);
    });
    it('should not produce violation when call exists in exception list', function () {
        exceptions.push({ file: 'file.ts', method: 'render', comment: 'this usage is OK' });
        TestHelper_1.TestHelper.assertViolations(ruleName, dangerousScript, []);
    });
    it('should find violations in .tsx files', function () {
        TestHelper_1.TestHelper.assertViolations(ruleName, "import React = require('react');\nlet text = '<div>some value</div>div>';\n\n// example of element with start and end tag\n<div foo='bar' src={'asdf'} dangerouslySetInnerHTML={{__html: text}} >\n</div>;\n\nfunction someFunction() {\n    // example of self-closing element\n    return <div dangerouslySetInnerHTML={{__html: text}} />;\n}\n", [
            {
                "failure": "Invalid call to dangerouslySetInnerHTML in method \"<unknown>\"\n    of source file " +
                    "file.tsx\"\n    Do *NOT* add a suppression for this warning. " +
                    "If you absolutely must use this API then you need\n    to review the usage with a security expert/QE " +
                    "representative. If they decide that this is an\n    acceptable usage then add the exception " +
                    "to xss_exceptions.json",
                "name": "file.tsx",
                "ruleName": "react-no-dangerous-html",
                "startPosition": { "character": 1, "line": 5 }
            },
            {
                "failure": "Invalid call to dangerouslySetInnerHTML in method \"<unknown>\"\n    of source file " +
                    "file.tsx\"\n    Do *NOT* add a suppression for this warning. " +
                    "If you absolutely must use this API then you need\n    to review the usage with a security expert/QE " +
                    "representative. If they decide that this is an\n    acceptable usage then add the exception " +
                    "to xss_exceptions.json",
                "name": "file.tsx",
                "ruleName": "react-no-dangerous-html",
                "startPosition": { "character": 12, "line": 10 }
            }
        ]);
    });
});
