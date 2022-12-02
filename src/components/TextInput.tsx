import { FlexStyle, StyleProp, StyleSheet, TextInput } from 'react-native';
import { Dispatch, SetStateAction } from 'react';

interface CTextInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  style?: StyleProp<FlexStyle>;
  placeholder?: string;
  isPassword?: boolean;
}

const CTextInput = ({
  value,
  setValue,
  style,
  placeholder,
  isPassword = false,
}: CTextInputProps) => (
  <TextInput
    style={[styles.input, style]}
    onChangeText={setValue}
    value={value}
    placeholder={placeholder ?? ''}
    autoCapitalize={'none'}
    secureTextEntry={isPassword}
  />
);

export default CTextInput;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    width: 250,
  },
});
