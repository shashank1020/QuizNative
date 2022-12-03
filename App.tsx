import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screen/Login';
import SignupScreen from './src/screen/SignUp';
import Dashboard from './src/screen/Dashboard';
import PlayQuiz from './src/screen/PlayQuiz';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CreateQuiz from './src/screen/Create';
import { useAppSelector } from './src/app/hooks';
import { currentUser } from './src/features/quiz/quizSlice';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const User = useAppSelector(currentUser);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Drawer"
          component={Root}
          options={{ headerShown: false }}
        />
        {User.email !== '' && <Stack.Screen name="Edit" component={CreateQuiz} />}
        <Stack.Screen name="PlayQuiz" component={PlayQuiz} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

function Root() {
  const User = useAppSelector(currentUser);
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      {User.email !== '' && (
        <Drawer.Screen
          name="MyQuiz"
          component={Dashboard}
          options={{ headerShown: true }}
        />
      )}
      {User.email !== '' && (
        <Drawer.Screen name="Create" component={CreateQuiz} />
      )}
    </Drawer.Navigator>
  );
}
