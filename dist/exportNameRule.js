"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ErrorTolerantWalker_1 = require("./utils/ErrorTolerantWalker");
var Utils_1 = require("./utils/Utils");
var SyntaxKind_1 = require("./utils/SyntaxKind");
var AstUtils_1 = require("./utils/AstUtils");
/**
 * Implementation of the export-name rule.
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new ExportNameWalker(sourceFile, this.getOptions()));
    };
    /* tslint:disable:function-name */
    Rule.getExceptions = function (options) {
        /* tslint:enable:function-name */
        if (options.ruleArguments instanceof Array) {
            return options.ruleArguments[0];
        }
        if (options instanceof Array) {
            return options; // MSE version of tslint somehow requires this
        }
        return null;
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
Rule.metadata = {
    ruleName: 'export-name',
    type: 'maintainability',
    description: 'The name of the exported module must match the filename of the source file',
    options: null,
    optionsDescription: "",
    typescriptOnly: true,
    issueClass: 'Ignored',
    issueType: 'Warning',
    severity: 'Low',
    level: 'Opportunity for Excellence',
    group: 'Clarity',
    commonWeaknessEnumeration: '710'
};
Rule.FAILURE_STRING = 'The exported module or identifier name must match the file name. Found: ';
var ExportNameWalker = (function (_super) {
    __extends(ExportNameWalker, _super);
    function ExportNameWalker() {
        return _super.apply(this, arguments) || this;
    }
    ExportNameWalker.prototype.visitSourceFile = function (node) {
        var _this = this;
        // look for single export assignment from file first
        var singleExport = node.statements.filter(function (element) {
            return element.kind === SyntaxKind_1.SyntaxKind.current().ExportAssignment;
        });
        if (singleExport.length === 1) {
            var exportAssignment = singleExport[0];
            this.validateExport(exportAssignment.expression.getText(), exportAssignment.expression);
            return; // there is a single export and it is valid, so do not proceed
        }
        var exportedTopLevelElements = [];
        // exports are normally declared at the top level
        node.statements.forEach(function (element) {
            var exportStatements = _this.getExportStatements(element);
            exportedTopLevelElements = exportedTopLevelElements.concat(exportStatements);
        });
        // exports might be hidden inside a namespace
        if (exportedTopLevelElements.length === 0) {
            node.statements.forEach(function (element) {
                if (element.kind === SyntaxKind_1.SyntaxKind.current().ModuleDeclaration) {
                    var exportStatements = _this.getExportStatementsWithinModules(element);
                    exportedTopLevelElements = exportedTopLevelElements.concat(exportStatements);
                }
            });
        }
        this.validateExportedElements(exportedTopLevelElements);
    };
    ExportNameWalker.prototype.getExportStatementsWithinModules = function (moduleDeclaration) {
        var _this = this;
        if (moduleDeclaration.body.kind === SyntaxKind_1.SyntaxKind.current().ModuleDeclaration) {
            // modules may be nested so recur into the structure
            return this.getExportStatementsWithinModules(moduleDeclaration.body);
        }
        else if (moduleDeclaration.body.kind === SyntaxKind_1.SyntaxKind.current().ModuleBlock) {
            var exportStatements_1 = [];
            var moduleBlock = moduleDeclaration.body;
            moduleBlock.statements.forEach(function (element) {
                exportStatements_1 = exportStatements_1.concat(_this.getExportStatements(element));
            });
            return exportStatements_1;
        }
    };
    ExportNameWalker.prototype.getExportStatements = function (element) {
        var exportStatements = [];
        if (element.kind === SyntaxKind_1.SyntaxKind.current().ExportAssignment) {
            var exportAssignment = element;
            this.validateExport(exportAssignment.expression.getText(), exportAssignment.expression);
        }
        else if (AstUtils_1.AstUtils.hasModifier(element.modifiers, SyntaxKind_1.SyntaxKind.current().ExportKeyword)) {
            exportStatements.push(element);
        }
        return exportStatements;
    };
    ExportNameWalker.prototype.validateExportedElements = function (exportedElements) {
        // only validate the exported elements when a single export statement is made
        if (exportedElements.length === 1) {
            if (exportedElements[0].kind === SyntaxKind_1.SyntaxKind.current().ModuleDeclaration ||
                exportedElements[0].kind === SyntaxKind_1.SyntaxKind.current().ClassDeclaration ||
                exportedElements[0].kind === SyntaxKind_1.SyntaxKind.current().FunctionDeclaration) {
                this.validateExport(exportedElements[0].name.text, exportedElements[0]);
            }
            else if (exportedElements[0].kind === SyntaxKind_1.SyntaxKind.current().VariableStatement) {
                var variableStatement = exportedElements[0];
                // ignore comma separated variable lists
                if (variableStatement.declarationList.declarations.length === 1) {
                    var variableDeclaration = variableStatement.declarationList.declarations[0];
                    this.validateExport(variableDeclaration.name.text, variableDeclaration);
                }
            }
        }
    };
    ExportNameWalker.prototype.validateExport = function (exportedName, node) {
        var regex = new RegExp(exportedName + '\..*'); // filename must be exported name plus any extension
        if (!regex.test(this.getFilename())) {
            if (!this.isSuppressed(exportedName)) {
                var failureString = Rule.FAILURE_STRING + this.getSourceFile().fileName + ' and ' + exportedName;
                var failure = this.createFailure(node.getStart(), node.getWidth(), failureString);
                this.addFailure(failure);
            }
        }
    };
    ExportNameWalker.prototype.getFilename = function () {
        var filename = this.getSourceFile().fileName;
        var lastSlash = filename.lastIndexOf('/');
        if (lastSlash > -1) {
            return filename.substring(lastSlash + 1);
        }
        return filename;
    };
    ExportNameWalker.prototype.isSuppressed = function (exportedName) {
        var allExceptions = Rule.getExceptions(this.getOptions());
        return Utils_1.Utils.exists(allExceptions, function (exception) {
            return new RegExp(exception).test(exportedName);
        });
    };
    return ExportNameWalker;
}(ErrorTolerantWalker_1.ErrorTolerantWalker));
exports.ExportNameWalker = ExportNameWalker;
