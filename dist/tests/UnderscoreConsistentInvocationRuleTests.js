/* tslint:disable:max-line-length */
/* tslint:disable:max-func-body-length */
"use strict";
var TestHelper_1 = require("./TestHelper");
/**
 * Unit tests.
 */
describe('underscoreConsistentInvocationRule', function () {
    var ruleName = 'underscore-consistent-invocation';
    it('should pass on wrapping functions in a new instance when style is instance', function () {
        var script = "\n            _(list).each(() => { return undefined; });\n            _(list).forEach(() => { return undefined; });\n            _(list).map(() => { return undefined; });\n            _(list).collect(() => { return undefined; });\n            _(list).reduce(() => { return undefined; });\n            _(list).inject(() => { return undefined; });\n            _(list).foldl(() => { return undefined; });\n            _(list).reduceRight(() => { return undefined; });\n            _(list).foldr(() => { return undefined; });\n            _(list).find(() => { return undefined; });\n            _(list).detect(() => { return undefined; });\n            _(list).filter(() => { return undefined; });\n            _(list).select(() => { return undefined; });\n            _(list).where(() => { return undefined; });\n            _(list).findWhere(() => { return undefined; });\n            _(list).reject(() => { return undefined; });\n            _(list).every(() => { return undefined; });\n            _(list).all(() => { return undefined; });\n            _(list).some(() => { return undefined; });\n            _(list).any(() => { return undefined; });\n            _(list).contains(() => { return undefined; });\n            _(list).include(() => { return undefined; });\n            _(list).invoke(() => { return undefined; });\n            _(list).pluck(() => { return undefined; });\n            _(list).max(() => { return undefined; });\n            _(list).min(() => { return undefined; });\n            _(list).sortBy(() => { return undefined; });\n            _(list).groupBy(() => { return undefined; });\n            _(list).indexBy(() => { return undefined; });\n            _(list).countBy(() => { return undefined; });\n            _(list).shuffle(() => { return undefined; });\n            _(list).sample(() => { return undefined; });\n            _(list).toArray(() => { return undefined; });\n            _(list).size(() => { return undefined; });\n            _(list).partition(() => { return undefined; });\n            _(list).first(() => { return undefined; });\n            _(list).head(() => { return undefined; });\n            _(list).take(() => { return undefined; });\n            _(list).initial(() => { return undefined; });\n            _(list).last(() => { return undefined; });\n            _(list).rest(() => { return undefined; });\n            _(list).tail(() => { return undefined; });\n            _(list).drop(() => { return undefined; });\n            _(list).compact(() => { return undefined; });\n            _(list).flatten(() => { return undefined; });\n            _(list).without(() => { return undefined; });\n            _(list).union(() => { return undefined; });\n            _(list).intersection(() => { return undefined; });\n            _(list).difference(() => { return undefined; });\n            _(list).uniq(() => { return undefined; });\n            _(list).unique(() => { return undefined; });\n            _(list).object(() => { return undefined; });\n            _(list).zip(() => { return undefined; });\n            _(list).unzip(() => { return undefined; });\n            _(list).indexOf(() => { return undefined; });\n            _(list).findIndex(() => { return undefined; });\n            _(list).lastIndexOf(() => { return undefined; });\n            _(list).findLastIndex(() => { return undefined; });\n            _(list).sortedIndex(() => { return undefined; });\n            _(list).range(() => { return undefined; });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, []);
    });
    it('should pass on invoking the underscore methods statically when style is static', function () {
        var script = "\n            _.each(list, () => { return undefined; });\n            _.forEach(list, () => { return undefined; });\n            _.map(list, () => { return undefined; });\n            _.collect(list, () => { return undefined; });\n            _.reduce(list, () => { return undefined; });\n            _.inject(list, () => { return undefined; });\n            _.foldl(list, () => { return undefined; });\n            _.reduceRight(list, () => { return undefined; });\n            _.foldr(list, () => { return undefined; });\n            _.find(list, () => { return undefined; });\n            _.detect(list, () => { return undefined; });\n            _.filter(list, () => { return undefined; });\n            _.select(list, () => { return undefined; });\n            _.where(list, () => { return undefined; });\n            _.findWhere(list, () => { return undefined; });\n            _.reject(list, () => { return undefined; });\n            _.every(list, () => { return undefined; });\n            _.all(list, () => { return undefined; });\n            _.some(list, () => { return undefined; });\n            _.any(list, () => { return undefined; });\n            _.contains(list, () => { return undefined; });\n            _.include(list, () => { return undefined; });\n            _.invoke(list, () => { return undefined; });\n            _.pluck(list, () => { return undefined; });\n            _.max(list, () => { return undefined; });\n            _.min(list, () => { return undefined; });\n            _.sortBy(list, () => { return undefined; });\n            _.groupBy(list, () => { return undefined; });\n            _.indexBy(list, () => { return undefined; });\n            _.countBy(list, () => { return undefined; });\n            _.shuffle(list, () => { return undefined; });\n            _.sample(list, () => { return undefined; });\n            _.toArray(list, () => { return undefined; });\n            _.size(list, () => { return undefined; });\n            _.partition(list, () => { return undefined; });\n            _.first(list, () => { return undefined; });\n            _.head(list, () => { return undefined; });\n            _.take(list, () => { return undefined; });\n            _.initial(list, () => { return undefined; });\n            _.last(list, () => { return undefined; });\n            _.rest(list, () => { return undefined; });\n            _.tail(list, () => { return undefined; });\n            _.drop(list, () => { return undefined; });\n            _.compact(list, () => { return undefined; });\n            _.flatten(list, () => { return undefined; });\n            _.without(list, () => { return undefined; });\n            _.union(list, () => { return undefined; });\n            _.intersection(list, () => { return undefined; });\n            _.difference(list, () => { return undefined; });\n            _.uniq(list, () => { return undefined; });\n            _.unique(list, () => { return undefined; });\n            _.object(list, () => { return undefined; });\n            _.zip(list, () => { return undefined; });\n            _.unzip(list, () => { return undefined; });\n            _.indexOf(list, () => { return undefined; });\n            _.findIndex(list, () => { return undefined; });\n            _.lastIndexOf(list, () => { return undefined; });\n            _.findLastIndex(list, () => { return undefined; });\n            _.sortedIndex(list, () => { return undefined; });\n            _.range(list, () => { return undefined; });\n        ";
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [true, { style: 'static' }], script, []);
    });
    it('should fail on invoking the underscore methods statically when style is instance', function () {
        var script = "\n            _.each(list, () => { return undefined; });\n            _.forEach(list, () => { return undefined; });\n            _.map(list, () => { return undefined; });\n            _.collect(list, () => { return undefined; });\n            _.reduce(list, () => { return undefined; });\n            _.inject(list, () => { return undefined; });\n            _.foldl(list, () => { return undefined; });\n            _.reduceRight(list, () => { return undefined; });\n            _.foldr(list, () => { return undefined; });\n            _.find(list, () => { return undefined; });\n            _.detect(list, () => { return undefined; });\n            _.filter(list, () => { return undefined; });\n            _.select(list, () => { return undefined; });\n            _.where(list, () => { return undefined; });\n            _.findWhere(list, () => { return undefined; });\n            _.reject(list, () => { return undefined; });\n            _.every(list, () => { return undefined; });\n            _.all(list, () => { return undefined; });\n            _.some(list, () => { return undefined; });\n            _.any(list, () => { return undefined; });\n            _.contains(list, () => { return undefined; });\n            _.include(list, () => { return undefined; });\n            _.invoke(list, () => { return undefined; });\n            _.pluck(list, () => { return undefined; });\n            _.max(list, () => { return undefined; });\n            _.min(list, () => { return undefined; });\n            _.sortBy(list, () => { return undefined; });\n            _.groupBy(list, () => { return undefined; });\n            _.indexBy(list, () => { return undefined; });\n            _.countBy(list, () => { return undefined; });\n            _.shuffle(list, () => { return undefined; });\n            _.sample(list, () => { return undefined; });\n            _.toArray(list, () => { return undefined; });\n            _.size(list, () => { return undefined; });\n            _.partition(list, () => { return undefined; });\n            _.first(list, () => { return undefined; });\n            _.head(list, () => { return undefined; });\n            _.take(list, () => { return undefined; });\n            _.initial(list, () => { return undefined; });\n            _.last(list, () => { return undefined; });\n            _.rest(list, () => { return undefined; });\n            _.tail(list, () => { return undefined; });\n            _.drop(list, () => { return undefined; });\n            _.compact(list, () => { return undefined; });\n            _.flatten(list, () => { return undefined; });\n            _.without(list, () => { return undefined; });\n            _.union(list, () => { return undefined; });\n            _.intersection(list, () => { return undefined; });\n            _.difference(list, () => { return undefined; });\n            _.uniq(list, () => { return undefined; });\n            _.unique(list, () => { return undefined; });\n            _.object(list, () => { return undefined; });\n            _.zip(list, () => { return undefined; });\n            _.unzip(list, () => { return undefined; });\n            _.indexOf(list, () => { return undefined; });\n            _.findIndex(list, () => { return undefined; });\n            _.lastIndexOf(list, () => { return undefined; });\n            _.findLastIndex(list, () => { return undefined; });\n            _.sortedIndex(list, () => { return undefined; });\n            _.range(list, () => { return undefined; });\n        ";
        TestHelper_1.TestHelper.assertViolations(ruleName, script, [
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.each",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.forEach",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 3 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.map",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 4 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.collect",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 5 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.reduce",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 6 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.inject",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 7 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.foldl",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 8 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.reduceRight",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 9 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.foldr",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 10 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.find",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 11 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.detect",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 12 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.filter",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 13 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.select",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 14 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.where",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 15 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.findWhere",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 16 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.reject",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 17 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.every",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 18 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.all",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 19 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.some",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 20 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.any",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 21 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.contains",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 22 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.include",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 23 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.invoke",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 24 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.pluck",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 25 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.max",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 26 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.min",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 27 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.sortBy",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 28 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.groupBy",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 29 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.indexBy",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 30 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.countBy",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 31 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.shuffle",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 32 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.sample",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 33 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.toArray",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 34 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.size",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 35 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.partition",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 36 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.first",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 37 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.head",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 38 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.take",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 39 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.initial",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 40 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.last",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 41 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.rest",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 42 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.tail",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 43 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.drop",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 44 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.compact",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 45 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.flatten",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 46 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.without",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 47 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.union",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 48 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.intersection",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 49 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.difference",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 50 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.uniq",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 51 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.unique",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 52 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.object",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 53 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.zip",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 54 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.unzip",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 55 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.indexOf",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 56 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.findIndex",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 57 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.lastIndexOf",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 58 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.findLastIndex",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 59 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.sortedIndex",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 60 }
            },
            {
                "failure": "Static invocation of underscore function found. Prefer instance version instead: _.range",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 61 }
            }
        ]);
    });
    it('should fail on wrapping functions in a new instance when style is static', function () {
        var script = "\n            _(list).each(() => { return undefined; });\n            _(list).forEach(() => { return undefined; });\n            _(list).map(() => { return undefined; });\n            _(list).collect(() => { return undefined; });\n            _(list).reduce(() => { return undefined; });\n            _(list).inject(() => { return undefined; });\n            _(list).foldl(() => { return undefined; });\n            _(list).reduceRight(() => { return undefined; });\n            _(list).foldr(() => { return undefined; });\n            _(list).find(() => { return undefined; });\n            _(list).detect(() => { return undefined; });\n            _(list).filter(() => { return undefined; });\n            _(list).select(() => { return undefined; });\n            _(list).where(() => { return undefined; });\n            _(list).findWhere(() => { return undefined; });\n            _(list).reject(() => { return undefined; });\n            _(list).every(() => { return undefined; });\n            _(list).all(() => { return undefined; });\n            _(list).some(() => { return undefined; });\n            _(list).any(() => { return undefined; });\n            _(list).contains(() => { return undefined; });\n            _(list).include(() => { return undefined; });\n            _(list).invoke(() => { return undefined; });\n            _(list).pluck(() => { return undefined; });\n            _(list).max(() => { return undefined; });\n            _(list).min(() => { return undefined; });\n            _(list).sortBy(() => { return undefined; });\n            _(list).groupBy(() => { return undefined; });\n            _(list).indexBy(() => { return undefined; });\n            _(list).countBy(() => { return undefined; });\n            _(list).shuffle(() => { return undefined; });\n            _(list).sample(() => { return undefined; });\n            _(list).toArray(() => { return undefined; });\n            _(list).size(() => { return undefined; });\n            _(list).partition(() => { return undefined; });\n            _(list).first(() => { return undefined; });\n            _(list).head(() => { return undefined; });\n            _(list).take(() => { return undefined; });\n            _(list).initial(() => { return undefined; });\n            _(list).last(() => { return undefined; });\n            _(list).rest(() => { return undefined; });\n            _(list).tail(() => { return undefined; });\n            _(list).drop(() => { return undefined; });\n            _(list).compact(() => { return undefined; });\n            _(list).flatten(() => { return undefined; });\n            _(list).without(() => { return undefined; });\n            _(list).union(() => { return undefined; });\n            _(list).intersection(() => { return undefined; });\n            _(list).difference(() => { return undefined; });\n            _(list).uniq(() => { return undefined; });\n            _(list).unique(() => { return undefined; });\n            _(list).object(() => { return undefined; });\n            _(list).zip(() => { return undefined; });\n            _(list).unzip(() => { return undefined; });\n            _(list).indexOf(() => { return undefined; });\n            _(list).findIndex(() => { return undefined; });\n            _(list).lastIndexOf(() => { return undefined; });\n            _(list).findLastIndex(() => { return undefined; });\n            _(list).sortedIndex(() => { return undefined; });\n            _(list).range(() => { return undefined; });\n        ";
        TestHelper_1.TestHelper.assertViolationsWithOptions(ruleName, [true, { style: 'static' }], script, [
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).each",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 2 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).forEach",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 3 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).map",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 4 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).collect",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 5 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).reduce",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 6 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).inject",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 7 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).foldl",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 8 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).reduceRight",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 9 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).foldr",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 10 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).find",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 11 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).detect",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 12 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).filter",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 13 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).select",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 14 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).where",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 15 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).findWhere",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 16 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).reject",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 17 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).every",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 18 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).all",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 19 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).some",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 20 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).any",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 21 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).contains",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 22 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).include",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 23 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).invoke",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 24 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).pluck",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 25 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).max",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 26 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).min",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 27 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).sortBy",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 28 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).groupBy",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 29 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).indexBy",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 30 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).countBy",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 31 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).shuffle",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 32 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).sample",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 33 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).toArray",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 34 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).size",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 35 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).partition",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 36 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).first",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 37 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).head",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 38 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).take",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 39 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).initial",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 40 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).last",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 41 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).rest",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 42 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).tail",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 43 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).drop",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 44 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).compact",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 45 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).flatten",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 46 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).without",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 47 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).union",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 48 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).intersection",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 49 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).difference",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 50 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).uniq",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 51 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).unique",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 52 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).object",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 53 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).zip",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 54 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).unzip",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 55 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).indexOf",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 56 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).findIndex",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 57 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).lastIndexOf",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 58 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).findLastIndex",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 59 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).sortedIndex",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 60 }
            },
            {
                "failure": "Underscore instance wrapping of variable found. Prefer underscore static functions instead: _(list).range",
                "name": "file.ts",
                "ruleName": "underscore-consistent-invocation",
                "startPosition": { "character": 13, "line": 61 }
            }
        ]);
    });
});
/* tslint:enable:max-line-length */
/* tslint:enable:max-func-body-length */
