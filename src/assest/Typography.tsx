import React, { FunctionComponent } from 'react';
import {
  FlexStyle,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
} from 'react-native';
import { Core, Neutral } from './Color';
import { UNIT } from './Spacing';
import styled from 'styled-components/native';

export enum Weight {
  NORMAL = 400,
  MEDIUM = 500,
  SEMIBOLD = 600,
  BOLD = 700,
}

/**
 * This is annoying but styled-objecst take a number where as React's `style` prop takes a string
 */
const toFontWeight: Record<Weight, TextStyle['fontWeight']> = {
  [Weight.BOLD]: '700',
  [Weight.SEMIBOLD]: '600',
  [Weight.MEDIUM]: '500',
  [Weight.NORMAL]: '400',
};

export const Text = styled.Text({
  color: Neutral.N800,
});

type AllowedTextStyles =
  | 'color'
  | 'textDecorationLine'
  | 'textTransform'
  | 'textAlign';

interface HeaderTextProps extends Pick<TextStyle, AllowedTextStyles> {
  /**
   * paired down style prop so we can still add padding, etc.
   * Please use explicitly released properties for style in `AllowedTextStyles`
   */
  style?: StyleProp<FlexStyle>;
}

const HeaderText: FunctionComponent<HeaderTextProps> = ({
  style,
  children,
  ...passthrough
}) => {
  const styles = [style, passthrough];
  return <Text style={styles}>{children}</Text>;
};

export interface BaseTextProps extends HeaderTextProps {
  fontWeight?: Weight;
  onPress?: (event: GestureResponderEvent) => void;
  numberOfLines?: number | undefined;
}

const BaseText: FunctionComponent<BaseTextProps> = ({
  fontWeight = Weight.NORMAL,
  children,
  style,
  onPress,
  numberOfLines,
  ...passthrough
}) => {
  const weight = toFontWeight[fontWeight];

  const styles = [{ fontWeight: weight, ...passthrough }, style];
  return (
    <Text style={styles} onPress={onPress} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
};

export const B1 = styled(HeaderText)({
  fontSize: 60,
  lineHeight: 76,
  fontWeight: Weight.BOLD,
});

export const B2 = styled(HeaderText)({
  fontSize: 48,
  lineHeight: 64,
  fontWeight: Weight.BOLD,
});

export const H1 = styled(HeaderText)({
  fontSize: 36,
  lineHeight: 46,
  fontWeight: Weight.BOLD,
});

export const H2 = styled(HeaderText)({
  fontSize: 30,
  lineHeight: 38,
  fontWeight: Weight.BOLD,
});

export const H3 = styled(HeaderText)({
  fontSize: 22,
  lineHeight: 28,
  fontWeight: Weight.BOLD,
});

export const H4 = styled(HeaderText)({
  fontSize: 18,
  lineHeight: 23,
  fontWeight: Weight.BOLD,
});

export const H5 = styled(BaseText)({
  fontSize: 16,
  lineHeight: 22,
});

export const P1 = styled(BaseText)({
  fontSize: 16,
  lineHeight: 28,
});

export const P2 = styled(BaseText)({
  fontSize: 15,
  lineHeight: 20,
});

export const P3 = styled(BaseText)({
  fontSize: 14,
  lineHeight: 18,
});

export const P4 = styled(BaseText)({
  fontSize: 12,
  lineHeight: 15,
});

export const P5 = styled(BaseText)({
  fontSize: 10,
  lineHeight: 14,
});

export const Note = styled(BaseText)({
  fontSize: 12,
  lineHeight: 19,
});

export const Medium = styled.Text({
  fontWeight: Weight.MEDIUM,
});

export const SemiBold = styled.Text({
  fontWeight: Weight.SEMIBOLD,
});

export const Bold = styled.Text({
  fontWeight: Weight.BOLD,
});

export const Underline = styled.Text({
  textDecorationLine: 'underline',
  textDecorationStyle: 'solid',
});

export const PrimaryCTA = styled.Text({
  fontWeight: Weight.SEMIBOLD,
  color: Core.Primary.N100,
});

export const SecondaryCTA = styled(H5)({
  textAlign: 'center',
  marginVertical: UNIT * 6,
});
