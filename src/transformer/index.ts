import ts from 'typescript';

import ifTransformer from './ifTransformer';
import chooseTransformer from './chooseTransformer';
import forTransformer from './forTransformer';

export default function transformer(
  context: ts.TransformationContext
): ts.Transformer<ts.SourceFile> {
  function visitor(this: ts.SourceFile, node: ts.Node) {
    if (ts.isJsxElement(node)) {
      switch (node.openingElement.tagName.getText(this)) {
        case 'If':
          return ifTransformer.call(this, node, visitor.bind(this));
        case 'Choose':
          return chooseTransformer.call(this, node, visitor.bind(this));
        case 'For':
          return forTransformer.call(this, node, visitor.bind(this));
      }
    }

    return ts.visitEachChild(node, visitor.bind(this), context);
  }

  return (sourceFile: ts.SourceFile) => ts.visitNode(sourceFile, visitor.bind(sourceFile));
}
