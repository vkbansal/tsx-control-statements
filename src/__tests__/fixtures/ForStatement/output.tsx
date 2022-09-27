import React from 'react';
export function ForStatement(): React.ReactElement {
	return (
		<div>
			{[1, 2, 3, 4, 5].map((item) =>
				item > 3 ? (
					<React.Fragment>
						<div key={item}>{item}</div>
					</React.Fragment>
				) : null,
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
				<div key={k}>{k}</div>
			))}
		</div>
	);
}
