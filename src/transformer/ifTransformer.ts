import ts from 'typescript';

import { createNestedTerinaryExpression } from './astUtils';

export default function ifTransformer(
	this: ts.SourceFile,
	context: ts.TransformationContext,
	node: ts.JsxElement,
	visitor: ts.Visitor,
): ts.Node {
	const terinary = createNestedTerinaryExpression.call(this, context, [node], null, visitor);

	return node.parent && ts.isJsxElement(node.parent)
		? context.factory.createJsxExpression(undefined, terinary)
		: terinary;
}
