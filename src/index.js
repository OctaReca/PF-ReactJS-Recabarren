import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// prduct provider
import ProductProvider from './contexts/ProductContext';
// sidebar provider
import SidebarProvider from './contexts/SidebarContext';
// cart provider
import CartProvider, { CartContext } from './contexts/CartContext';
import './firebase/config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SidebarProvider>
    <CartProvider>
      <ProductProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ProductProvider>
    </CartProvider>
  </SidebarProvider>
);
