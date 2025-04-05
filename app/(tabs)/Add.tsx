import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

import { Text, View } from "@/components/Themed";
import { addProductThunk, updateProductThunk } from "@/redux/productSlice";
import { AppDispatch } from "@/redux/store";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Add = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const { screenName, product } = useLocalSearchParams();
  const dispatch = useDispatch<AppDispatch>();


  useFocusEffect(
    useCallback(() => {
      if (screenName === "Add") {
        console.log("Resetting fields for Add screen");
        setName("");
        setDescription("");
        setPrice("");
      } else if (typeof product === "string") {
        try {
          const parsedProduct = JSON.parse(product);
          setName(parsedProduct.name || "");
          setDescription(parsedProduct.description || "");
          setPrice(parsedProduct.price?.toString() || "");
        } catch (error) {
          console.error("Invalid product JSON:", error);
        }
      }
    }, [screenName, product])
  );
  const handleSave = () => {
    if (!name || !description || !price) {
      alert("Data can't be empty");
      return;
    }
    if (screenName === "Add") {
      const newProduct = {
        name,
        description,
        price: Number(price),
      };

      dispatch(addProductThunk(newProduct));
    } else if (typeof product === "string") {
      const parsedProduct = JSON.parse(product);
      const newProduct = {
        id: parsedProduct.id,
        name,
        description,
        price: Number(price),
      };
      console.log("newProduct", newProduct);
      dispatch(updateProductThunk(newProduct));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter product name"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        placeholder="Enter price"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>
          {screenName === "Add" ? "Add Product" : "Update Product"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Add;
