import fs from 'node:fs';
import path from 'node:path';
import { expect, describe, test } from 'vitest';

import transformer from '../transformer';
import { getTransformedCode } from './helpers';

describe('<Choose /> tests', () => {
	test('transforms <Choose />', async () => {
		const filename = 'ChooseStatement.tsx';
		const input = await fs.promises.readFile(
			path.resolve(__dirname, 'fixtures/ChooseStatement/input.tsx'),
			'utf-8',
		);

		const output = await fs.promises.readFile(
			path.resolve(__dirname, 'fixtures/ChooseStatement/output.tsx'),
			'utf-8',
		);

		const code = await getTransformedCode(input, filename, [transformer]);

		expect(code.transformed).toEqual(output);
	});
});
