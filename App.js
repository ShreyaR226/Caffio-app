import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import CustomerHome from "./src/screens/CustomerHome";
import StaffTabNavigator from "./src/navigation/StaffTabNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
  name="Login"
  component={LoginScreen}
  options={{ headerShown: false }}
/>

<Stack.Screen
  name="Register"
  component={RegisterScreen}
  options={{ headerShown: false }}
/>
        <Stack.Screen name="CustomerHome" component={CustomerHome} />

        <Stack.Screen
          name="StaffHome"
          component={StaffTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}