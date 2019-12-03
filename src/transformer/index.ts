import ts from 'typescript';

import ifTransformer from './ifTransformer';
import chooseTransformer from './chooseTransformer';
import forTransformer from './forTransformer';

const IMPORT_REGEX = /@vkbansal\/tsx-control-statements/;

export default function transformer(
  context: ts.TransformationContext
): ts.Transformer<ts.SourceFile> {
  let isImported = false;

  function visitor(this: ts.SourceFile, node: ts.Node): ts.Node {
    if (ts.isImportDeclaration(node) && IMPORT_REGEX.test(node.moduleSpecifier.getText(this))) {
      isImported = true;
      return ts.createEmptyStatement();
    }

    if (ts.isJsxElement(node)) {
      switch (node.openingElement.tagName.getText(this)) {
        case 'If':
          return isImported ? ifTransformer.call(this, node, visitor.bind(this)) : node;
        case 'Choose':
          return isImported ? chooseTransformer.call(this, node, visitor.bind(this)) : node;
        case 'For':
          return isImported ? forTransformer.call(this, node, visitor.bind(this)) : node;
      }
    }

    return ts.visitEachChild(node, visitor.bind(this), context);
  }

  return (sourceFile: ts.SourceFile) => ts.visitNode(sourceFile, visitor.bind(sourceFile));
}
