import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useState } from 'react';
import { signUp } from '../API/ApiService';
import { ErrAlert, validateEmail, validatePassword } from '../app/validation';
import Button from '../components/Button';
import Card from '../components/Card';
import CTextInput from "../components/TextInput";

const SignupScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = () => {
    if (validateEmail(email) && validatePassword(password)) {
      signUp({ email, name, password })
        .then(() => {
          Alert.alert('sign up success');
          navigation.navigate('Login');
        })
        .catch(ErrAlert);
    }
  };
  return (
    <View style={{ alignItems: 'center' }}>
      <StatusBar />
      <SafeAreaView>
        <Card>
          <CTextInput
            value={name}
            setValue={setName}
            placeholder={'Enter Name'}
          />
          <CTextInput
            value={email}
            setValue={setEmail}
            placeholder={'Enter Email'}
          />
          <CTextInput
            value={password}
            setValue={setPassword}
            placeholder={'Enter Password'}
            isPassword
          />

          <Button
            title={'Sign Up Now'}
            onPress={handleSignup}
            color="secondary"
          />
        </Card>
        <Button
          title={'Dont have Account? \n Sign up here '}
          onPress={() => navigation.navigate('Login')}
          color="link"
        />
      </SafeAreaView>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    width: 250,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#bbbbf3',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
});
