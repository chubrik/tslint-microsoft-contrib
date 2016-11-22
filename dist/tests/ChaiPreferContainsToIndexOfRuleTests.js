"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('chaiPreferContainsToIndexOfRule', function () {
    var ruleName = 'chai-prefer-contains-to-index-of';
    it('should pass on contain', function () {
        var script = "\n            expect(targetUrl).to.contain(twitterAuthUrl, '...');\n            chai.expect(targetUrl).to.contain(twitterAuthUrl, '...');\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on not contain', function () {
        var script = "\n            expect(targetUrl).to.not.contain(twitterAuthUrl,'...');\n            chai.expect(targetUrl).to.not.contain(twitterAuthUrl,'...');\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should fail on indexOf equal to -1 in call expression', function () {
        var script = "\n            expect(targetUrl.indexOf(twitterAuthUrl)).to.equal(-1,'...');\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found chai call with indexOf that can be converted to .contain assertion: ",
                "name": "file.ts",
                "ruleName": "chai-prefer-contains-to-index-of",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on indexOf equal to -1 in property expression', function () {
        var script = "\n            chai.expect(targetUrl.indexOf(twitterAuthUrl)).to.equal(-1,'...');\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found chai call with indexOf that can be converted to .contain assertion: ",
                "name": "file.ts",
                "ruleName": "chai-prefer-contains-to-index-of",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on indexOf not equal to -1 in call expression', function () {
        var script = "\n            expect(targetUrl.indexOf(twitterAuthUrl)).not.to.equal(-1,'...');\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found chai call with indexOf that can be converted to .contain assertion: ",
                "name": "file.ts",
                "ruleName": "chai-prefer-contains-to-index-of",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
    it('should fail on indexOf not equal to -1 in property expression', function () {
        var script = "\n            chai.expect(targetUrl.indexOf(twitterAuthUrl)).not.to.equal(-1,'...');\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Found chai call with indexOf that can be converted to .contain assertion: ",
                "name": "file.ts",
                "ruleName": "chai-prefer-contains-to-index-of",
                "startPosition": { "character": 13, "line": 2 }
            }
        ]);
    });
});
