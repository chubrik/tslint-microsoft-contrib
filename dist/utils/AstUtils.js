"use strict";
var ts = require("typescript");
var SyntaxKind_1 = require("./SyntaxKind");
/**
 * General utility class.
 */
var AstUtils;
(function (AstUtils) {
    function getLanguageVariant(node) {
        if (/.*\.tsx/i.test(node.fileName)) {
            return ts.LanguageVariant.JSX;
        }
        else {
            return ts.LanguageVariant.Standard;
        }
    }
    AstUtils.getLanguageVariant = getLanguageVariant;
    function getFunctionName(node) {
        var expression = node.expression;
        var functionName = expression.text;
        if (functionName === undefined && expression.name) {
            functionName = expression.name.text;
        }
        return functionName;
    }
    AstUtils.getFunctionName = getFunctionName;
    function getFunctionTarget(expression) {
        if (expression.expression.kind === SyntaxKind_1.SyntaxKind.current().PropertyAccessExpression) {
            var propExp = expression.expression;
            return propExp.expression.getText();
        }
        return null;
    }
    AstUtils.getFunctionTarget = getFunctionTarget;
    function isJQuery(functionTarget) {
        return functionTarget === '$' || /^(jquery)$/i.test(functionTarget);
    }
    AstUtils.isJQuery = isJQuery;
    function hasModifier(modifiers, modifierKind) {
        if (modifiers == null) {
            return false;
        }
        var result = false;
        modifiers.forEach(function (modifier) {
            if (modifier.kind === modifierKind) {
                result = true;
            }
        });
        return result;
    }
    AstUtils.hasModifier = hasModifier;
    function dumpTypeInfo(expression, languageServices, typeChecker) {
        /* tslint:disable:no-console */
        console.log(expression.getFullText());
        console.log('\tkind: ' + expression.kind);
        if (expression.kind === SyntaxKind_1.SyntaxKind.current().Identifier
            || expression.kind === SyntaxKind_1.SyntaxKind.current().PropertyAccessExpression) {
            var definitionInfo = languageServices.getDefinitionAtPosition('file.ts', expression.getStart());
            if (definitionInfo) {
                definitionInfo.forEach(function (definitionInfo, index) {
                    console.log('\tdefinitionInfo-' + index);
                    console.log('\t\tkind: ' + definitionInfo.kind);
                    console.log('\t\tname: ' + definitionInfo.name);
                });
            }
            var typeInfo = languageServices.getTypeDefinitionAtPosition('file.ts', expression.getStart());
            if (typeInfo) {
                typeInfo.forEach(function (definitionInfo, index) {
                    console.log('\ttypeDefinitionInfo-' + index);
                    console.log('\t\tkind: ' + definitionInfo.kind);
                    console.log('\t\tname: ' + definitionInfo.name);
                });
            }
            var quickInfo = languageServices.getQuickInfoAtPosition('file.ts', expression.getStart());
            console.log('\tquickInfo.kind         = ' + quickInfo.kind);
            console.log('\tquickInfo.kindModifiers= ' + quickInfo.kindModifiers);
            console.log('\tquickInfo.textSpan     = ' + quickInfo.textSpan.start);
            console.log('\tquickInfo.displayParts = ' + quickInfo.displayParts[0].text);
            console.log('\tquickInfo.displayParts = ' + quickInfo.displayParts[0].kind);
            var expressionType = typeChecker.getTypeAtLocation(expression);
            console.log('\ttypeChecker.typeToString : ' + typeChecker.typeToString(expressionType));
            console.log('\ttype.flags: ' + expressionType.flags);
            console.log('\ttype.symbol: ' + expressionType.symbol);
            var expressionSymbol = typeChecker.getSymbolAtLocation(expression);
            if (expressionSymbol == null) {
                console.log('\tsymbol: ' + expressionSymbol);
            }
            else {
                console.log('\tsymbol.flags: ' + expressionSymbol.flags);
                console.log('\tsymbol.name: ' + expressionSymbol.name);
                console.log('\tsymbol.declarations: ' + expressionSymbol.declarations);
            }
            var contextualType = typeChecker.getContextualType(expression);
            if (contextualType == null) {
                console.log('\tcontextualType: ' + contextualType);
            }
            else {
                console.log('\tcontextualType.flags: ' + contextualType.flags);
                console.log('\tcontextualType.symbol: ' + contextualType.symbol);
            }
        }
        /* tslint:enable:no-console */
    }
    AstUtils.dumpTypeInfo = dumpTypeInfo;
    function isPrivate(node) {
        /* tslint:disable:no-bitwise */
        return !!(ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Private);
        /* tslint:enable:no-bitwise */
    }
    AstUtils.isPrivate = isPrivate;
    function isProtected(node) {
        /* tslint:disable:no-bitwise */
        return !!(ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Protected);
        /* tslint:enable:no-bitwise */
    }
    AstUtils.isProtected = isProtected;
    function isPublic(node) {
        /* tslint:disable:no-bitwise */
        return !!(ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Public);
        /* tslint:enable:no-bitwise */
    }
    AstUtils.isPublic = isPublic;
    function isStatic(node) {
        /* tslint:disable:no-bitwise */
        return !!(ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Static);
        /* tslint:enable:no-bitwise */
    }
    AstUtils.isStatic = isStatic;
    function isBindingPattern(node) {
        return node != null && (node.kind === SyntaxKind_1.SyntaxKind.current().ArrayBindingPattern ||
            node.kind === SyntaxKind_1.SyntaxKind.current().ObjectBindingPattern);
    }
    function walkUpBindingElementsAndPatterns(node) {
        while (node && (node.kind === SyntaxKind_1.SyntaxKind.current().BindingElement || isBindingPattern(node))) {
            node = node.parent;
        }
        return node;
    }
    function getCombinedNodeFlags(node) {
        node = walkUpBindingElementsAndPatterns(node);
        var flags = node.flags;
        if (node.kind === SyntaxKind_1.SyntaxKind.current().VariableDeclaration) {
            node = node.parent;
        }
        if (node && node.kind === SyntaxKind_1.SyntaxKind.current().VariableDeclarationList) {
            /* tslint:disable:no-bitwise */
            flags |= node.flags;
            /* tslint:enable:no-bitwise */
            node = node.parent;
        }
        if (node && node.kind === SyntaxKind_1.SyntaxKind.current().VariableStatement) {
            /* tslint:disable:no-bitwise */
            flags |= node.flags;
        }
        return flags;
    }
    function isLet(node) {
        /* tslint:disable:no-bitwise */
        return !!(getCombinedNodeFlags(node) & ts.NodeFlags.Let);
        /* tslint:enable:no-bitwise */
    }
    AstUtils.isLet = isLet;
    function isExported(node) {
        /* tslint:disable:no-bitwise */
        return !!(getCombinedNodeFlags(node) & ts.NodeFlags.ExportContext);
        /* tslint:enable:no-bitwise */
    }
    AstUtils.isExported = isExported;
    function isAssignmentOperator(token) {
        return token >= SyntaxKind_1.SyntaxKind.current().FirstAssignment && token <= SyntaxKind_1.SyntaxKind.current().LastAssignment;
    }
    AstUtils.isAssignmentOperator = isAssignmentOperator;
    function isBindingLiteralExpression(node) {
        return (!!node) &&
            (node.kind === SyntaxKind_1.SyntaxKind.current().ObjectLiteralExpression || node.kind === SyntaxKind_1.SyntaxKind.current().ArrayLiteralExpression);
    }
    AstUtils.isBindingLiteralExpression = isBindingLiteralExpression;
    function findParentBlock(child) {
        var parent = child.parent;
        while (parent != null) {
            if (parent.kind === SyntaxKind_1.SyntaxKind.current().Block) {
                return parent;
            }
            parent = parent.parent;
        }
        throw new Error('Could not determine parent block of node: ' + child);
    }
    AstUtils.findParentBlock = findParentBlock;
    function isSameIdentifer(source, target) {
        if (source == null || target == null) {
            return false;
        }
        if (source.kind === SyntaxKind_1.SyntaxKind.current().Identifier && target.kind === SyntaxKind_1.SyntaxKind.current().Identifier) {
            return source.getText() === target.getText();
        }
        return false;
    }
    AstUtils.isSameIdentifer = isSameIdentifer;
    function getDeclaredMethodNames(node) {
        var result = [];
        node.members.forEach(function (classElement) {
            if (classElement.kind === SyntaxKind_1.SyntaxKind.current().MethodDeclaration) {
                var methodDeclaration = classElement;
                if (methodDeclaration.name.kind === SyntaxKind_1.SyntaxKind.current().Identifier) {
                    result.push(methodDeclaration.name.text);
                }
            }
        });
        return result;
    }
    AstUtils.getDeclaredMethodNames = getDeclaredMethodNames;
    function isDeclarationFunctionType(node) {
        if (node.type != null) {
            if (node.type.getText() === 'Function') {
                return true;
            }
            return node.type.kind === SyntaxKind_1.SyntaxKind.current().FunctionType;
        }
        else if (node.initializer != null) {
            return (node.initializer.kind === SyntaxKind_1.SyntaxKind.current().ArrowFunction
                || node.initializer.kind === SyntaxKind_1.SyntaxKind.current().FunctionExpression);
        }
        return false;
    }
    AstUtils.isDeclarationFunctionType = isDeclarationFunctionType;
    function isUndefined(node) {
        if (node != null) {
            if (node.kind === SyntaxKind_1.SyntaxKind.current().Identifier) {
                return node.getText() === 'undefined';
            }
        }
        return false;
    }
    AstUtils.isUndefined = isUndefined;
    function isConstant(node) {
        if (node == null) {
            return false;
        }
        return node.kind === SyntaxKind_1.SyntaxKind.current().NullKeyword
            || node.kind === SyntaxKind_1.SyntaxKind.current().StringLiteral
            || node.kind === SyntaxKind_1.SyntaxKind.current().FalseKeyword
            || node.kind === SyntaxKind_1.SyntaxKind.current().TrueKeyword
            || node.kind === SyntaxKind_1.SyntaxKind.current().NumericLiteral;
    }
    AstUtils.isConstant = isConstant;
    function isConstantExpression(node) {
        if (node.kind === SyntaxKind_1.SyntaxKind.current().BinaryExpression) {
            var expression = node;
            var kind = expression.operatorToken.kind;
            if (kind >= SyntaxKind_1.SyntaxKind.current().FirstBinaryOperator && kind <= SyntaxKind_1.SyntaxKind.current().LastBinaryOperator) {
                return isConstantExpression(expression.left) && isConstantExpression(expression.right);
            }
        }
        if (node.kind === SyntaxKind_1.SyntaxKind.current().PrefixUnaryExpression || node.kind === SyntaxKind_1.SyntaxKind.current().PostfixUnaryExpression) {
            var expression = node;
            return isConstantExpression(expression.operand);
        }
        return isConstant(node);
    }
    AstUtils.isConstantExpression = isConstantExpression;
})(AstUtils = exports.AstUtils || (exports.AstUtils = {}));
