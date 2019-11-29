import ts from 'typescript';

export function getChildrenWrappedInFragmentElement(
  node: ts.JsxChild[],
  fragment = 'React.Fragment'
): ts.JsxElement | ts.NullLiteral {
  return node.length > 0
    ? ts.createJsxElement(
        ts.createJsxOpeningElement(ts.createIdentifier(fragment), [], ts.createJsxAttributes([])),
        node,
        ts.createJsxClosingElement(ts.createIdentifier(fragment))
      )
    : ts.createNull();
}

export function createNestedTerinaryExpression(
  this: ts.SourceFile,
  nodes: ts.JsxElement[],
  fallback: ts.JsxElement | null,
  visitor: ts.Visitor
): ts.Expression {
  const [node, ...restNodes] = nodes;

  const condition = node.openingElement.attributes.properties.find((attribute) => {
    return attribute.name?.getText(this) === 'condition';
  });

  if (
    condition &&
    ts.isJsxAttribute(condition) &&
    condition.initializer &&
    ts.isJsxExpression(condition.initializer) &&
    condition.initializer.expression
  ) {
    const children = node.children.map(visitor.bind(this)) as ts.JsxChild[];
    const whenTrue = ts.createParen(getChildrenWrappedInFragmentElement(children));
    const whenFalse =
      restNodes.length > 0
        ? ts.createParen(createNestedTerinaryExpression.call(this, restNodes, fallback, visitor))
        : fallback
        ? ts.createParen(
            getChildrenWrappedInFragmentElement(
              fallback.children.map(visitor.bind(this)) as ts.JsxChild[]
            )
          )
        : ts.createNull();

    return ts.createConditional(condition.initializer.expression, whenTrue, whenFalse);
  }

  return ts.createNull();
}
