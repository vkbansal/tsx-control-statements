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
