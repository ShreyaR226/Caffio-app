import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MenuScreen from "./MenuScreen";
import FavoritesScreen from "./FavoritesScreen";
import OrdersScreen from "./OrdersScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

export default function CustomerTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}