import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect } from "react";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 3550);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/coffee.json")}
        autoPlay
        loop={false}
        style={{
          width: 250,
          height: 250
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F1E8",
    justifyContent: "center",
    alignItems: "center"
  }
});