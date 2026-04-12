import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import API from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
 const navigation = useNavigation();

const handleLogin = async () => {
  try {
   console.log("clicked button")
    let endpoint = "/authRoutes/login";

    if (role === "staff") {
      endpoint = "/authRoutes/loginStaff";
    }

    const res = await API.post(endpoint, {
      email,
      password,
      role
    });

    const token = res.data.token;
    const roleFromBackend = res.data.role;

    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("role", roleFromBackend);

    if (roleFromBackend === "customer") {
      navigation.replace("CustomerHome");
    } else if (roleFromBackend === "staff") {
      navigation.replace("StaffHome");
    }

    console.log("Saved token");

  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
  }
};

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
    <TextInput
  placeholder="Role (admin/staff/customer)"
  value={role}
  onChangeText={setRole}
  style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
/>
      <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Register" onPress={() => navigation.navigate("Register")} />
    </View>
  );
}