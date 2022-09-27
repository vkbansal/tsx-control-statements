import fs from 'node:fs';
import path from 'node:path';
import { expect, describe, test } from 'vitest';

import transformer from '../transformer';
import { serializer, getTransformedCode } from './helpers';

expect.addSnapshotSerializer(serializer);

describe('<If /> tests', () => {
	test('transforms <If />', async () => {
		const filename = 'ForStatement.tsx';
		const input = await fs.promises.readFile(
			path.resolve(__dirname, 'fixtures/ForStatement/input.tsx'),
			'utf-8',
		);
		const output = await fs.promises.readFile(
			path.resolve(__dirname, 'fixtures/ForStatement/output.tsx'),
			'utf-8',
		);

		const code = await getTransformedCode(input, filename, [transformer]);

		expect(code.transformed).toEqual(output);
	});
});
