import "./styles/App.css";
import React from "react";
import { Route, useLocation, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import Account from "./pages/Account";
import Product from "./pages/Product";
import Nav from "./components/Nav";
import { AuthProvider } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext";
import MyList from "./pages/MyList";

export default function App() {
  const location = useLocation();

  return (
    <div className="App">
      <AuthProvider>
        <ProductsProvider>
          <Nav />
          <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/mylist" element={<MyList />} />
              <Route path="/account" element={<Account />} />
              <Route path="/product/:id" element={<Product />} />
            </Routes>
          </AnimatePresence>
        </ProductsProvider>
      </AuthProvider>
    </div>
  );
}
