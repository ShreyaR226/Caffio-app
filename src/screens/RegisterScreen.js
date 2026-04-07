import { View, Text, TextInput, Button } from "react-native";
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
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text>Register</Text>
        <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ borderWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}