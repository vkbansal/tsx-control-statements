import React from 'react';

import { For } from '@vkbansal/tsx-control-statements';

export function ForStatement(): React.ReactElement {
  return (
    <div>
      <For items={[1, 2, 3, 4, 5]}>{(item) => <div key={item}>{item}</div>}</For>
      <For items={[1, 2, 3, 4, 5]}>
        {function(item) {
          return <div key={item}>{item}</div>;
        }}
      </For>
    </div>
  );
}
