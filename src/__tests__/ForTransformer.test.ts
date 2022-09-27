import * as fs from 'fs';
import * as path from 'path';

import transformer from '../transformer';
import { serializer, getTransformedCode } from './helpers';

expect.addSnapshotSerializer(serializer);

describe('<If /> tests', () => {
	test('transforms <If />', async () => {
		const filename = 'ForStatement.tsx';
		const content = await fs.promises.readFile(
			path.resolve(__dirname, 'fixtures', filename),
			'utf-8',
		);

		const code = await getTransformedCode(content, filename, [transformer]);

		expect(code).toMatchInlineSnapshot(`
      File: ForStatement.tsx

      Content:

      import React from 'react';

      import { For, If } from '@vkbansal/tsx-control-statements';

      export function ForStatement(): React.ReactElement {
        return (
          <div>
            <For items={[1, 2, 3, 4, 5]}>
              {(item) => (
                <If condition={item > 3}>
                  <div key={item}>{item}</div>
                </If>
              )}
            </For>
            <For items={[1, 2, 3, 4, 5]}>
              {(item) => {
                return (
                  <If condition={item > 3}>
                    <div key={item}>{item}</div>
                  </If>
                );
              }}
            </For>
            <For items={[1, 2, 3, 4, 5]}>
              {(item) => {
                const a = item;

                return (
                  <If condition={a > 3}>
                    <div key={item}>{item}</div>
                  </If>
                );
              }}
            </For>
            <For items={[1, 2, 3, 4, 5]}>
              {function (item) {
                return (
                  <If condition={item > 3}>
                    <div key={item}>{item}</div>
                  </If>
                );
              }}
            </For>
            <For items={[1, 2, 3, 4, 5]}>
              {function (item) {
                const a = item;

                return (
                  <If condition={a > 3}>
                    <div key={item}>{item}</div>
                  </If>
                );
              }}
            </For>
            <For items={[1, 2]}>{(k) => <div>{k}</div>}</For>
          </div>
        );
      }


      Code before Transform:

      import React from 'react';
      import { For, If } from '@vkbansal/tsx-control-statements';
      export function ForStatement(): React.ReactElement {
        return (
          <div>
            <For items={[1, 2, 3, 4, 5]}>
              {(item) => (
                <If condition={item > 3}>
                  <div key={item}>{item}</div>
                </If>
              )}
            </For>
            <For items={[1, 2, 3, 4, 5]}>
              {(item) => {
                return (
                  <If condition={item > 3}>
                    <div key={item}>{item}</div>
                  </If>
                );
              }}
            </For>
            <For items={[1, 2, 3, 4, 5]}>
              {(item) => {
                const a = item;
                return (
                  <If condition={a > 3}>
                    <div key={item}>{item}</div>
                  </If>
                );
              }}
            </For>
            <For items={[1, 2, 3, 4, 5]}>
              {function (item) {
                return (
                  <If condition={item > 3}>
                    <div key={item}>{item}</div>
                  </If>
                );
              }}
            </For>
            <For items={[1, 2, 3, 4, 5]}>
              {function (item) {
                const a = item;
                return (
                  <If condition={a > 3}>
                    <div key={item}>{item}</div>
                  </If>
                );
              }}
            </For>
            <For items={[1, 2]}>{(k) => <div>{k}</div>}</For>
          </div>
        );
      }


      Code after Transform: 

      import React from 'react';
      export function ForStatement(): React.ReactElement {
        return (
          <div>
            {[1, 2, 3, 4, 5].map((item) =>
              item > 3 ? (
                <React.Fragment>
                  <div key={item}>{item}</div>
                </React.Fragment>
              ) : null
            )}
            {[1, 2, 3, 4, 5].map((item) => {
              return item > 3 ? (
                <React.Fragment>
                  <div key={item}>{item}</div>
                </React.Fragment>
              ) : null;
            })}
            {[1, 2, 3, 4, 5].map((item) => {
              const a = item;
              return a > 3 ? (
                <React.Fragment>
                  <div key={item}>{item}</div>
                </React.Fragment>
              ) : null;
            })}
            {[1, 2, 3, 4, 5].map(function (item) {
              return item > 3 ? (
                <React.Fragment>
                  <div key={item}>{item}</div>
                </React.Fragment>
              ) : null;
            })}
            {[1, 2, 3, 4, 5].map(function (item) {
              const a = item;
              return a > 3 ? (
                <React.Fragment>
                  <div key={item}>{item}</div>
                </React.Fragment>
              ) : null;
            })}
            {[1, 2].map((k) => (
              <div>{k}</div>
            ))}
          </div>
        );
      }

    `);
	});
});
