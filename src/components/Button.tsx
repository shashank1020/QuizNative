import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

interface ButtonProps {
  onPress: any;
  title: string;
  color: 'primary' | 'secondary' | 'error' | 'link' | 'link-blue';
  style?: StyleProp<FlexStyle>;
  textStyle?: StyleProp<FlexStyle>;
  disabled?: boolean;
}

const colorTheme = (color: string) =>
  color === 'primary'
    ? 'blue'
    : color === 'secondary'
    ? 'green'
    : color === 'error'
    ? 'red'
    : '';

const textTheme = (color: string) =>
  color === 'link' ? 'black' : color === 'link-blue' ? 'blue' : 'white';

const Button = ({
  onPress,
  title,
  color,
  style,
  textStyle,
  disabled,
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={[
      { backgroundColor: disabled ? 'lightgray' : colorTheme(color) },
      styles.appButtonContainer,
      style,
    ]}>
    <Text
      style={[
        styles.appButtonText,
        {
          color: textTheme(color),
          textDecorationLine: color === 'link' ? 'underline' : 'none',
        },
        textStyle,
      ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
  },
  appButtonText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontSize: 16,
    lineHeight: 28,
  },
});
