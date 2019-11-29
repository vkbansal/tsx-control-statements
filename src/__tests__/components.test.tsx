import React from 'react';
import { render } from '@testing-library/react';

import { If, For, Choose, When, Otherwise } from '../components';

describe('component tests', () => {
  describe('<If /> tests ', () => {
    test('works with truthy condition', () => {
      const { container } = render(<If condition={true}>I'm inside a truthy condition</If>);

      expect(container).toMatchSnapshot();
    });

    test('works with falsy condition', () => {
      const { container } = render(<If condition={false}>I'm inside a falsy condition</If>);

      expect(container).toMatchSnapshot();
    });
  });

  describe('<For /> tests ', () => {
    test('works with arrow function', () => {
      const { container } = render(
        <For items={[1, 2, 3, 4, 5]}>{(item) => <div key={item}>{item}</div>}</For>
      );

      expect(container).toMatchSnapshot();
    });

    test('works with normal function', () => {
      const { container } = render(
        <For items={[1, 2, 3, 4, 5]}>
          {function(item) {
            return <div key={item}>{item}</div>;
          }}
        </For>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('<Choose /> tests ', () => {
    test('works with only <When /> and <OtherWise />', () => {
      const { container } = render(<Choose>Hello {'world'.toUpperCase()} !}</Choose>);

      expect(container).toMatchSnapshot();
    });

    test('works with <When />', () => {
      const { container } = render(
        <Choose>
          <When condition={false}>Hello {'world'.toLowerCase()} 1 !</When>
          <When condition={true}>Hello {'world'.toUpperCase()} !</When>
          <When condition={false}>Hello {'world'.toLowerCase()} 2 !</When>
        </Choose>
      );

      expect(container).toMatchSnapshot();
    });

    test('works with <Otherwise />', () => {
      const { container } = render(
        <Choose>
          <When condition={false}>Hello {'world'.toLowerCase()} 1 !</When>
          <When condition={false}>Hello {'world'.toLowerCase()} 2 !</When>
          <Otherwise>Hello {'world'.toUpperCase()} !</Otherwise>
        </Choose>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
