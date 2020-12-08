import React from 'react';

import { For, If } from '@vkbansal/tsx-control-statements';

export function ForStatement(): React.ReactElement {
  return (
    <div>
      <For items={[1, 2, 3, 4, 5]}>
        {(item) => (
          <If condition={item > 3}>
            <div key={item}>{item}</div>
          </If>
        )}
      </For>
      <For items={[1, 2, 3, 4, 5]}>
        {(item) => {
          return (
            <If condition={item > 3}>
              <div key={item}>{item}</div>
            </If>
          );
        }}
      </For>
      <For items={[1, 2, 3, 4, 5]}>
        {(item) => {
          const a = item;

          return (
            <If condition={a > 3}>
              <div key={item}>{item}</div>
            </If>
          );
        }}
      </For>
      <For items={[1, 2, 3, 4, 5]}>
        {function (item) {
          return (
            <If condition={item > 3}>
              <div key={item}>{item}</div>
            </If>
          );
        }}
      </For>
      <For items={[1, 2, 3, 4, 5]}>
        {function (item) {
          const a = item;

          return (
            <If condition={a > 3}>
              <div key={item}>{item}</div>
            </If>
          );
        }}
      </For>
      <For items={[1, 2]}>{(k) => <div>{k}</div>}</For>
    </div>
  );
}
