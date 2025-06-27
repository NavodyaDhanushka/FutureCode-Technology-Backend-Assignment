import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm.jsx";
import ProductManager from "./pages/ProductManager.jsx";


function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/product" element={<ProductManager />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
