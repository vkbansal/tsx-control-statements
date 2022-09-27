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
