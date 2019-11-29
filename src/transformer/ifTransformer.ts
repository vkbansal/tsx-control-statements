import ts from 'typescript';

import { createNestedTerinaryExpression } from './astUtils';

export default function ifTransformer(
  this: ts.SourceFile,
  node: ts.JsxElement,
  visitor: ts.Visitor
) {
  const terinary = createNestedTerinaryExpression.call(this, [node], null, visitor);

  return node.parent && ts.isJsxElement(node.parent)
    ? ts.createJsxExpression(undefined, terinary)
    : terinary;
}
