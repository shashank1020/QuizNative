import { Alert, SafeAreaView, StyleSheet } from "react-native";
import { useState } from 'react';
import { validateEmail, validatePassword } from '../app/validation';
import { doLogin } from '../features/quiz/quizSlice';
import { useAppDispatch } from '../app/hooks';
import { loginUser } from '../API/ApiService';
import Button from '../components/Button';
import Card from '../components/Card';
import TextInput from '../components/TextInput';

const LoginScreen = (props: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const handleLogin = () => {
    if (validateEmail(email) && validatePassword(password)) {
      loginUser({ email, password })
        .then(data => {
          dispatch(doLogin(data));
          props.navigation.navigate('Dashboard');
        })
        .catch(() => Alert.alert('Either email or password is incorrect'));
    }
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Card>
        <TextInput
          style={styles.input}
          value={email}
          setValue={setEmail}
          placeholder={'Enter Email'}
        />
        <TextInput
          style={styles.input}
          value={password}
          setValue={setPassword}
          placeholder={'Enter Password'}
          isPassword
        />
        <Button title={'Login'} onPress={handleLogin} color="primary" />
      </Card>
      <Button
        title={'Dont have Account? \n Sign up here '}
        onPress={() => props.navigation.navigate('SignUp')}
        color="link"
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    width: 250,
  },
});
