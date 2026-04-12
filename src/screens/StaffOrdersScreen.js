import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../services/api";

export default function StaffHomeScreen() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await API.get("/staff/assigned-orders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrders(res.data.assignedOrders || []);

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = await AsyncStorage.getItem("token");

      await API.patch(
        "/staff/update-status",
        {
          orderId: id,
          status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchOrders();

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const completedOrders = orders.filter(
    (item) => item.status === "Completed"
  ).length;

  return (
    <View style={styles.container}>

      <Text style={styles.welcome}>hello staff </Text>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{orders.length}</Text>
          <Text>Orders Assigned</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{completedOrders}</Text>
          <Text>Orders Completed</Text>
        </View>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <View style={styles.cardHeader}>
              <Text style={styles.orderTitle}>
                Order #{item._id.slice(-4)}
              </Text>
            </View>

            <View style={styles.cardBody}>

              {item.items.map((menu, index) => (
                <Text key={index} style={styles.itemText}>
                  {menu.quantity} x {menu.menuItem?.name}
                </Text>
              ))}

              <Text style={styles.statusText}>
                Status: {item.status}
              </Text>

              {item.status === "Assigned" && (
                <TouchableOpacity
                  style={styles.prepareBtn}
                  onPress={() =>
                    updateStatus(item._id, "Preparing")
                  }
                >
                  <Text style={styles.btnText}>Preparing</Text>
                </TouchableOpacity>
              )}

              {item.status === "Preparing" && (
                <TouchableOpacity
                  style={styles.readyBtn}
                  onPress={() =>
                    updateStatus(item._id, "Ready")
                  }
                >
                  <Text style={styles.btnText}>Ready</Text>
                </TouchableOpacity>
              )}

              {item.status === "Ready" && (
                <TouchableOpacity
                  style={styles.completeBtn}
                  onPress={() =>
                    updateStatus(item._id, "Completed")
                  }
                >
                  <Text style={styles.btnText}>Completed</Text>
                </TouchableOpacity>
              )}

              {item.status === "Completed" && (
                <Text style={styles.completedText}>
                  Order Completed
                </Text>
              )}

            </View>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F1E8",
    padding: 15
  },

  welcome: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6F4E37",
    textAlign: "center",
    marginVertical: 20
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },

  summaryCard: {
    backgroundColor: "#fff",
    width: "48%",
    padding: 15,
    borderRadius: 15,
    elevation: 4
  },

  summaryNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#A67B5B"
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 4
  },

  cardHeader: {
    backgroundColor: "#A67B5B",
    padding: 15
  },

  orderTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"
  },

  cardBody: {
    padding: 15
  },

  itemText: {
    fontSize: 16,
    marginBottom: 8
  },

  statusText: {
    marginBottom: 12,
    color: "#6F4E37"
  },

  prepareBtn: {
    backgroundColor: "#C8A27A",
    padding: 12,
    borderRadius: 10
  },

  readyBtn: {
    backgroundColor: "#6F4E37",
    padding: 12,
    borderRadius: 10
  },

  completeBtn: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 10
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  },

  completedText: {
    color: "green",
    textAlign: "center",
    fontWeight: "bold"
  }
});