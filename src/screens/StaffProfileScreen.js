import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../services/api";
import { ImageBackground } from "react-native";

export default function StaffProfileScreen({ navigation }) {
  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await API.get("/staff/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setStaff(res.data);
      setLoading(false);

    } catch (err) {
      console.log(err.response?.data || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role");

    navigation.replace("Login");
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

return (
  <ImageBackground
    source={require("../../assets/image.png")}
    style={{
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 20
    }}
  >

    <View
      style={{
        backgroundColor: "rgba(255,255,255,0.95)",
        borderRadius: 20,
        padding: 25,
        width: "100%",
        elevation: 6
      }}
    >

      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          color: "#6F4E37",
          marginBottom: 25,
          textAlign: "center"
        }}
      >
        {staff?.name}
      </Text>

      <View style={{ marginBottom: 15 }}>
        <Text style={{ color: "#888" }}>Email</Text>
        <Text style={{ fontSize: 17 }}>{staff?.email}</Text>
      </View>

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
          marginBottom: 15
        }}
      />

      <View style={{ marginBottom: 15 }}>
        <Text style={{ color: "#888" }}>Phone</Text>
        <Text style={{ fontSize: 17 }}>
          {staff?.personalDetails?.phoneNumber}
        </Text>
      </View>

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
          marginBottom: 15
        }}
      />

      <View style={{ marginBottom: 15 }}>
        <Text style={{ color: "#888" }}>Join Date</Text>
        <Text style={{ fontSize: 17 }}>
          {staff?.personalDetails?.joinDate?.split("T")[0]}
        </Text>
      </View>

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
          marginBottom: 15
        }}
      />

      <View style={{ marginBottom: 15 }}>
        <Text style={{ color: "#888" }}>Shift</Text>
        <Text style={{ fontSize: 17 }}>
          {staff?.personalDetails?.shift}
        </Text>
      </View>

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#eee",
          marginBottom: 20
        }}
      />

      <View style={{ marginBottom: 25 }}>
        <Text style={{ color: "#888" }}>Assigned Orders</Text>
        <Text style={{ fontSize: 17 }}>
          {staff?.assignedOrders?.length || 0}
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: "#6F4E37",
          padding: 15,
          borderRadius: 12
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>

    </View>

  </ImageBackground>
);
}