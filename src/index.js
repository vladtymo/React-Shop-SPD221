import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import FakeProducts from './components/FakeProducts';
import Products from './components/Products';
import CreateProduct from './components/CreateProduct';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/create" element={<CreateProduct />} />
        <Route path="fake-products" element={<FakeProducts />} />
        <Route path="*" element={<p>Page Not Found!</p>} />
      </Route>
    </Routes>
  </BrowserRouter>
  // </React.StrictMode>
);
