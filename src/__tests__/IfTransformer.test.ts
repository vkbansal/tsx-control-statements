import fs from 'node:fs';
import path from 'node:path';
import { expect, describe, test } from 'vitest';

import transformer from '../transformer';
import { getTransformedCode } from './helpers';

describe('<If /> tests', () => {
	test('transforms <If />', async () => {
		const filename = 'IfStatement.tsx';
		const input = await fs.promises.readFile(
			path.resolve(__dirname, 'fixtures/IfStatement/input.tsx'),
			'utf-8',
		);
		const output = await fs.promises.readFile(
			path.resolve(__dirname, 'fixtures/IfStatement/output.tsx'),
			'utf-8',
		);

		const code = await getTransformedCode(input, filename, [transformer]);

		expect(code.transformed).toEqual(output);
	});
});
