import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import { CartContext } from "../context/CartContext";

export default function MenuScreen({ navigation }) {
  const [menu, setMenu] = useState([]);
  const { cart, addToCart, favorites, toggleFavorite, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await API.get("/menu");
        setMenu(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchMenu();
  }, []);

  const isFavorite = (id) => favorites.some(item => item._id === id);
  const getQuantity = (id) => {
    const item = cart.find(i => i._id === id);
    return item ? item.quantity : 0;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menu}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Image Section with Heart Overlay */}
            <View>
              <Image source={{ uri: item.image }} style={styles.image} />
              <TouchableOpacity 
                style={styles.favOverlay} 
                onPress={() => toggleFavorite(item)}
              >
                <Text style={{ fontSize: 18 }}>{isFavorite(item._id) ? "❤️" : "🤍"}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              <View style={styles.headerRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.category}>{item.category}</Text>
                </View>
                <Text style={styles.price}>₹{item.price}</Text>
              </View>
              
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>

              {/* Action Buttons Row */}
              <View style={styles.actionRow}>
                {getQuantity(item._id) === 0 ? (
                  <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                    <Text style={styles.addButtonText}>Add to Cart 🛒</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => removeFromCart(item)}>
                      <Text style={styles.qtyBtnText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{getQuantity(item._id)}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => addToCart(item)}>
                      <Text style={styles.qtyBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}
      />

      {/* Floating Footer Button */}
      <TouchableOpacity 
        style={styles.footerButton} 
        onPress={() => navigation.navigate("Orders")}
      >
        <Text style={styles.footerButtonText}>View My Orders</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF8F5", // Soft Cream Background
    padding: 15,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#5D4037",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EFEBE9",
  },
  image: {
    width: "100%",
    height: 160,
  },
  favOverlay: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 8,
    borderRadius: 20,
    elevation: 2,
  },
  content: {
    padding: 15,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3E2723", // Dark Roast Brown
  },
  category: {
    fontSize: 12,
    color: "#8D6E63", // Muted Latte Brown
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6D4C41", 
  },
  description: {
    fontSize: 13,
    color: "#795548",
    marginVertical: 10,
    lineHeight: 18,
  },
  actionRow: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  addButton: {
    backgroundColor: "#6D4C41", // Medium Brown
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFEBE9",
    borderRadius: 12,
    padding: 4,
  },
  qtyBtn: {
    backgroundColor: "#FFF",
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3E2723",
  },
  qtyText: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: "bold",
    color: "#3E2723",
  },
  footerButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#3E2723",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  footerButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});