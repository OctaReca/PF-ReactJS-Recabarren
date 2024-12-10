import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Category from './pages/Category'; // Cambiar aquí
import Sidebear from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Checkout from './components/Checkout';

const App = () => {
  return (
    <div className='overflow-hidden'>
      <Router>
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category/:category' element={<Category />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/Checkout' element={<Checkout />} />
        </Routes>
        <Sidebear />
        <Footer />
      </Router>
    </div>
  );
};

export default App;
