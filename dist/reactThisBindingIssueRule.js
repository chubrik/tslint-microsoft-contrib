"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var Lint = require("tslint");
var AstUtils_1 = require("./utils/AstUtils");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var Scope_1 = require("./utils/Scope");
var SyntaxKind_1 = require("./utils/SyntaxKind");
var Utils_1 = require("./utils/Utils");
var FAILURE_ANONYMOUS_LISTENER = 'A new instance of an anonymous method is passed as a JSX attribute: ';
var FAILURE_DOUBLE_BIND = 'A function is having its \'this\' reference bound twice in the constructor: ';
var FAILURE_UNBOUND_LISTENER = 'A class method is passed as a JSX attribute without having the \'this\' ' +
    'reference bound in the constructor: ';
/**
 * Implementation of the react-this-binding-issue rule.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        if (sourceFile.languageVariant === ts.LanguageVariant.JSX) {
            return this.applyWithWalker(new ReactThisBindingIssueRuleWalker(sourceFile, this.getOptions()));
        }
        else {
            return [];
        }
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'react-this-binding-issue',
    type: 'maintainability',
    description: 'When using React components you must be careful to correctly bind the `this` reference ' +
        'on any methods that you pass off to child components as callbacks.',
    options: null,
    optionsDescription: "",
    typescriptOnly: true,
    issueClass: 'Non-SDL',
    issueType: 'Error',
    severity: 'Critical',
    level: 'Opportunity for Excellence',
    group: 'Correctness'
};
var ReactThisBindingIssueRuleWalker = (function (_super) {
    __extends(ReactThisBindingIssueRuleWalker, _super);
    function ReactThisBindingIssueRuleWalker(sourceFile, options) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.allowAnonymousListeners = false;
        _this.boundListeners = [];
        _this.declaredMethods = [];
        _this.getOptions().forEach(function (opt) {
            if (typeof (opt) === 'object') {
                _this.allowAnonymousListeners = opt['allow-anonymous-listeners'] === true;
            }
        });
        return _this;
    }
    ReactThisBindingIssueRuleWalker.prototype.visitClassDeclaration = function (node) {
        var _this = this;
        // reset all state when a class declaration is found because a SourceFile can contain multiple classes
        this.boundListeners = [];
        // find all method names and prepend 'this.' to it so we can compare array elements to method names easily
        this.declaredMethods = [];
        AstUtils_1.AstUtils.getDeclaredMethodNames(node).forEach(function (methodName) {
            _this.declaredMethods.push('this.' + methodName);
        });
        _super.prototype.visitClassDeclaration.call(this, node);
    };
    ReactThisBindingIssueRuleWalker.prototype.visitConstructorDeclaration = function (node) {
        this.boundListeners = this.getSelfBoundListeners(node);
        _super.prototype.visitConstructorDeclaration.call(this, node);
    };
    ReactThisBindingIssueRuleWalker.prototype.visitJsxElement = function (node) {
        this.visitJsxOpeningElement(node.openingElement); // a normal JSX element has-a OpeningElement
        _super.prototype.visitJsxElement.call(this, node);
    };
    ReactThisBindingIssueRuleWalker.prototype.visitJsxSelfClosingElement = function (node) {
        this.visitJsxOpeningElement(node); // a self closing JSX element is-a OpeningElement
        _super.prototype.visitJsxSelfClosingElement.call(this, node);
    };
    ReactThisBindingIssueRuleWalker.prototype.visitMethodDeclaration = function (node) {
        // reset variable scope when we encounter a method. Start tracking variables that are instantiated
        // in scope so we can make sure new function instances are not passed as JSX attributes
        this.scope = new Scope_1.Scope(null);
        _super.prototype.visitMethodDeclaration.call(this, node);
        this.scope = null;
    };
    ReactThisBindingIssueRuleWalker.prototype.visitArrowFunction = function (node) {
        if (this.scope != null) {
            this.scope = new Scope_1.Scope(this.scope);
        }
        _super.prototype.visitArrowFunction.call(this, node);
        if (this.scope != null) {
            this.scope = this.scope.parent;
        }
    };
    ReactThisBindingIssueRuleWalker.prototype.visitFunctionExpression = function (node) {
        if (this.scope != null) {
            this.scope = new Scope_1.Scope(this.scope);
        }
        _super.prototype.visitFunctionExpression.call(this, node);
        if (this.scope != null) {
            this.scope = this.scope.parent;
        }
    };
    ReactThisBindingIssueRuleWalker.prototype.visitVariableDeclaration = function (node) {
        if (this.scope != null) {
            if (node.name.kind === SyntaxKind_1.SyntaxKind.current().Identifier) {
                var variableName = node.name.text;
                if (this.isExpressionAnonymousFunction(node.initializer)) {
                    this.scope.addFunctionSymbol(variableName);
                }
            }
        }
        _super.prototype.visitVariableDeclaration.call(this, node);
    };
    ReactThisBindingIssueRuleWalker.prototype.visitJsxOpeningElement = function (node) {
        var _this = this;
        // create violations if the listener is a reference to a class method that was not bound to 'this' in the constructor
        node.attributes.forEach(function (attributeLikeElement) {
            if (_this.isUnboundListener(attributeLikeElement)) {
                var attribute = attributeLikeElement;
                if (attribute.initializer.kind === SyntaxKind_1.SyntaxKind.current().StringLiteral) {
                    return;
                }
                var jsxExpression = attribute.initializer;
                var propAccess = jsxExpression.expression;
                var listenerText = propAccess.getText();
                if (_this.declaredMethods.indexOf(listenerText) > -1 && _this.boundListeners.indexOf(listenerText) === -1) {
                    var start = propAccess.getStart();
                    var widget = propAccess.getWidth();
                    var message = FAILURE_UNBOUND_LISTENER + listenerText;
                    _this.addFailure(_this.createFailure(start, widget, message));
                }
            }
            else if (_this.isAttributeAnonymousFunction(attributeLikeElement)) {
                var attribute = attributeLikeElement;
                if (attribute.initializer.kind === SyntaxKind_1.SyntaxKind.current().StringLiteral) {
                    return;
                }
                var jsxExpression = attribute.initializer;
                var expression = jsxExpression.expression;
                var start = expression.getStart();
                var widget = expression.getWidth();
                var message = FAILURE_ANONYMOUS_LISTENER + Utils_1.Utils.trimTo(expression.getText(), 30);
                _this.addFailure(_this.createFailure(start, widget, message));
            }
        });
    };
    ReactThisBindingIssueRuleWalker.prototype.isAttributeAnonymousFunction = function (attributeLikeElement) {
        if (this.allowAnonymousListeners) {
            return false;
        }
        if (attributeLikeElement.kind === SyntaxKind_1.SyntaxKind.current().JsxAttribute) {
            var attribute = attributeLikeElement;
            if (attribute.initializer != null && attribute.initializer.kind === SyntaxKind_1.SyntaxKind.current().JsxExpression) {
                var jsxExpression = attribute.initializer;
                var expression = jsxExpression.expression;
                return this.isExpressionAnonymousFunction(expression);
            }
        }
        return false;
    };
    ReactThisBindingIssueRuleWalker.prototype.isExpressionAnonymousFunction = function (expression) {
        if (expression == null) {
            return false;
        }
        // Arrow functions and Function expressions create new anonymous function instances
        if (expression.kind === SyntaxKind_1.SyntaxKind.current().ArrowFunction
            || expression.kind === SyntaxKind_1.SyntaxKind.current().FunctionExpression) {
            return true;
        }
        if (expression.kind === SyntaxKind_1.SyntaxKind.current().CallExpression) {
            var callExpression = expression;
            var functionName = AstUtils_1.AstUtils.getFunctionName(callExpression);
            if (functionName === 'bind') {
                return true; // bind functions on Function or _ create a new anonymous instance of a function
            }
        }
        if (expression.kind === SyntaxKind_1.SyntaxKind.current().Identifier) {
            var symbolText = expression.getText();
            return this.scope.isFunctionSymbol(symbolText);
        }
        return false;
    };
    ReactThisBindingIssueRuleWalker.prototype.isUnboundListener = function (attributeLikeElement) {
        if (attributeLikeElement.kind === SyntaxKind_1.SyntaxKind.current().JsxAttribute) {
            var attribute = attributeLikeElement;
            if (attribute.initializer != null && attribute.initializer.kind === SyntaxKind_1.SyntaxKind.current().JsxExpression) {
                var jsxExpression = attribute.initializer;
                if (jsxExpression.expression != null && jsxExpression.expression.kind === SyntaxKind_1.SyntaxKind.current().PropertyAccessExpression) {
                    var propAccess = jsxExpression.expression;
                    if (propAccess.expression.getText() === 'this') {
                        var listenerText = propAccess.getText();
                        // an unbound listener is a class method reference that was not bound to 'this' in the constructor
                        if (this.declaredMethods.indexOf(listenerText) > -1 && this.boundListeners.indexOf(listenerText) === -1) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    ReactThisBindingIssueRuleWalker.prototype.getSelfBoundListeners = function (node) {
        var _this = this;
        var result = [];
        if (node.body != null && node.body.statements != null) {
            node.body.statements.forEach(function (statement) {
                if (statement.kind === SyntaxKind_1.SyntaxKind.current().ExpressionStatement) {
                    var expressionStatement = statement;
                    var expression = expressionStatement.expression;
                    if (expression.kind === SyntaxKind_1.SyntaxKind.current().BinaryExpression) {
                        var binaryExpression = expression;
                        var operator = binaryExpression.operatorToken;
                        if (operator.kind === SyntaxKind_1.SyntaxKind.current().EqualsToken) {
                            if (binaryExpression.left.kind === SyntaxKind_1.SyntaxKind.current().PropertyAccessExpression) {
                                var leftPropText = binaryExpression.left.getText();
                                if (binaryExpression.right.kind === SyntaxKind_1.SyntaxKind.current().CallExpression) {
                                    var callExpression = binaryExpression.right;
                                    if (AstUtils_1.AstUtils.getFunctionName(callExpression) === 'bind'
                                        && callExpression.arguments != null
                                        && callExpression.arguments.length === 1
                                        && callExpression.arguments[0].getText() === 'this') {
                                        var rightPropText = AstUtils_1.AstUtils.getFunctionTarget(callExpression);
                                        if (leftPropText === rightPropText) {
                                            if (result.indexOf(rightPropText) === -1) {
                                                result.push(rightPropText);
                                            }
                                            else {
                                                var start = binaryExpression.getStart();
                                                var width = binaryExpression.getWidth();
                                                var msg = FAILURE_DOUBLE_BIND + binaryExpression.getText();
                                                _this.addFailure(_this.createFailure(start, width, msg));
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
        return result;
    };
    return ReactThisBindingIssueRuleWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
