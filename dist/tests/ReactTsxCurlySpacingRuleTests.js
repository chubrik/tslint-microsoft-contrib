"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('reactTsxCurlySpacing', function () {
    var ruleName = 'react-tsx-curly-spacing';
    describe('should pass', function () {
        describe('on single line expressions', function () {
            it('when always set', function () {
                var script = "\n                    import React = require('react');\n                    const a = <Hello name={ firstname } />;\n                ";
                TestHelper_1.TestHelper.assertNoViolation(ruleName, script);
            });
            it('when never set', function () {
                var script = "\n                    import React = require('react');\n                    const a = <Hello name={firstname} />;\n                ";
                TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, ['never'], script, []);
            });
        });
        describe('on multi-line expressions', function () {
            it('when always set', function () {
                var script = "\n                    import React = require('react');\n                    <Hello name={\n                      firstname\n                    } />\n                ";
                TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, ['always', { allowMultiline: true }], script, []);
            });
            it('when never set', function () {
                var script = "\n                    import React = require('react');\n                    <Hello name={\n                      firstname\n                    } />\n                ";
                TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, ['never', { allowMultiline: true }], script, []);
            });
        });
    });
    describe('should fail', function () {
        describe('on single line expressions', function () {
            it('when always set', function () {
                var script = "\n                    import React = require('react');\n\n                    const a = <Hello name={firstname} />;\n                    const b = <Hello name={ firstname} />;\n                    const c = <Hello name={firstname } />;\n                ";
                TestHelper_1.TestHelper.assertViolations(ruleName, script, [
                    {
                        "failure": "A space is required after '{'",
                        "name": "file.tsx",
                        "ruleName": "react-tsx-curly-spacing",
                        "startPosition": { "character": 43, "line": 4 }
                    },
                    {
                        "failure": "A space is required before '}'",
                        "name": "file.tsx",
                        "ruleName": "react-tsx-curly-spacing",
                        "startPosition": { "character": 43, "line": 4 }
                    },
                    {
                        "failure": "A space is required before '}'",
                        "name": "file.tsx",
                        "ruleName": "react-tsx-curly-spacing",
                        "startPosition": { "character": 43, "line": 5 }
                    },
                    {
                        "failure": "A space is required after '{'",
                        "name": "file.tsx",
                        "ruleName": "react-tsx-curly-spacing",
                        "startPosition": { "character": 43, "line": 6 }
                    }
                ]);
            });
            it('when never set', function () {
                var script = "\n                    import React = require('react');\n                    const a = <Hello name={ firstname} />;\n                    const b = <Hello name={firstname } />;\n                    const c = <Hello name={ firstname} />;\n                ";
                TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, ['never'], script, [
                    {
                        "failure": "There should be no space after '{'",
                        "name": "file.tsx",
                        "ruleName": "react-tsx-curly-spacing",
                        "startPosition": { "character": 43, "line": 3 }
                    },
                    {
                        "failure": "There should be no space before '}'",
                        "name": "file.tsx",
                        "ruleName": "react-tsx-curly-spacing",
                        "startPosition": { "character": 43, "line": 4 }
                    },
                    {
                        "failure": "There should be no space after '{'",
                        "name": "file.tsx",
                        "ruleName": "react-tsx-curly-spacing",
                        "startPosition": { "character": 43, "line": 5 }
                    }
                ]);
            });
        });
        describe('on multi-line expressions', function () {
            it('when always set', function () {
                var script = "\n                    import React = require('react');\n                    <Hello name={\n                      firstname\n                    } />\n                ";
                TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, ['always', { allowMultiline: false }], script, [
                    {
                        "failure": "There should be no newline after '{'",
                        "name": "file.tsx",
                        "ruleName": "react-tsx-curly-spacing",
                        "startPosition": { "character": 33, "line": 3 }
                    },
                    {
                        "failure": "There should be no newline before '}'",
                        "name": "file.tsx",
                        "ruleName": "react-tsx-curly-spacing",
                        "startPosition": { "character": 33, "line": 3 }
                    }
                ]);
            });
            it('when never set', function () {
                var script = "\n                    import React = require('react');\n                    <Hello name={\n                      firstname\n                    } />\n                ";
                TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, ['never'], script, [
                    {
                        "failure": "There should be no newline after '{'",
                        "name": "file.tsx",
                        "ruleName": "react-tsx-curly-spacing",
                        "startPosition": { "character": 33, "line": 3 }
                    },
                    {
                        "failure": "There should be no newline before '}'",
                        "name": "file.tsx",
                        "ruleName": "react-tsx-curly-spacing",
                        "startPosition": { "character": 33, "line": 3 }
                    }
                ]);
            });
        });
    });
});
