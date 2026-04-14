import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../services/api";

export default function PaymentScreen({ navigation }) {
  const { cart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      const formattedItems = cart.map(item => ({
        menuItem: item._id,
        quantity: item.quantity
      }));

      await API.post(
        "/order",
        {
          customerId: userId,
          items: formattedItems,
          totalAmount: total,
          paymentStatus: "Paid"
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Order Placed 🎉");
      clearCart();
      navigation.replace("CustomerHome");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Checkout 💳</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* QR Section */}
        <View style={styles.qrCard}>
          <Text style={styles.qrText}>Scan to Pay</Text>
          <View style={styles.qrPlaceholder}>
            {/* You can replace this View with an actual QR Image component later */}
            <Text style={styles.qrIcon}>📱</Text>
          </View>
          <Text style={styles.merchantName}>Caffio Cafe</Text>
        </View>

        {/* Payment Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={styles.value}>₹{total}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Platform Fee</Text>
            <Text style={styles.value}>₹0</Text>
          </View>
          
          <View style={[styles.divider, { marginVertical: 15 }]} />
          
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Amount to Pay</Text>
            <Text style={styles.totalValue}>₹{total}</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Confirm & Pay ₹{total}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Cancel Transaction</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF8F5", // Cream
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3E2723",
    marginTop: 40,
    marginBottom: 20,
    textAlign: "center",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  qrCard: {
    backgroundColor: "#FFF",
    borderRadius: 25,
    padding: 30,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#EFEBE9",
    elevation: 3,
  },
  qrText: {
    fontSize: 18,
    color: "#5D4037",
    fontWeight: "600",
    marginBottom: 20,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#D7CCC8",
    borderStyle: "dashed",
  },
  qrIcon: {
    fontSize: 50,
  },
  merchantName: {
    marginTop: 15,
    fontSize: 14,
    color: "#8D6E63",
    fontWeight: "500",
  },
  summaryCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#EFEBE9",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3E2723",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#F5F5F5",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  label: {
    color: "#8D6E63",
    fontSize: 14,
  },
  value: {
    color: "#3E2723",
    fontWeight: "500",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3E2723",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6D4C41",
  },
  payButton: {
    backgroundColor: "#3E2723", // Dark Roast
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  payButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 15,
    paddingVertical: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#8D6E63",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});