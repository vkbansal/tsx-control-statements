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

    expect(code).toMatchInlineSnapshot(`
      File: ChooseStatement.tsx

      Content:

      import React from 'react';

      import { Choose, When, Otherwise, If } from '@vkbansal/tsx-control-statements';

      export interface ChooseStatementProps {
        name?: string;
      }

      export function ChooseStatement(props: ChooseStatementProps): React.ReactElement {
        return (
          <div>
            <Choose>
              {/* Single String */}
              <When condition={typeof props.name === 'string'}>Hello {props.name}</When>
              {/* Single Component */}
              <When condition={typeof props.name === 'string'}>
                <div>Hello {props.name}</div>
              </When>
              {/* Single Self-closing Component */}
              <When condition={typeof props.name === 'string'}>
                <div />
              </When>
              {/* Multiple Components */}
              <When condition={typeof props.name === 'string'}>
                Hello {props.name}
                <div>Hello {props.name}</div>
                <div />
              </When>
              {/* Nested Components */}
              <Otherwise>
                <div />
                Hello {props.name}
                <div>Hello {props.name}</div>
                <If condition={true}>
                  <div />
                  <If condition={true}>
                    <div />
                  </If>
                </If>
              </Otherwise>
            </Choose>
          </div>
        );
      }


      Code before Transform:

      import React from 'react';
      import { Choose, When, Otherwise, If } from '@vkbansal/tsx-control-statements';
      export interface ChooseStatementProps {
        name?: string;
      }
      export function ChooseStatement(props: ChooseStatementProps): React.ReactElement {
        return (
          <div>
            <Choose>
              <When condition={typeof props.name === 'string'}>Hello {props.name}</When>

              <When condition={typeof props.name === 'string'}>
                <div>Hello {props.name}</div>
              </When>

              <When condition={typeof props.name === 'string'}>
                <div />
              </When>

              <When condition={typeof props.name === 'string'}>
                Hello {props.name}
                <div>Hello {props.name}</div>
                <div />
              </When>

              <Otherwise>
                <div />
                Hello {props.name}
                <div>Hello {props.name}</div>
                <If condition={true}>
                  <div />
                  <If condition={true}>
                    <div />
                  </If>
                </If>
              </Otherwise>
            </Choose>
          </div>
        );
      }


      Code after Transform: 

      import React from 'react';
      export interface ChooseStatementProps {
        name?: string;
      }
      export function ChooseStatement(props: ChooseStatementProps): React.ReactElement {
        return (
          <div>
            {typeof props.name === 'string' ? (
              <React.Fragment>Hello {props.name}</React.Fragment>
            ) : typeof props.name === 'string' ? (
              <React.Fragment>
                <div>Hello {props.name}</div>
              </React.Fragment>
            ) : typeof props.name === 'string' ? (
              <React.Fragment>
                <div />
              </React.Fragment>
            ) : typeof props.name === 'string' ? (
              <React.Fragment>
                Hello {props.name}
                <div>Hello {props.name}</div>
                <div />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div />
                Hello {props.name}
                <div>Hello {props.name}</div>
                {true ? (
                  <React.Fragment>
                    <div />
                    {true ? (
                      <React.Fragment>
                        <div />
                      </React.Fragment>
                    ) : null}
                  </React.Fragment>
                ) : null}
              </React.Fragment>
            )}
          </div>
        );
      }

    `);
  });
});
