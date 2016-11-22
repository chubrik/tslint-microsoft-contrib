"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var SyntaxKind_1 = require("./utils/SyntaxKind");
var AstUtils_1 = require("./utils/AstUtils");
var MochaUtils_1 = require("./utils/MochaUtils");
var Utils_1 = require("./utils/Utils");
var FAILURE_STRING = 'Mocha test contains dangerous variable initialization. Move to before()/beforeEach(): ';
/**
 * Implementation of the mocha-no-side-effect-code rule.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new MochaNoSideEffectCodeRuleWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'mocha-no-side-effect-code',
    type: 'maintainability',
    description: 'All test logic in a Mocha test case should be within Mocha lifecycle method.',
    options: null,
    optionsDescription: "",
    typescriptOnly: true,
    issueClass: 'Ignored',
    issueType: 'Warning',
    severity: 'Moderate',
    level: 'Opportunity for Excellence',
    group: 'Correctness'
};
var MochaNoSideEffectCodeRuleWalker = (function (_super) {
    __extends(MochaNoSideEffectCodeRuleWalker, _super);
    function MochaNoSideEffectCodeRuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.isInDescribe = false;
        _this.parseOptions();
        return _this;
    }
    MochaNoSideEffectCodeRuleWalker.prototype.parseOptions = function () {
        var _this = this;
        this.getOptions().forEach(function (opt) {
            if (typeof (opt) === 'object') {
                if (opt.ignore != null) {
                    _this.ignoreRegex = new RegExp(opt.ignore);
                }
            }
        });
    };
    MochaNoSideEffectCodeRuleWalker.prototype.visitSourceFile = function (node) {
        var _this = this;
        if (MochaUtils_1.MochaUtils.isMochaTest(node)) {
            node.statements.forEach(function (statement) {
                // validate variable declarations in global scope
                if (statement.kind === SyntaxKind_1.SyntaxKind.current().VariableStatement) {
                    var declarationList = statement.declarationList;
                    declarationList.declarations.forEach(function (declaration) {
                        _this.validateExpression(declaration.initializer, declaration);
                    });
                }
                // walk into the describe calls
                if (MochaUtils_1.MochaUtils.isStatementDescribeCall(statement)) {
                    var expression = statement.expression;
                    var call = expression;
                    _this.visitCallExpression(call);
                }
            });
        }
    };
    MochaNoSideEffectCodeRuleWalker.prototype.visitVariableDeclaration = function (node) {
        if (this.isInDescribe === true) {
            this.validateExpression(node.initializer, node);
        }
    };
    MochaNoSideEffectCodeRuleWalker.prototype.visitFunctionDeclaration = function (node) {
        // never walk into function declarations. new scopes are inherently safe
    };
    MochaNoSideEffectCodeRuleWalker.prototype.visitClassDeclaration = function (node) {
        // never walk into class declarations. new scopes are inherently safe
    };
    MochaNoSideEffectCodeRuleWalker.prototype.visitCallExpression = function (node) {
        if (MochaUtils_1.MochaUtils.isDescribe(node)) {
            var nestedSubscribe = this.isInDescribe;
            this.isInDescribe = true;
            _super.prototype.visitCallExpression.call(this, node);
            if (nestedSubscribe === false) {
                this.isInDescribe = false;
            }
        }
        else if (MochaUtils_1.MochaUtils.isLifecycleMethod(node)) {
            // variable initialization is allowed inside the lifecycle methods, so do not visit them
            return;
        }
        else if (this.isInDescribe) {
            // raw CallExpressions should be banned inside a describe that are *not* inside a lifecycle method
            this.validateExpression(node, node);
        }
    };
    MochaNoSideEffectCodeRuleWalker.prototype.validateExpression = function (initializer, parentNode) {
        var _this = this;
        if (initializer == null) {
            return;
        }
        // constants cannot throw errors in the test runner
        if (AstUtils_1.AstUtils.isConstant(initializer)) {
            return;
        }
        // function expressions are not executed now and will not throw an error
        if (initializer.kind === SyntaxKind_1.SyntaxKind.current().FunctionExpression
            || initializer.kind === SyntaxKind_1.SyntaxKind.current().ArrowFunction) {
            return;
        }
        // empty arrays and arrays filled with constants are allowed
        if (initializer.kind === SyntaxKind_1.SyntaxKind.current().ArrayLiteralExpression) {
            var arrayLiteral = initializer;
            arrayLiteral.elements.forEach(function (expression) {
                _this.validateExpression(expression, parentNode);
            });
            return;
        }
        // template strings are OK (it is too hard to analyze a template string fully)
        if (initializer.kind === SyntaxKind_1.SyntaxKind.current().FirstTemplateToken) {
            return;
        }
        // type assertions are OK, but check the initializer
        if (initializer.kind === SyntaxKind_1.SyntaxKind.current().TypeAssertionExpression) {
            var assertion = initializer;
            this.validateExpression(assertion.expression, parentNode);
            return;
        }
        // Property aliasing is OK
        if (initializer.kind === SyntaxKind_1.SyntaxKind.current().PropertyAccessExpression) {
            return;
        }
        // simple identifiers are OK
        if (initializer.kind === SyntaxKind_1.SyntaxKind.current().Identifier) {
            return;
        }
        // a simple object literal can contain many violations
        if (initializer.kind === SyntaxKind_1.SyntaxKind.current().ObjectLiteralExpression) {
            var literal = initializer;
            literal.properties.forEach(function (element) {
                if (element.kind === SyntaxKind_1.SyntaxKind.current().PropertyAssignment) {
                    var assignment = element;
                    _this.validateExpression(assignment.initializer, parentNode);
                }
            });
            return;
        }
        // moment() is OK
        if (initializer.getText() === 'moment()') {
            return;
        }
        if (initializer.kind === SyntaxKind_1.SyntaxKind.current().CallExpression
            && AstUtils_1.AstUtils.getFunctionTarget(initializer) === 'moment()') {
            return;
        }
        // new Date is OK
        if (initializer.kind === SyntaxKind_1.SyntaxKind.current().NewExpression) {
            if (AstUtils_1.AstUtils.getFunctionName(initializer) === 'Date') {
                return;
            }
        }
        // ignore anything matching our ignore regex
        if (this.ignoreRegex != null && this.ignoreRegex.test(initializer.getText())) {
            return;
        }
        if (AstUtils_1.AstUtils.isConstantExpression(initializer)) {
            return;
        }
        //console.log(ts.SyntaxKind[initializer.kind] + ' ' + initializer.getText());
        var message = FAILURE_STRING + Utils_1.Utils.trimTo(parentNode.getText(), 30);
        this.addFailure(this.createFailure(parentNode.getStart(), parentNode.getWidth(), message));
    };
    return MochaNoSideEffectCodeRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
