import ts from 'typescript';

export default function forTransformer(
	this: ts.SourceFile,
	context: ts.TransformationContext,
	node: ts.JsxElement,
	visitor: ts.Visitor,
): ts.Node {
	const items = node.openingElement.attributes.properties.find((attribute) => {
		return attribute.name?.getText(this) === 'items';
	});

	const children = node.children.filter(
		(child) =>
			ts.isJsxExpression(child) &&
			child.expression &&
			(ts.isArrowFunction(child.expression) || ts.isFunctionExpression(child.expression)),
	) as ts.JsxExpression[];

	const firstChild = children[0];

	/**
	 * Check if first-child is a JSXExpression and the expression is defined
	 */
	if (
		items &&
		ts.isJsxAttribute(items) &&
		items.initializer &&
		ts.isJsxExpression(items.initializer) &&
		items.initializer.expression &&
		firstChild &&
		firstChild.expression
	) {
		const { expression } = firstChild;
		let newExpression: ts.Expression = expression;

		// if expression is an arrow function
		if (ts.isArrowFunction(expression)) {
			let body: ts.Expression | ts.Block | ts.EmptyStatement = ts.factory.createEmptyStatement();

			if (ts.isJsxElement(expression.body)) {
				// if body is JSXElement

				// () => <div/>
				body = visitor.call(this, expression.body) as ts.Expression;
			} else if (ts.isBlock(expression.body)) {
				body = context.factory.createBlock(
					// if body is Block
					// () => {
					//  return <div/>
					// }

					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					expression.body.statements.map(visitor.bind(this)!) as ts.Statement[],
				);
			} else if (ts.isParenthesizedExpression(expression.body)) {
				// if body is ParenthesizedExpression
				// () => (<div/>)

				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				body = expression.body.forEachChild(visitor.bind(this)!) as ts.ConciseBody;
			} else {
				body = expression.body;
			}

			newExpression = context.factory.createArrowFunction(
				expression.modifiers,
				expression.typeParameters,
				expression.parameters,
				expression.type,
				expression.equalsGreaterThanToken,
				body,
			);
		}

		// if expression is an regular function
		if (ts.isFunctionExpression(expression)) {
			newExpression = context.factory.createFunctionExpression(
				expression.modifiers,
				expression.asteriskToken,
				expression.name,
				expression.typeParameters,
				expression.parameters,
				expression.type,
				context.factory.createBlock(
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					expression.body.statements.map(visitor.bind(this)!) as ts.Statement[],
				),
			);
		}

		const func = context.factory.createCallExpression(
			context.factory.createPropertyAccessExpression(items.initializer.expression, 'map'),
			undefined,
			[newExpression],
		);

		return node.parent && ts.isJsxElement(node.parent)
			? context.factory.createJsxExpression(undefined, func)
			: func;
	}

	return node;
}
