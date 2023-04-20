import React, { createContext, useState, useEffect } from 'react';
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  // products state
  const [products, setProducts] = useState([]);
  // categories state
  const [categories, setCategories] = useState([]);

  //Traer productos y categorías de firebase
  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, "items"));
    getDocs(q).then((querySnapshot) => {
      if (querySnapshot.size === 0) {
        console.log("No results!");
      }
      const productsData = querySnapshot.docs.map((doc) => doc.data());
      setProducts(productsData);

      const categoriesData = [
        ...new Set(productsData.map((item) => item.category)),
      ];
      setCategories(categoriesData);
    });
  }, []);

  return (
    <ProductContext.Provider value={{ products, categories }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;