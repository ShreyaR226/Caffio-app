import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Your Favorites ❤️</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No favorites added yet.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.favCard}>
            <Image source={{ uri: item.image }} style={styles.favImage} />
            
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>₹{item.price}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>

            <TouchableOpacity 
              style={styles.removeBtn} 
              onPress={() => toggleFavorite(item)}
            >
              <Text style={styles.removeIcon}>✕</Text>
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
    backgroundColor: "#FDF8F5", // Cream background
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3E2723",
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  favCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginBottom: 15,
    padding: 10,
    alignItems: "center",
    shadowColor: "#5D4037",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#EFEBE9",
  },
  favImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#EFEBE9",
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3E2723",
  },
  price: {
    fontSize: 14,
    color: "#6D4C41",
    fontWeight: "600",
    marginTop: 2,
  },
  category: {
    fontSize: 11,
    color: "#8D6E63",
    textTransform: "uppercase",
    marginTop: 4,
  },
  removeBtn: {
    padding: 10,
  },
  removeIcon: {
    fontSize: 18,
    color: "#D7CCC8", // Soft brown for the 'X'
    fontWeight: "bold",
  },
  emptyState: {
    marginTop: 100,
    alignItems: "center",
  },
  emptyText: {
    color: "#8D6E63",
    fontSize: 16,
  },
});