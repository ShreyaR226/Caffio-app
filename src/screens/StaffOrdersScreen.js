import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../services/api";
import bgImage from "../../assets/image.png";

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
    <SafeAreaView style={styles.container}>

      <Text style={styles.welcome}>What's Brewing Today? ☕</Text>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{orders.length}</Text>
          <Text style={styles.summaryLabel}>Orders Assigned</Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{completedOrders}</Text>
          <Text style={styles.summaryLabel}>Orders Completed</Text>
        </View>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <ImageBackground
              source={bgImage}
              style={styles.cardHeader}
              imageStyle={styles.headerImage}
            >
              <Text style={styles.orderTitle}>
                Order #{item._id.slice(-4)}
              </Text>
            </ImageBackground>

            <View style={styles.cardBody}>

              {item.items.map((menu, index) => (
                <View key={index} style={styles.itemBox}>
                  <Text style={styles.itemText}>
                    {menu.quantity} x {menu.menuItem?.name}
                  </Text>
                </View>
              ))}

              <View style={styles.statusBox}>
                <Text style={styles.statusText}>
                  Status: {item.status}
                </Text>
              </View>

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

   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#F7F1E8",
  padding: 15,
  paddingTop: 20
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
    elevation: 4,
    alignItems: "center",
    justifyContent: "center"
  },

  summaryNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#A67B5B",
    textAlign: "center"
  },

  summaryLabel: {
    textAlign: "center",
    fontWeight: "600",
    color: "#4B2E2B",
    marginTop: 5
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 4
  },

  cardHeader: {
    padding: 15,
    justifyContent: "center"
  },

  headerImage: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18
  },

  orderTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start"
  },

  cardBody: {
    padding: 15
  },

  itemBox: {
    backgroundColor: "#F3E9DC",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8
  },

  itemText: {
    fontSize: 16,
    color: "#4B2E2B",
    fontWeight: "600"
  },

  statusBox: {
    backgroundColor: "#E8D8C3",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 12,
    marginTop: 5
  },

  statusText: {
    color: "#6F4E37",
    fontWeight: "bold",
    fontSize: 15
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
    fontWeight: "bold",
    fontSize: 15
  },

  completedText: {
    color: "green",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15
  }
});