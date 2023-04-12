# TSX control statements

These are a set of components that provide basic control flow like **conditionals** and **loops** in TSX.
These components can be either used as is or can be transpiled to TypeScript expressions using provided transformer.

It is recommened to use both the components and the transformer together because:

1. The components provide type defintions and safety.
2. Using only components can and will fail in certain conditions. Consider the following example:
   ```tsx
   <If condition={user}>{user.name}</If>
   ```
   If `user` is `undefined` in above example, you'll see the infamous `Cannot read property 'name' of undefined` error. This is because in a JSX component, all of its properties including body are eagerly evaluated.

## Known Limitations

- **Transformer**: Intented to work only with [`ts-loader`](https://github.com/TypeStrong/ts-loader) and [`awesome-typescript-loader`](https://github.com/s-panferov/awesome-typescript-loader). Will not work with [`babel`](https://babeljs.io/).
- **Transformer**: Since CLIs (like `tsc`, `ts-node`) do not provide option to add custom transformers, this will not work with those.

## Installation

```bash
npm install -D @vkbansal/tsx-control-statements
# or
yarn add -D @vkbansal/tsx-control-statements
```

## Components API

This package exposes the following components:

### `If` Component

#### Usage

```tsx
import React from 'react';
import { If } from '@vkbansal/tsx-control-statements';

function MyComponent() {
  return (
    <div>
      {/* component code... */}
      <If condition={myBooleanCondition}>
        <span>This will included only if condition is true</span>
      </If>
      {/* component code... */}
    </div>
  );
}
```

#### Transformation

```tsx
import React from 'react';

function MyComponent() {
  return (
    <div>
      {/* component code... */}
      {myBooleanCondition ? (
        <React.Fragment>
          <span>This will included only if condition is true</span>
        </React.Fragment>
      ) : null}
      {/* component code... */}
    </div>
  );
}
```

### `For` Component

#### Usage

```tsx
import React from 'react';
import { For } from '@vkbansal/tsx-control-statements';

function MyComponent() {
  return (
    <div>
      {/* component code... */}
      <For items={[1, 2, 3, 4, 5]}>{(item) => <div key={item}>{item}</div>}</For>
      {/* component code... */}
    </div>
  );
}
```

#### Transformation

```tsx
import React from 'react';

function MyComponent() {
  return (
    <div>
      {/* component code... */}
      <React.Fragment>
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item}>{item}</div>
        ))}
      </React.Fragment>
      {/* component code... */}
    </div>
  );
}
```

### `Choose`, `When` & `Otherwise` Component

#### Usage

```tsx
import React from 'react';
import { Choose, When, Otherwise } from '@vkbansal/tsx-control-statements';

function MyComponent() {
  return (
    <div>
      {/* component code... */}
      <Choose>
        <When condition={condition1}>This will be shown when "condition1" is true</When>
        <When condition={condition2}>This will be shown when "condition2" is true</When>
        <Otherwise>This will be shown when both "condition1" and "condition2" are false</Otherwise>
      </Choose>
      {/* component code... */}
    </div>
  );
}
```

#### Transformation

```tsx
import React from 'react';

function MyComponent() {
  return (
    <div>
      {/* component code... */}
      {condition1 ? (
        <React.Fragment>This will be shown when "condition1" is true</React.Fragment>
      ) : condition2 ? (
        <React.Fragment>This will be shown when "condition2" is true</React.Fragment>
      ) : (
        <React.Fragment>
          This will be shown when both "condition1" and "condition2" are false
        </React.Fragment>
      )}
      {/* component code... */}
    </div>
  );
}
```

## Transformer API

### `ts-loader`

```js
/* webpack.config.js */
const {
	transformer: tsxControlStatementsTransformer
} = require('@vkbansal/tsx-control-statements');

module.exports = {
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader',
				options: {
					getCustomTransformers: (program) => ({
						before: [tsxControlStatementsTransformer]
					})
				}
			}
		];
	}
}
```

## Release & Changelog

This project uses [standard-version](https://github.com/conventional-changelog/standard-version) for managing [releases](./releases) and [changelog](./CHANGELOG.md)

## License

[MIT](./LICENSE.md). Copyright(c) [Vivek Kumar Bansal](https://vkbansal.me)
