import { Product } from "@/constants/types";
import {
  deleteProductDB,
  fetchProducts,
  insertProduct,
  updateProductDB,
} from "@/utils/database";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { router } from "expo-router";
import { AppDispatch } from "./store";

// ----------------------------
// Initial State
// ----------------------------

type ProductState = {
  products: Product[];
};

const initialState: ProductState = {
  products: [],
};

// ----------------------------
// Slice
// ----------------------------

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.unshift(action.payload); // ✅ unshift to show newest on top
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
  },
});

// ----------------------------
// Thunks
// ----------------------------

export const addProductThunk =
  (product: Omit<Product, "id">) => async (dispatch: AppDispatch) => {
    try {
      const newId = Date.now();
      const newProduct: Product = {
        id: newId,
        ...product,
      };
      await insertProduct(newId, product.name, product.description, product.price);
      dispatch(addProduct(newProduct));
      router.push("/");
    } catch (err) {
      console.error("Insert failed:", err);
    }
  };

export const updateProductThunk =
  (product: Product) => async (dispatch: AppDispatch) => {
    try {
      await updateProductDB(product.id, product.name, product.description, product.price);
      dispatch(updateProduct(product));
      router.push("/");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

export const deleteProductThunk =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      await deleteProductDB(id);
      dispatch(deleteProduct(id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

export const fetchAllProductThunk =
  () => async (dispatch: AppDispatch) => {
    try {
      const productList:any = await fetchProducts(); // already ordered DESC
      dispatch(setProducts(productList));
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

// ----------------------------
// Exports
// ----------------------------

export const { setProducts, addProduct, updateProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
