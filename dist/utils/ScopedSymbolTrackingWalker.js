"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ts = require("typescript");
var ErrorTolerantWalker_1 = require("./ErrorTolerantWalker");
var SyntaxKind_1 = require("./SyntaxKind");
var AstUtils_1 = require("./AstUtils");
var Scope_1 = require("./Scope");
/**
 * This exists so that you can try to tell the types of variables
 * and identifiers in the current scope. It builds the current scope
 * from the SourceFile then -> Module -> Class -> Function
 */
var ScopedSymbolTrackingWalker = (function (_super) {
    __extends(ScopedSymbolTrackingWalker, _super);
    function ScopedSymbolTrackingWalker(sourceFile, options, languageServices) {
        var _this = _super.call(this, sourceFile, options) || this;
        _this.languageServices = languageServices;
        _this.typeChecker = _this.languageServices.getProgram().getTypeChecker();
        return _this;
    }
    ScopedSymbolTrackingWalker.prototype.isExpressionEvaluatingToFunction = function (expression) {
        if (expression.kind === SyntaxKind_1.SyntaxKind.current().ArrowFunction
            || expression.kind === SyntaxKind_1.SyntaxKind.current().FunctionExpression) {
            return true; // arrow function literals and arrow functions are definitely functions
        }
        if (expression.kind === SyntaxKind_1.SyntaxKind.current().StringLiteral
            || expression.kind === SyntaxKind_1.SyntaxKind.current().NoSubstitutionTemplateLiteral
            || expression.kind === SyntaxKind_1.SyntaxKind.current().TemplateExpression
            || expression.kind === SyntaxKind_1.SyntaxKind.current().TaggedTemplateExpression
            || expression.kind === SyntaxKind_1.SyntaxKind.current().BinaryExpression) {
            return false; // strings and binary expressions are definitely not functions
        }
        // is the symbol something we are tracking in scope ourselves?
        if (this.scope.isFunctionSymbol(expression.getText())) {
            return true;
        }
        if (expression.kind === SyntaxKind_1.SyntaxKind.current().Identifier) {
            var typeInfo = this.languageServices.getTypeDefinitionAtPosition('file.ts', expression.getStart());
            if (typeInfo != null && typeInfo[0] != null) {
                if (typeInfo[0].kind === 'function' || typeInfo[0].kind === 'local function') {
                    return true; // variables with type function are OK to pass
                }
            }
            return false;
        }
        if (expression.kind === SyntaxKind_1.SyntaxKind.current().CallExpression) {
            // calling Function.bind is a special case that makes tslint throw an exception
            if (expression.expression.name && expression.expression.name.getText() === 'bind') {
                return true; // for now assume invoking a function named bind returns a function. Follow up with tslint.
            }
            try {
                // seems like another tslint error of some sort
                var signature = this.typeChecker.getResolvedSignature(expression);
                var expressionType = this.typeChecker.getReturnTypeOfSignature(signature);
                return this.isFunctionType(expressionType, this.typeChecker);
            }
            catch (e) {
                // this exception is only thrown in unit tests, not the node debugger :(
                return false;
            }
        }
        return this.isFunctionType(this.typeChecker.getTypeAtLocation(expression), this.typeChecker);
    };
    ScopedSymbolTrackingWalker.prototype.isFunctionType = function (expressionType, typeChecker) {
        var signatures = typeChecker.getSignaturesOfType(expressionType, ts.SignatureKind.Call);
        if (signatures != null && signatures.length > 0) {
            var signatureDeclaration = signatures[0].declaration;
            if (signatureDeclaration.kind === SyntaxKind_1.SyntaxKind.current().FunctionType) {
                return true; // variables of type function are allowed to be passed as parameters
            }
        }
        return false;
    };
    ScopedSymbolTrackingWalker.prototype.visitSourceFile = function (node) {
        this.scope = new Scope_1.Scope(null);
        this.scope.addGlobalScope(node, node, this.getOptions());
        _super.prototype.visitSourceFile.call(this, node);
        this.scope = null;
    };
    ScopedSymbolTrackingWalker.prototype.visitModuleDeclaration = function (node) {
        this.scope = new Scope_1.Scope(this.scope);
        this.scope.addGlobalScope(node.body, this.getSourceFile(), this.getOptions());
        _super.prototype.visitModuleDeclaration.call(this, node);
        this.scope = this.scope.parent;
    };
    ScopedSymbolTrackingWalker.prototype.visitClassDeclaration = function (node) {
        var _this = this;
        this.scope = new Scope_1.Scope(this.scope);
        node.members.forEach(function (element) {
            var prefix = AstUtils_1.AstUtils.isStatic(element)
                ? node.name.getText() + '.'
                : 'this.';
            if (element.kind === SyntaxKind_1.SyntaxKind.current().MethodDeclaration) {
                // add all declared methods as valid functions
                _this.scope.addFunctionSymbol(prefix + element.name.getText());
            }
            else if (element.kind === SyntaxKind_1.SyntaxKind.current().PropertyDeclaration) {
                var prop = element;
                // add all declared function properties as valid functions
                if (AstUtils_1.AstUtils.isDeclarationFunctionType(prop)) {
                    _this.scope.addFunctionSymbol(prefix + element.name.getText());
                }
                else {
                    _this.scope.addNonFunctionSymbol(prefix + element.name.getText());
                }
            }
        });
        _super.prototype.visitClassDeclaration.call(this, node);
        this.scope = this.scope.parent;
    };
    ScopedSymbolTrackingWalker.prototype.visitFunctionDeclaration = function (node) {
        this.scope = new Scope_1.Scope(this.scope);
        this.scope.addParameters(node.parameters);
        _super.prototype.visitFunctionDeclaration.call(this, node);
        this.scope = this.scope.parent;
    };
    ScopedSymbolTrackingWalker.prototype.visitConstructorDeclaration = function (node) {
        this.scope = new Scope_1.Scope(this.scope);
        this.scope.addParameters(node.parameters);
        _super.prototype.visitConstructorDeclaration.call(this, node);
        this.scope = this.scope.parent;
    };
    ScopedSymbolTrackingWalker.prototype.visitMethodDeclaration = function (node) {
        this.scope = new Scope_1.Scope(this.scope);
        this.scope.addParameters(node.parameters);
        _super.prototype.visitMethodDeclaration.call(this, node);
        this.scope = this.scope.parent;
    };
    ScopedSymbolTrackingWalker.prototype.visitArrowFunction = function (node) {
        this.scope = new Scope_1.Scope(this.scope);
        this.scope.addParameters(node.parameters);
        _super.prototype.visitArrowFunction.call(this, node);
        this.scope = this.scope.parent;
    };
    ScopedSymbolTrackingWalker.prototype.visitFunctionExpression = function (node) {
        this.scope = new Scope_1.Scope(this.scope);
        this.scope.addParameters(node.parameters);
        _super.prototype.visitFunctionExpression.call(this, node);
        this.scope = this.scope.parent;
    };
    ScopedSymbolTrackingWalker.prototype.visitSetAccessor = function (node) {
        this.scope = new Scope_1.Scope(this.scope);
        this.scope.addParameters(node.parameters);
        _super.prototype.visitSetAccessor.call(this, node);
        this.scope = this.scope.parent;
    };
    return ScopedSymbolTrackingWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
exports.ScopedSymbolTrackingWalker = ScopedSymbolTrackingWalker;
