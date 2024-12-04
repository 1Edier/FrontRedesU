import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './login';
import ProductsPage from './inicio';

const App = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route
                    path="/productos"
                    element={isAuthenticated ? <ProductsPage /> : <Navigate to="/" />}
                />
            </Routes>
        </Router>
    );
};

export default App;
