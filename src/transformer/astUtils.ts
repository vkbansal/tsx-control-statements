import ts from 'typescript';

export function getChildrenWrappedInFragmentElement(
	context: ts.TransformationContext,
	node: ts.JsxChild[],
	fragment = 'React.Fragment',
): ts.JsxElement | ts.NullLiteral {
	return node.length > 0
		? context.factory.createJsxElement(
				context.factory.createJsxOpeningElement(
					context.factory.createIdentifier(fragment),
					[],
					context.factory.createJsxAttributes([]),
				),
				node,
				context.factory.createJsxClosingElement(context.factory.createIdentifier(fragment)),
		  )
		: context.factory.createNull();
}

export function createNestedTerinaryExpression(
	this: ts.SourceFile,
	context: ts.TransformationContext,
	nodes: ts.JsxElement[],
	fallback: ts.JsxElement | null,
	visitor: ts.Visitor,
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
		const whenTrue = context.factory.createParenthesizedExpression(
			getChildrenWrappedInFragmentElement(context, children),
		);
		const whenFalse =
			restNodes.length > 0
				? context.factory.createParenthesizedExpression(
						createNestedTerinaryExpression.call(this, context, restNodes, fallback, visitor),
				  )
				: fallback
				? context.factory.createParenthesizedExpression(
						getChildrenWrappedInFragmentElement(
							context,
							fallback.children.map(visitor.bind(this)) as ts.JsxChild[],
						),
				  )
				: context.factory.createNull();

		return context.factory.createConditionalExpression(
			condition.initializer.expression,
			undefined,
			whenTrue,
			undefined,
			whenFalse,
		);
	}

	return context.factory.createNull();
}
