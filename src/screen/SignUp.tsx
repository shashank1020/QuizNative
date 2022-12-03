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
import CTextInput from '../components/TextInput';

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
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card>
        <CTextInput
          style={styles.input}
          value={name}
          setValue={setName}
          placeholder={'Enter Name'}
        />
        <CTextInput
          style={styles.input}
          value={email}
          setValue={setEmail}
          placeholder={'Enter Email'}
        />
        <CTextInput
          style={styles.input}
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
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  input: {
    width: 250,
  },
});
