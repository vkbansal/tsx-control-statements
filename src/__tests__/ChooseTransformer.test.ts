import * as fs from 'fs';
import * as path from 'path';

import transformer from '../transformer';
import { serializer, getTransformedCode } from './helpers';

expect.addSnapshotSerializer(serializer);

describe('<Choose /> tests', () => {
  test('transforms <Choose />', async () => {
    const filename = 'ChooseStatement.tsx';
    const content = await fs.promises.readFile(
      path.resolve(__dirname, 'fixtures', filename),
      'utf-8'
    );

    const code = await getTransformedCode(content, filename, [transformer]);

    expect(code).toMatchSnapshot();
  });
});
