"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('noMissingVisibilityModifiers', function () {
    var ruleName = 'no-missing-visibility-modifiers';
    it('should allow field modifiers', function () {
        var inputScript = "\nclass {\n    private myField1;\n    protected myField2;\n    public myField3;\n    private static myField4;\n    protected static myField5;\n    public static myField6;\n}";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
    });
    it('should allow method modifiers', function () {
        var inputScript = "\nclass {\n    private myMethod1() {};\n    protected myMethod2() {};\n    public myMethod3() {};\n    private static myMethod4() {};\n    protected static myMethod5() {};\n    public static myMethod6() {};\n}";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, []);
    });
    it('should not allow missing field modifiers', function () {
        var inputScript = "\nclass {\n    myField1;\n    static myField2;\n}";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, [
            {
                "failure": "Field missing visibility modifier: myField1;",
                "name": "file.ts",
                "ruleName": "no-missing-visibility-modifiers",
                "startPosition": { "character": 5, "line": 3 }
            },
            {
                "failure": "Field missing visibility modifier: static myField2;",
                "name": "file.ts",
                "ruleName": "no-missing-visibility-modifiers",
                "startPosition": { "character": 5, "line": 4 }
            }
        ]);
    });
    it('should not allow missing method modifiers', function () {
        var inputScript = "\nclass {\n    myMethod1() {\n    };\n    static myMethod2() {};\n}";
        TestHelper_1.TestHelper.assertViolations(ruleName, inputScript, [
            {
                "failure": "Method missing visibility modifier: myMethod1() {",
                "name": "file.ts",
                "ruleName": "no-missing-visibility-modifiers",
                "startPosition": { "character": 5, "line": 3 }
            },
            {
                "failure": "Method missing visibility modifier: static myMethod2() {}",
                "name": "file.ts",
                "ruleName": "no-missing-visibility-modifiers",
                "startPosition": { "character": 5, "line": 5 }
            }
        ]);
    });
});
