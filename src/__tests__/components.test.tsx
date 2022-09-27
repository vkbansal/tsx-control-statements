import React from 'react';
import { render } from '@testing-library/react';
import { expect, describe, test } from 'vitest';

import { If, For, Choose, When, Otherwise } from '../components';

describe('component tests', () => {
	describe('<If /> tests ', () => {
		// @vitest-environment happy-dom
		test('works with truthy condition', () => {
			const { container } = render(<If condition={true}>I&apos;m inside a truthy condition</If>);

			expect(container).toMatchInlineSnapshot(`
        <div>
          I'm inside a truthy condition
        </div>
      `);
		});

		// @vitest-environment happy-dom
		test('works with falsy condition', () => {
			const { container } = render(<If condition={false}>I&apos;m inside a falsy condition</If>);

			expect(container).toMatchInlineSnapshot(`<div />`);
		});
	});

	describe('<For /> tests ', () => {
		// @vitest-environment happy-dom
		test('works with arrow function', () => {
			const { container } = render(
				<For items={[1, 2, 3, 4, 5]}>{(item) => <div key={item}>{item}</div>}</For>,
			);

			expect(container).toMatchInlineSnapshot(`
        <div>
          <div>
            1
          </div>
          <div>
            2
          </div>
          <div>
            3
          </div>
          <div>
            4
          </div>
          <div>
            5
          </div>
        </div>
      `);
		});

		// @vitest-environment happy-dom
		test('works with normal function', () => {
			const { container } = render(
				<For items={[1, 2, 3, 4, 5]}>
					{function (item) {
						return <div key={item}>{item}</div>;
					}}
				</For>,
			);

			expect(container).toMatchInlineSnapshot(`
        <div>
          <div>
            1
          </div>
          <div>
            2
          </div>
          <div>
            3
          </div>
          <div>
            4
          </div>
          <div>
            5
          </div>
        </div>
      `);
		});
	});

	describe('<Choose /> tests ', () => {
		// @vitest-environment happy-dom
		test('works with only <When /> and <OtherWise />', () => {
			const { container } = render(<Choose>Hello {'world'.toUpperCase()} !</Choose>);

			expect(container).toMatchInlineSnapshot(`<div />`);
		});

		// @vitest-environment happy-dom
		test('works with <When />', () => {
			const { container } = render(
				<Choose>
					<When condition={false}>Hello {'world'.toLowerCase()} 1 !</When>
					<When condition={true}>Hello {'world'.toUpperCase()} !</When>
					<When condition={false}>Hello {'world'.toLowerCase()} 2 !</When>
				</Choose>,
			);

			expect(container).toMatchInlineSnapshot(`
				<div>
				  Hello 
				  WORLD
				   !
				</div>
			`);
		});

		// @vitest-environment happy-dom
		test('works with <Otherwise />', () => {
			const { container } = render(
				<Choose>
					<When condition={false}>Hello {'world'.toLowerCase()} 1 !</When>
					<When condition={false}>Hello {'world'.toLowerCase()} 2 !</When>
					<Otherwise>Hello {'world'.toUpperCase()} !</Otherwise>
				</Choose>,
			);

			expect(container).toMatchInlineSnapshot(`
				<div>
				  Hello 
				  WORLD
				   !
				</div>
			`);
		});
	});
});
