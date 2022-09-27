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
