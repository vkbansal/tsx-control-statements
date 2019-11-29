import ts from 'typescript';

import { createNestedTerinaryExpression } from './astUtils';

export default function chooseTransformer(
  this: ts.SourceFile,
  node: ts.JsxElement,
  visitor: ts.Visitor
) {
  const whenElements: ts.JsxElement[] = [];
  let otherwiseElement: ts.JsxElement | null = null;

  for (const child of node.children) {
    if (!ts.isJsxElement(child)) {
      continue;
    }

    const tagName = child.openingElement.tagName.getText(this);

    if (tagName === 'Otherwise') {
      otherwiseElement = child;
      break;
    }

    if (tagName === 'When') {
      whenElements.push(child);
    }
  }

  if (whenElements.length > 0) {
    const terinary = createNestedTerinaryExpression.call(
      this,
      whenElements,
      otherwiseElement,
      visitor
    );

    return node.parent && ts.isJsxElement(node.parent)
      ? ts.createJsxExpression(undefined, terinary)
      : terinary;
  }

  return node;
}
