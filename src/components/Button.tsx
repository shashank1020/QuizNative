import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { P1 } from '../assest/Typography';

interface ButtonProps {
  onPress: any;
  title: string;
  color: 'primary' | 'secondary' | 'error' | 'link' | 'link-blue';
  style?: StyleProp<FlexStyle>;
  textStyle?: StyleProp<FlexStyle>;
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

const Button = ({ onPress, title, color, style, textStyle }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.appButtonContainer,
      { backgroundColor: colorTheme(color) },
      style,
    ]}>
    <P1
      textDecorationLine={color === 'link' ? 'underline' : 'none'}
      style={[
        styles.appButtonText,
        {
          color: textTheme(color),
        },
        textStyle,
      ]}>
      {title}
    </P1>
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
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
