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

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async () => {
    try {
      const res = await API.post("/authRoutes/register", {
        name,
        email,
        password,
        role: "customer"
      });

      console.log("REGISTERED:", res.data);

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/image.png")}
      style={styles.container}
    >

      <View style={styles.card}>

        <Text style={styles.title}>Create Account ☕</Text>

        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="#888"
        />

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

        <TouchableOpacity
          style={styles.registerBtn}
          onPress={handleRegister}
        >
          <Text style={styles.btnText}>Register</Text>
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

  registerBtn: {
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
  }
});