import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Switch, Alert } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation }) {
  const [userName, setUserName] = useState("Guest");
  const [userEmail, setUserEmail] = useState("guest@cafe.com");
  const [notifications, setNotifications] = useState(true);
  
  // Rating & Feedback State
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const loadLocalData = async () => {
      const name = await AsyncStorage.getItem("userName"); 
      const email = await AsyncStorage.getItem("userEmail");
      if (name) setUserName(name);
      if (email) setUserEmail(email);
    };
    loadLocalData();
  }, []);

  const handleFeedbackSubmit = () => {
    if (rating === 0) {
      Alert.alert("Wait!", "Please select a star rating before submitting.");
      return;
    }
    
    // Simulate a successful submission
    Alert.alert(
      "Feedback Received 🎉",
      "Thanks for your feedback! We're always working to brew a better experience for you.",
      [{ text: "You're Welcome", onPress: () => {
        setFeedback(""); // Clear text
        setRating(0);    // Reset stars
      }}]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* 1. Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{userName[0]?.toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{userName}</Text>
        <Text style={styles.email}>{userEmail}</Text>
      </View>

      {/* 2. Feedback & Rating Section */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Rate Your Coffee ☕</Text>
        <View style={styles.starRow}>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity key={num} onPress={() => setRating(num)}>
              <Text style={[styles.star, { color: rating >= num ? "#AF601A" : "#D7CCC8" }]}>
                ★
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TextInput
          style={styles.feedbackInput}
          placeholder="Share your thoughts with us..."
          placeholderTextColor="#A1887F"
          multiline
          numberOfLines={3}
          value={feedback}
          onChangeText={setFeedback}
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleFeedbackSubmit}>
          <Text style={styles.submitBtnText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>

      {/* 3. Cafe Rewards (Visual Only) */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Bean Rewards</Text>
        <Text style={styles.subText}>6/10 Beans collected for a free Cookie!</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '60%' }]} />
        </View>
      </View>

      {/* 4. Settings */}
      <View style={styles.section}>
        <Text style={styles.label}>Preferences</Text>
        <View style={styles.row}>
          <Text style={styles.rowText}>Order Notifications</Text>
          <Switch 
            value={notifications} 
            onValueChange={setNotifications}
            trackColor={{ false: "#D7CCC8", true: "#6D4C41" }}
            thumbColor={notifications ? "#3E2723" : "#F4F3F4"}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.logout} 
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.logoutText}>Logout from Brew & Beans</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDF8F5" },
  header: { alignItems: "center", paddingVertical: 40, backgroundColor: "#3E2723", borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#8D6E63", justifyContent: "center", alignItems: "center", marginBottom: 10, borderWidth: 2, borderColor: "#FFF" },
  avatarText: { color: "#FFF", fontSize: 32, fontWeight: "bold" },
  name: { color: "#FFF", fontSize: 22, fontWeight: "bold" },
  email: { color: "#D7CCC8", fontSize: 14, marginTop: 4 },
  
  sectionCard: { backgroundColor: "#FFF", marginHorizontal: 20, marginTop: 20, padding: 20, borderRadius: 20, elevation: 3, shadowColor: "#3E2723", shadowOpacity: 0.1, shadowRadius: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#3E2723", marginBottom: 10 },
  subText: { fontSize: 12, color: "#8D6E63", marginBottom: 10 },
  
  starRow: { flexDirection: "row", justifyContent: "center", marginBottom: 15 },
  star: { fontSize: 35, marginHorizontal: 4 },
  
  feedbackInput: { backgroundColor: "#FDF8F5", borderRadius: 12, padding: 12, textAlignVertical: "top", color: "#3E2723", fontSize: 14, borderSize: 1, borderColor: "#EFEBE9" },
  submitBtn: { backgroundColor: "#6D4C41", marginTop: 15, padding: 14, borderRadius: 12, alignItems: "center" },
  submitBtnText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },
  
  progressBar: { height: 8, backgroundColor: "#EFEBE9", borderRadius: 4 },
  progressFill: { height: 8, backgroundColor: "#AF601A", borderRadius: 4 },
  
  section: { paddingHorizontal: 20, marginTop: 25 },
  label: { color: "#8D6E63", fontSize: 12, fontWeight: "bold", textTransform: "uppercase", marginBottom: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FFF", padding: 15, borderRadius: 15 },
  rowText: { color: "#3E2723", fontWeight: "600" },
  
  logout: { marginVertical: 30, alignItems: "center" },
  logoutText: { color: "#AF601A", fontWeight: "bold", textDecorationLine: "underline" }
});