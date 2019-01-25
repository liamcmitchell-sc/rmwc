import * as React from 'react';

import { componentFactory, ComponentProps } from '@rmwc/base';
import { withRipple, WithRippleProps } from '@rmwc/ripple';
import { Icon, IconProps, IconPropT } from '@rmwc/icon';

export interface ListItemProps extends WithRippleProps {
  /** A modifier for a selected state. */
  selected?: boolean;
  /** A modifier for an active state. */
  activated?: boolean;
  /** A modifier for a disabled state. */
  disabled?: boolean;
}

/**
 * The ListItem component.
 */
export const ListItem = withRipple({ surface: false })(
  componentFactory<ListItemProps>({
    displayName: 'ListItem',
    defaultProps: {
      tabIndex: 0
    },
    classNames: (props: ListItemProps) => [
      'mdc-list-item',
      {
        'mdc-list-item--selected': props.selected,
        'mdc-list-item--activated': props.activated,
        'mdc-list-item--disabled': props.disabled
      }
    ],
    consumeProps: ['selected', 'activated', 'disabled', 'options'] //options is from the select element
  })
);

/** Text Wrapper for the ListItem */
export const ListItemText = componentFactory<{}>({
  displayName: 'ListItemText',
  tag: 'span',
  classNames: ['mdc-list-item__text']
});

/** Primary Text for the ListItem */
export const ListItemPrimaryText = componentFactory<{}>({
  displayName: 'ListItemPrimaryText',
  tag: 'span',
  classNames: ['mdc-list-item__primary-text']
});

/** Secondary text for the ListItem */
export const ListItemSecondaryText = componentFactory<{}>({
  displayName: 'ListItemSecondaryText',
  tag: 'span',
  classNames: ['mdc-list-item__secondary-text']
});

export interface ListItemGraphicProps extends IconProps {}

/** A graphic / icon for the ListItem */
export const ListItemGraphic = componentFactory<ListItemGraphicProps>({
  displayName: 'ListItemGraphic',
  classNames: ['mdc-list-item__graphic'],
  tag: Icon
});

export interface ListItemMetaProps extends IconProps {}

/** A meta icon for the ListItem.*/
export const ListItemMeta = componentFactory<ListItemMetaProps>({
  displayName: 'ListItemMeta',
  classNames: ['mdc-list-item__meta'],
  tag: Icon
});

/** Meta text for the ListItem. This should be used as an alternative to ListItemMeta which is an icon.*/
export const ListItemMetaText = componentFactory<{}>({
  displayName: 'ListItemMetaText',
  classNames: ['mdc-list-item__meta'],
  tag: 'span'
});

/** A container to group ListItems */
export const ListGroup = componentFactory<{}>({
  displayName: 'ListGroup',
  classNames: ['mdc-list-group']
});

/** A subheader for the ListGroup */
export const ListGroupSubheader = componentFactory<{}>({
  displayName: 'ListGroupSubheader',
  classNames: ['mdc-list-group__subheader']
});

/** A divider for the List */
export const ListDivider = componentFactory<{}>({
  displayName: 'ListDivider',
  classNames: ['mdc-list-divider']
});

export interface SimpleListItemProps extends ListItemProps {
  /** Text for the ListItem. */
  text?: React.ReactNode;
  /** Secondary Text for the ListItem. */
  secondaryText?: React.ReactNode;
  /** A graphic icon for the ListItem. */
  graphic?: IconPropT;
  /** A meta icon for the ListItem */
  meta?: IconPropT;
  /** A metaText for the ListItem instead of an icon. */
  metaText?: React.ReactNode;
  /** Children to render */
  children?: React.ReactNode;
}

export const SimpleListItem = ({
  text,
  secondaryText,
  graphic,
  meta,
  metaText,
  children,
  ...rest
}: SimpleListItemProps & ComponentProps) => {
  const primaryTextToRender =
    text && secondaryText !== undefined ? (
      <ListItemPrimaryText>{text}</ListItemPrimaryText>
    ) : (
      text
    );

  const secondaryTextToRender =
    secondaryText !== undefined ? (
      <ListItemSecondaryText>{secondaryText}</ListItemSecondaryText>
    ) : null;

  return (
    <ListItem {...rest}>
      {graphic !== undefined && <ListItemGraphic icon={graphic} />}
      {secondaryTextToRender !== null ? (
        <ListItemText>
          {primaryTextToRender}
          {secondaryTextToRender}
        </ListItemText>
      ) : (
        primaryTextToRender
      )}
      {!!meta ? (
        <ListItemMeta icon={meta} />
      ) : !!metaText ? (
        <ListItemMetaText>{metaText}</ListItemMetaText>
      ) : null}
      {children}
    </ListItem>
  );
};

SimpleListItem.displayName = 'SimpleListItem';