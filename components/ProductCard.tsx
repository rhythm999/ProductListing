import { Product } from "@/constants/types";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Define the props for the ProductCard component
interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => onEdit(product)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            Alert.alert("Confirm", "Are you sure you want to delete this product?", [
              { text: "Cancel", style: "cancel" },
              { text: "Delete", onPress: () => onDelete(product.id), style: "destructive" },
            ]);
          }}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2A9D8F",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProductCard;
