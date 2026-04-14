import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from "./src/screens/SplashScreen";
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import CustomerTabs from "./src/screens/CustomerTabs";
import PaymentScreen from "./src/screens/PaymentScreen";
import { CartProvider } from "./src/context/CartContext";
import StaffTabNavigator from "./src/navigation/StaffTabNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>
     
    
      <Stack.Navigator initialRouteName="Splash">

        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

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

         <Stack.Screen name="CustomerHome" component={CustomerTabs} />

        <Stack.Screen
          name="StaffHome"
          component={StaffTabNavigator}
          options={{ headerShown: false }}
        />

         <Stack.Screen name="Payment" component={PaymentScreen} />
         
         </Stack.Navigator>

    
    </NavigationContainer>
    </CartProvider>
  );
}