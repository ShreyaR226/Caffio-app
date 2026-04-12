import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default function StaffHomeScreen() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
	try {
	  const response = await fetch("http://YOUR_IP:5000/api/order/staff", {
		headers: {
		  Authorization: "Bearer YOUR_TOKEN"
		}
	  });

	  const data = await response.json();
	  setOrders(data);
	} catch (error) {
	  console.log(error);
	}
  };

  useEffect(() => {
	fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
	try {
	  await fetch(`http://YOUR_IP:5000/api/order/${id}/status`, {
		method: "PATCH",
		headers: {
		  "Content-Type": "application/json",
		  Authorization: "Bearer YOUR_TOKEN"
		},
		body: JSON.stringify({ status })
	  });

	  fetchOrders();
	} catch (error) {
	  console.log(error);
	}
  };

  return (
	<View style={styles.container}>
	  <FlatList
		data={orders}
		keyExtractor={(item) => item._id}
		renderItem={({ item }) => (
		  <View style={styles.card}>
			<Text>Order ID: {item._id}</Text>
			<Text>Status: {item.status}</Text>
			<Text>Total: ₹{item.totalAmount}</Text>

			<TouchableOpacity
			  style={styles.button}
			  onPress={() => updateStatus(item._id, "Preparing")}
			>
			  <Text>Preparing</Text>
			</TouchableOpacity>

			<TouchableOpacity
			  style={styles.button}
			  onPress={() => updateStatus(item._id, "Ready")}
			>
			  <Text>Ready</Text>
			</TouchableOpacity>

			<TouchableOpacity
			  style={styles.button}
			  onPress={() => updateStatus(item._id, "Completed")}
			>
			  <Text>Completed</Text>
			</TouchableOpacity>
		  </View>
		)}
	  />
	</View>
  );
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	padding: 20
  },
  card: {
	backgroundColor: "#fff",
	padding: 15,
	marginBottom: 15,
	borderRadius: 10
  },
  button: {
	backgroundColor: "#ddd",
	padding: 10,
	marginTop: 8,
	borderRadius: 8
  }
});