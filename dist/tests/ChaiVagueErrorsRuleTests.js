"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('chaiVagueErrorsRule', function () {
    var ruleName = 'chai-vague-errors';
    it('should pass on xxx', function () {
        var script = "\n            expect(something).to.equal(true, 'message');;\n            expect(something).to.be.equal(false, 'message');;\n            expect(something).to.not.equal(null, 'message');;\n            expect(something).to.not.be.equal(undefined, 'message');;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on ok', function () {
        var script = "\n            expect(something).to.ok;\n            chai.expect(something).to.ok;\n            expect(something).to.be.ok;\n            chai.expect(something).to.not.be.ok;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 3 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 4 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 5 }
            }
        ]);
    });
    it('should fail on true', function () {
        var script = "\n            expect(something).to.true;\n            chai.expect(something).to.be.true;\n            expect(something).to.not.be.true;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 3 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 4 }
            }
        ]);
    });
    it('should fail on false', function () {
        var script = "\n            expect(something).to.false;\n            expect(something).to.be.false;\n            expect(something).to.not.be.false;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 3 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 4 }
            }
        ]);
    });
    it('should fail on null', function () {
        var script = "\n            expect(something).to.null;\n            expect(something).to.be.null;\n            expect(something).to.not.be.null;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 3 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 4 }
            }
        ]);
    });
    it('should fail on undefined', function () {
        var script = "\n            expect(something).to.undefined;\n            expect(something).to.be.undefined;\n            expect(something).to.not.be.undefined;\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 3 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 4 }
            }
        ]);
    });
    it('should fail on equal', function () {
        var script = "\n            expect(something).to.equal(true);\n            expect(something).to.equals(true);\n            expect(something).to.be.equal(true);\n            expect(something).to.be.equals(true);\n            expect(something).to.not.be.equal(false);\n            expect(something).to.deep.equal(null);\n            expect(something).to.not.equal(undefined);\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 3 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 4 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 5 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 6 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 7 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 8 }
            }
        ]);
    });
    it('should fail on eql', function () {
        var script = "\n            expect(something).to.eql(true);\n            expect(something).to.be.eql(true);\n            chai.expect(something).to.not.be.eql(false);\n            expect(something).to.deep.eql(null);\n            chai.expect(something).to.not.eql(undefined);\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 3 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 4 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 5 }
            },
            {
                "failure": "Found chai call with vague failure message. Please add an explicit failure message",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 6 }
            }
        ]);
    });
    it('should fail on strictly equality in expectation', function () {
        var script = "\n            expect(something === undefined).to.equal(true, 'something should not have been set');\n            chai.expect(something === undefined).to.equal(true, 'something should not have been set');\n            expect(something !== undefined).to.equal(false, 'something should not have been set');\n            chai.expect(something !== undefined).to.equal(false, 'something should not have been set');\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found chai call with vague failure message. " +
                    "Move the strict equality comparison from the expect call into the assertion value",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found chai call with vague failure message. " +
                    "Move the strict equality comparison from the expect call into the assertion value",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 3 }
            },
            {
                "failure": "Found chai call with vague failure message. " +
                    "Move the strict inequality comparison from the expect call into the assertion value. ",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 4 }
            },
            {
                "failure": "Found chai call with vague failure message. " +
                    "Move the strict inequality comparison from the expect call into the assertion value. ",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 5 }
            }
        ]);
    });
    it('should fail on strictly in-equality in expectation', function () {
        var script = "\n            expect(something !== undefined).to.equal(true, 'something should not have been set');\n            expect(something === undefined).to.equal(false, 'something should not have been set');\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found chai call with vague failure message. " +
                    "Move the strict inequality comparison from the expect call into the assertion value. ",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Found chai call with vague failure message. " +
                    "Move the strict equality comparison from the expect call into the assertion value",
                "name": "file.ts",
                "ruleName": "chai-vague-errors",
                "startPosition": { "character": 13, "line": 3 }
            }
        ]);
    });
});
