import React from 'react';

export interface IfProps {
  condition: boolean;
  children: React.ReactNode;
}

export function If(props: IfProps): React.ReactElement | null {
  return props.condition ? <React.Fragment>{props.children}</React.Fragment> : null;
}

If.__ControlStatement = Symbol('If');

export interface ForProps<T> {
  items: T[];
  children: (item: T, index: number) => React.ReactNode;
}

export function For<T>(props: ForProps<T>): React.ReactElement | null {
  return <React.Fragment>{props.items.map(props.children)}</React.Fragment>;
}

For.__ControlStatement = Symbol('For');

export type SingleOrArray<T> = T | T[];

export interface ChooseProps {
  children: React.ReactNode;
}

export function Choose(props: ChooseProps): React.ReactElement | null {
  const children = React.Children.toArray(props.children);

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (
      React.isValidElement<WhenProps>(child) &&
      (child.type as typeof When).__ControlStatement === When.__ControlStatement &&
      child.props.condition
    ) {
      return <React.Fragment>{child}</React.Fragment>;
    }

    if (
      React.isValidElement<OtherWiseProps>(child) &&
      (child.type as typeof Otherwise).__ControlStatement === Otherwise.__ControlStatement
    ) {
      return <React.Fragment>{child}</React.Fragment>;
    }
  }

  return null;
}

Choose.__ControlStatement = Symbol('Choose');

export interface WhenProps {
  condition: boolean;
  children: React.ReactNode;
}

export function When(props: WhenProps): React.ReactElement | null {
  return props.condition ? <React.Fragment>{props.children}</React.Fragment> : null;
}

When.__ControlStatement = Symbol('When');

export interface OtherWiseProps {
  children: React.ReactNode;
}

export function Otherwise(props: OtherWiseProps): React.ReactElement | null {
  return <React.Fragment>{props.children}</React.Fragment>;
}

Otherwise.__ControlStatement = Symbol('Otherwise');
