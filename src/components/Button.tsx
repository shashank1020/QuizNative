import { StyleSheet, TouchableOpacity } from 'react-native';
import { P1 } from '../assest/Typography';

interface ButtonProps {
  onPress: any;
  title: string;
  color: 'primary' | 'secondary' | 'error' | 'link';
}

const colorTheme = (color: string) =>
  color === 'primary'
    ? 'blue'
    : color === 'secondary'
    ? 'green'
    : color === 'error'
    ? 'red'
    : '';

const Button = ({ onPress, title, color }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.appButtonContainer, { backgroundColor: colorTheme(color) }]}>
    <P1
      textDecorationLine={color === 'link' ? 'underline' : 'none'}
      style={[
        styles.appButtonText,
        { color: color === 'link' ? 'black' : 'white' },
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
