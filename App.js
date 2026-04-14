import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
// import CustomerHome from "./src/screens/CustomerHome";
import StaffHome from "./src/screens/StaffHome";
import CustomerTabs from "./src/screens/CustomerTabs";
import PaymentScreen from "./src/screens/PaymentScreen";
import { CartProvider } from "./src/context/CartContext";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
       <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="CustomerHome" component={CustomerTabs} />
      <Stack.Screen name="StaffHome" component={StaffHome} />
       <Stack.Screen name="Payment" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}