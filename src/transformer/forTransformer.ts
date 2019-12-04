import ts from 'typescript';

export default function forTransformer(
  this: ts.SourceFile,
  node: ts.JsxElement,
  visitor: ts.Visitor
): ts.Node {
  const items = node.openingElement.attributes.properties.find((attribute) => {
    return attribute.name?.getText(this) === 'items';
  });

  const children = node.children.filter(
    (child) =>
      ts.isJsxExpression(child) &&
      child.expression &&
      (ts.isArrowFunction(child.expression) || ts.isFunctionExpression(child.expression))
  ) as ts.JsxExpression[];

  const firstChild = children[0];

  if (
    items &&
    ts.isJsxAttribute(items) &&
    items.initializer &&
    ts.isJsxExpression(items.initializer) &&
    items.initializer.expression &&
    firstChild &&
    firstChild.expression
  ) {
    if (children.length > 0) {
      let funcExpression = firstChild.expression;

      if (ts.isArrowFunction(funcExpression)) {
        funcExpression = ts.createArrowFunction(
          funcExpression.modifiers,
          funcExpression.typeParameters,
          funcExpression.parameters,
          funcExpression.type,
          funcExpression.equalsGreaterThanToken,
          ts.isBlock(funcExpression.body)
            ? ts.createBlock(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                funcExpression.body.statements.map(visitor.bind(this)!) as ts.Statement[]
              )
            : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              (funcExpression.body.forEachChild(visitor.bind(this)!) as ts.ConciseBody)
        );
      }

      if (ts.isFunctionExpression(funcExpression)) {
        funcExpression = ts.createFunctionExpression(
          funcExpression.modifiers,
          funcExpression.asteriskToken,
          funcExpression.name,
          funcExpression.typeParameters,
          funcExpression.parameters,
          funcExpression.type,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ts.createBlock(funcExpression.body.statements.map(visitor.bind(this)!) as ts.Statement[])
        );
      }

      const func = ts.createCall(
        ts.createPropertyAccess(items.initializer.expression, 'map'),
        undefined,
        [funcExpression]
      );
      return node.parent && ts.isJsxElement(node.parent)
        ? ts.createJsxExpression(undefined, func)
        : func;
    }
  }

  return node;
}
