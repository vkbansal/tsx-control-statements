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
