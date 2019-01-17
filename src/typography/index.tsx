// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { componentFactory } from '@rmwc/base';

export type TypographyPropsT = {
  /* prettier-ignore */
  /** The typography style.*/
  use: 'headline1' | 'headline2' | 'headline3' | 'headline4' | 'headline5' | 'headline6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button' | 'overline'
};

/** The Typography Component */
export const Typography = componentFactory<TypographyPropsT>({
  displayName: 'Typography',
  tag: 'span',
  classNames: (props: TypographyPropsT) => [
    {
      [`mdc-typography--${props.use}`]: props.use
    }
  ],
  consumeProps: ['use']
});
