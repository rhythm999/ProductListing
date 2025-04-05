import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("products.db");

export const initDB = async () => {
  return await db.execAsync(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL
  );`);
};

export const insertProduct = async (
  id:number,
  name: string,
  description: string,
  price: number
) => {
  return await db.runAsync(
    'INSERT INTO products (id ,name, description, price) VALUES (? ,?, ?, ?);',
    [id ,name, description,price],
  );
};
export const updateProductDB = async (
  id:number,
  name: string,
  description: string,
  price: number
) => {
  return await db.runAsync(
    'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?',
    [name, description, price, id],
  );
};

export const fetchProducts = async () => {
  return await db.getAllAsync("SELECT * FROM products ORDER BY id DESC;");
};


export const deleteProductDB = async (id: number) => {
  return await db.runAsync(
    'DELETE FROM products WHERE id = ?',
    [id]
  );
};