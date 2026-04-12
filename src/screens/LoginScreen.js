import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet
} from "react-native";
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
      console.log("clicked button");

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
    <ImageBackground
      source={require("../../assets/image.png")}
      style={styles.container}
    >

      <View style={styles.card}>

        <Text style={styles.title}>Cafe Login ☕</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="Role (admin/staff/customer)"
          value={role}
          onChangeText={setRole}
          style={styles.input}
          placeholderTextColor="#888"
        />

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
        >
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerText}>
            Go to Register
          </Text>
        </TouchableOpacity>

      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 20,
    padding: 25,
    elevation: 6
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6F4E37",
    textAlign: "center",
    marginBottom: 25
  },

  input: {
    backgroundColor: "#F7F1E8",
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    fontSize: 16
  },

  loginBtn: {
    backgroundColor: "#6F4E37",
    padding: 15,
    borderRadius: 12,
    marginTop: 10
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold"
  },

  registerBtn: {
    marginTop: 15
  },

  registerText: {
    color: "#6F4E37",
    textAlign: "center",
    fontWeight: "bold"
  }
});