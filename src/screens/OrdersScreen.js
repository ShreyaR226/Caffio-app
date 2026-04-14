import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../services/api";

export default function OrdersScreen({ navigation }) {
  const { cart } = useContext(CartContext);
  const [orders, setOrders] = useState([]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/order/myorders");
      setOrders(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Placed": return { color: "#8D6E63", bg: "#EFEBE9" }; // Latte
      case "Preparing": return { color: "#AF601A", bg: "#FBEEE6" }; // Roasted
      case "Ready": return { color: "#1E88E5", bg: "#E3F2FD" }; // Blue
      case "Completed": return { color: "#2E7D32", bg: "#E8F5E9" }; // Green
      default: return { color: "#3E2723", bg: "#F5F5F5" };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Your Orders 🧾</Text>

      {/* --- CURRENT CART SECTION --- */}
      {cart.length > 0 && (
        <View style={styles.cartCard}>
          <Text style={styles.sectionTitle}>Current Selection 🛒</Text>
          <View style={styles.divider} />
          {cart.map((item, index) => (
            <View key={index} style={styles.cartItemRow}>
              <Text style={styles.cartItemText}>{item.name} x {item.quantity}</Text>
              <Text style={styles.cartItemPrice}>₹{item.price * item.quantity}</Text>
            </View>
          ))}
          <View style={[styles.divider, { marginTop: 10 }]} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalAmount}>₹{total}</Text>
          </View>
          <TouchableOpacity 
            style={styles.payButton}
            onPress={() => navigation.navigate("Payment")}
          >
            <Text style={styles.payButtonText}>Proceed to Payment 💳</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* --- PREVIOUS ORDERS --- */}
      <Text style={[styles.sectionTitle, { marginLeft: 5, marginBottom: 15 }]}>
        Order History 📦
      </Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          const statusColors = getStatusStyle(item.status);
          return (
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>ID: #{item._id.slice(-6).toUpperCase()}</Text>
                <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
                  <Text style={[styles.statusText, { color: statusColors.color }]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={styles.itemContainer}>
                {item.items.map((i, index) => (
                  <Text key={index} style={styles.historyItemText}>
                    • {i.menuItem?.name} <Text style={{fontWeight: 'bold'}}>x{i.quantity}</Text>
                  </Text>
                ))}
              </View>

              <View style={styles.orderFooter}>
                <Text style={styles.historyTotal}>Amount Paid: ₹{item.totalAmount}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF8F5", // Cream
    padding: 15,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#3E2723",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#5D4037",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cartCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    elevation: 4,
    shadowColor: "#3E2723",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#D7CCC8",
  },
  divider: {
    height: 1,
    backgroundColor: "#EFEBE9",
    marginVertical: 10,
  },
  cartItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  cartItemText: {
    color: "#5D4037",
    fontSize: 15,
  },
  cartItemPrice: {
    color: "#3E2723",
    fontWeight: "600",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3E2723",
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6D4C41",
  },
  payButton: {
    backgroundColor: "#6D4C41",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  payButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  orderCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: "#D7CCC8",
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  orderId: {
    fontSize: 12,
    color: "#8D6E63",
    fontWeight: "bold",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  itemContainer: {
    marginVertical: 5,
  },
  historyItemText: {
    fontSize: 14,
    color: "#5D4037",
    marginBottom: 2,
  },
  orderFooter: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  historyTotal: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3E2723",
  },
});