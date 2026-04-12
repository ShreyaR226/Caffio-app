import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import StaffOrdersScreen from "../screens/StaffOrdersScreen";
import StaffAttendanceScreen from "../screens/StaffAttendanceScreen";
import StaffProfileScreen from "../screens/StaffProfileScreen";

const Tab = createBottomTabNavigator();

export default function StaffTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: "#F5EFE6"
        },
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 22,
          color: "#6F4E37"
        },
        tabBarStyle: {
          backgroundColor: "#ffffff",
          height: 65,
          borderTopWidth: 0,
          elevation: 8
        },
        tabBarActiveTintColor: "#6F4E37",
        tabBarInactiveTintColor: "#999",

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Attendance") {
            iconName = "calendar";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={StaffOrdersScreen} />
      <Tab.Screen name="Attendance" component={StaffAttendanceScreen} />
      <Tab.Screen name="Profile" component={StaffProfileScreen} />
    </Tab.Navigator>
  );
}