import { FlatList, StyleSheet } from "react-native";

import ProductCard from "@/components/ProductCard";
import { Text, View } from "@/components/Themed";
import { Product } from "@/constants/types";
import { deleteProductThunk, fetchAllProductThunk } from "@/redux/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { initDB } from "@/utils/database";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TabOneScreen() {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch<AppDispatch>();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(()=>{
    dataCall()
  },[])

  const dataCall = async () => {
    try {
      await initDB();
      console.log("Database initialized");
      await dispatch(fetchAllProductThunk());
    } catch (err) {
      console.log("DB init failed:", err);
    }
  };

  const handleEdit = (product: Product) => {
    router.push({
      pathname: "/Add",
      params: { screenName: "Edit", product: JSON.stringify(product) },
    });
  };

  const handleDelete = (productId: number) => {
    dispatch(deleteProductThunk(productId));
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchAllProductThunk());
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Listing</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        ListEmptyComponent={
          <Text style={{ marginTop: 250, fontSize: 16, color: "gray" }}>
            No products found. Add some!
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%",
  },
});
