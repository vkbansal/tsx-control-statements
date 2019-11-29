import ts from 'typescript';

// import { getChildrenWrappedInFragmentElement } from './astUtils';

export default function forTransformer(
  this: ts.SourceFile,
  node: ts.JsxElement,
  _visitor: ts.Visitor
) {
  const items = node.openingElement.attributes.properties.find((attribute) => {
    return attribute.name?.getText(this) === 'items';
  });

  const children = node.children.filter(
    (child) =>
      ts.isJsxExpression(child) &&
      child.expression &&
      (ts.isArrowFunction(child.expression) || ts.isFunctionExpression(child.expression))
  ) as ts.JsxExpression[];

  if (
    items &&
    ts.isJsxAttribute(items) &&
    items.initializer &&
    ts.isJsxExpression(items.initializer) &&
    items.initializer.expression
  ) {
    if (children.length > 0) {
      const firstChild = children[0];

      const func = ts.createCall(
        ts.createPropertyAccess(items.initializer.expression, 'map'),
        undefined,
        [firstChild.expression!]
      );
      return node.parent && ts.isJsxElement(node.parent)
        ? ts.createJsxExpression(undefined, func)
        : func;
    }
  }

  return node;
}
