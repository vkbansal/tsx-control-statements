import fs from 'node:fs';
import path from 'node:path';
import { expect, describe, test } from 'vitest';

import transformer from '../transformer';
import { serializer, getTransformedCode } from './helpers';

expect.addSnapshotSerializer(serializer);

describe('<If /> tests', () => {
	test('transforms <If />', async () => {
		const filename = 'IfStatement.tsx';
		const content = await fs.promises.readFile(
			path.resolve(__dirname, 'fixtures', filename),
			'utf-8',
		);

		const code = await getTransformedCode(content, filename, [transformer]);

		expect(code).toMatchInlineSnapshot(`
			File: IfStatement.tsx

			Content:

			import React from 'react';

			import { If } from '@vkbansal/tsx-control-statements';

			export interface IfStatementProps {
				name?: string;
			}

			export function IfStatement(props: IfStatementProps): React.ReactElement {
				return (
					<div>
						{/* Single String */}
						<If condition={typeof props.name === 'string'}>Hello {props.name}</If>
						{/* Single Component */}
						<If condition={typeof props.name === 'string'}>
							<div>Hello {props.name}</div>
						</If>
						{/* Single Self-closing Component */}
						<If condition={typeof props.name === 'string'}>
							<div />
						</If>
						{/* Multiple Components */}
						<If condition={typeof props.name === 'string'}>
							Hello {props.name}
							<div>Hello {props.name}</div>
							<div />
						</If>
						{/* Nested If Components */}
						<If condition={typeof props.name === 'string'}>
							<div />
							Hello {props.name}
							<div>Hello {props.name}</div>
							<If condition={true}>
								<div />
								<If condition={true}>
									<div />
								</If>
							</If>
						</If>
					</div>
				);
			}


			Code before Transform:

			import React from 'react';
			import { If } from '@vkbansal/tsx-control-statements';
			export interface IfStatementProps {
				name?: string;
			}
			export function IfStatement(props: IfStatementProps): React.ReactElement {
				return (
					<div>
						{/* Single String */}
						<If condition={typeof props.name === 'string'}>Hello {props.name}</If>
						{/* Single Component */}
						<If condition={typeof props.name === 'string'}>
							<div>Hello {props.name}</div>
						</If>
						{/* Single Self-closing Component */}
						<If condition={typeof props.name === 'string'}>
							<div />
						</If>
						{/* Multiple Components */}
						<If condition={typeof props.name === 'string'}>
							Hello {props.name}
							<div>Hello {props.name}</div>
							<div />
						</If>
						{/* Nested If Components */}
						<If condition={typeof props.name === 'string'}>
							<div />
							Hello {props.name}
							<div>Hello {props.name}</div>
							<If condition={true}>
								<div />
								<If condition={true}>
									<div />
								</If>
							</If>
						</If>
					</div>
				);
			}


			Code after Transform: 

			import React from 'react';
			export interface IfStatementProps {
				name?: string;
			}
			export function IfStatement(props: IfStatementProps): React.ReactElement {
				return (
					<div>
						{/* Single String */}
						{typeof props.name === 'string' ? <React.Fragment>Hello {props.name}</React.Fragment> : null}
						{/* Single Component */}
						{typeof props.name === 'string' ? (
							<React.Fragment>
								<div>Hello {props.name}</div>
							</React.Fragment>
						) : null}
						{/* Single Self-closing Component */}
						{typeof props.name === 'string' ? (
							<React.Fragment>
								<div />
							</React.Fragment>
						) : null}
						{/* Multiple Components */}
						{typeof props.name === 'string' ? (
							<React.Fragment>
								Hello {props.name}
								<div>Hello {props.name}</div>
								<div />
							</React.Fragment>
						) : null}
						{/* Nested If Components */}
						{typeof props.name === 'string' ? (
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
						) : null}
					</div>
				);
			}
		`);
	});
});
