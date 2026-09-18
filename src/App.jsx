import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar/NavBar.jsx';
import ItemListContainer from './components/ItemListContainter/ItemListContainer.jsx';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.jsx';
import Cart from './components/Cart/Cart.jsx';
import CheckoutForm from './components/CheckoutForm/CheckoutForm.jsx';

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<ItemListContainer greeting="Catálogo General" />} />
                    <Route path="/category/:categoryId" element={<ItemListContainer greeting="Productos por Categoría" />} />
                    <Route path="/item/:itemId" element={<ItemDetailContainer />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<CheckoutForm />} />
                    <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '50px' }}>404 - Página no encontrada</h2>} />
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;