"use strict";
var Utils_1 = require("../utils/Utils");
var chai = require("chai");
/**
 * Unit tests.
 */
describe('Utils', function () {
    describe('contains', function () {
        it('should handle empty states', function () {
            chai.expect(Utils_1.Utils.contains([], null)).to.equal(false, 'empty array should not contain false');
            chai.expect(Utils_1.Utils.contains([], undefined)).to.equal(false, 'empty array should not contain undefined');
            chai.expect(Utils_1.Utils.contains(null, null)).to.equal(false, 'null should not contain false');
            chai.expect(Utils_1.Utils.contains(undefined, undefined)).to.equal(false, 'undefined should not contain undefined');
        });
        it('should handle numbers', function () {
            chai.expect(Utils_1.Utils.contains([1, 2, 3], 1)).to.equal(true, 'array containing 1 should contain 1');
            chai.expect(Utils_1.Utils.contains([1, 2, 3], 0)).to.equal(false, 'array containing 1 should not contain 0');
        });
        it('should handle strings', function () {
            chai.expect(Utils_1.Utils.contains(['a', 'b', 'c'], 'a')).to.equal(true, 'array containing \'a\' should contain \'a\'');
            chai.expect(Utils_1.Utils.contains(['a', 'b', 'c'], 'z')).to.equal(false, 'array containing \'a\' should not contain \'z\'');
        });
        it('should handle objects', function () {
            var obj1 = {};
            var obj2 = {};
            var obj3 = {};
            var objList = [obj1, obj2];
            chai.expect(Utils_1.Utils.contains(objList, obj1)).to.equal(true, 'object equality test for obj1');
            chai.expect(Utils_1.Utils.contains(objList, obj2)).to.equal(true, 'object equality test for obj2');
            chai.expect(Utils_1.Utils.contains(objList, obj3)).to.equal(false, 'object equality test for obj3');
        });
    });
    describe('removeAll', function () {
        it('should handle empty states', function () {
            chai.expect(Utils_1.Utils.removeAll([], null)).to.deep.equal([], 'remove null from empty array');
            chai.expect(Utils_1.Utils.removeAll([], undefined)).to.deep.equal([], 'remove undefined from empty array');
            chai.expect(Utils_1.Utils.removeAll(null, null)).to.deep.equal([], 'remove null from null');
            chai.expect(Utils_1.Utils.removeAll(undefined, undefined)).to.deep.equal([], 'remove undefined from undefined');
        });
        it('should handle numbers', function () {
            chai.expect(Utils_1.Utils.removeAll([1, 2, 3], [1])).to.deep.equal([2, 3], 'removing number');
            chai.expect(Utils_1.Utils.removeAll([1, 2, 3], [1, 2])).to.deep.equal([3], 'removing two numbers');
            chai.expect(Utils_1.Utils.removeAll([1, 2, 3], [1, 2, 3])).to.deep.equal([], 'removing all numbers');
            chai.expect(Utils_1.Utils.removeAll([1, 2, 3], [4, 5, 6])).to.deep.equal([1, 2, 3], 'removing non-contained numbers');
        });
        it('should handle strings', function () {
            chai.expect(Utils_1.Utils.removeAll(['a', 'b', 'c'], ['a'])).to.deep.equal(['b', 'c'], 'removing string');
            chai.expect(Utils_1.Utils.removeAll(['a', 'b', 'c'], ['a', 'b'])).to.deep.equal(['c'], 'removing two string');
            chai.expect(Utils_1.Utils.removeAll(['a', 'b', 'c'], ['a', 'b', 'c'])).to.deep.equal([], 'removing all strings');
            chai.expect(Utils_1.Utils.removeAll(['a', 'b', 'c'], ['x', 'y', 'z'])).to.deep.equal(['a', 'b', 'c'], 'removing non-contained strings');
        });
        it('should handle objects', function () {
            var obj1 = {};
            var obj2 = {};
            var obj3 = {};
            var objList = [obj1, obj2, obj3];
            chai.expect(Utils_1.Utils.removeAll(objList, [obj1])).to.deep.equal([obj2, obj2], 'removing object');
            chai.expect(Utils_1.Utils.removeAll(objList, [obj1, obj3])).to.deep.equal([obj2], 'removing two objects');
            chai.expect(Utils_1.Utils.removeAll(objList, [obj1, obj2, obj3])).to.deep.equal([], 'removing all objects');
            chai.expect(Utils_1.Utils.removeAll(objList, [{}, {}, {}])).to.deep.equal([obj1, obj2, obj3], 'removing non-contained objects');
        });
    });
    it('should trim strings properly', function () {
        chai.expect(Utils_1.Utils.trimTo(undefined, 10)).to.equal('');
        chai.expect(Utils_1.Utils.trimTo(null, 10)).to.equal('');
        chai.expect(Utils_1.Utils.trimTo('', 10)).to.equal('');
        chai.expect(Utils_1.Utils.trimTo('123456789', 10)).to.equal('123456789');
        chai.expect(Utils_1.Utils.trimTo('1234567890', 10)).to.equal('1234567890');
        chai.expect(Utils_1.Utils.trimTo('12345678901', 10)).to.equal('12345678...');
        chai.expect(Utils_1.Utils.trimTo('123456789012', 10)).to.equal('12345678...');
        chai.expect(Utils_1.Utils.trimTo('12345678901234567890', 10)).to.equal('12345678...');
    });
});
