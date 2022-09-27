import ts from 'typescript';
import prettier from 'prettier';
import type { expect } from 'vitest';

const printer = ts.createPrinter();
const tsControlStatementsTest = Symbol('ts-control-statements-test');

type Plugin = Parameters<typeof expect.addSnapshotSerializer>[0];

export interface TransformTest {
	type: typeof tsControlStatementsTest;
	filename: string;
	content: string;
	source: string;
	transformed: string;
}

export const serializer: Plugin = {
	test(obj: unknown): obj is TransformTest {
		return typeof obj === 'object' && (obj as TransformTest)?.type === tsControlStatementsTest;
	},
	serialize(obj: unknown): string {
		return [
			`File: ${(obj as TransformTest).filename}`,
			`Content:\n\n${(obj as TransformTest).content}`,
			`Code before Transform:\n\n${(obj as TransformTest).source}`,
			`Code after Transform: \n\n${(obj as TransformTest).transformed}`,
		].join('\n\n');
	},
};

export async function getTransformedCode(
	content: string,
	filename: string,
	transformers: ts.TransformerFactory<ts.SourceFile>[],
): Promise<TransformTest> {
	const sourceFile = ts.createSourceFile(filename, content, ts.ScriptTarget.Latest, true);
	const source = printer.printFile(sourceFile);
	const transformedFile = ts.transform<ts.SourceFile>(sourceFile, transformers, {}).transformed[0];
	const transformed = printer.printFile(transformedFile);

	const conf = await prettier.resolveConfig(process.cwd());

	return {
		type: tsControlStatementsTest,
		filename,
		content,
		source: prettier.format(source, conf ? { ...conf, parser: 'typescript' } : {}),
		transformed: prettier.format(transformed, conf ? { ...conf, parser: 'typescript' } : {}),
	};
}
