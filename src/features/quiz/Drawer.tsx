import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from "../../screen/Login";
import Dashboard from "../../screen/Dashboard";

const Drawer = createDrawerNavigator();

const AvatarDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Create" component={Dashboard} />
      <Drawer.Screen name="MyQuiz" component={LoginScreen} />
    </Drawer.Navigator>
  )
}

export default AvatarDrawer;
