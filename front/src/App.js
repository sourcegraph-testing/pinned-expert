import "./styles/App.css";
import React, { useState } from "react";
import { Route, useLocation, Routes, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Transitions from "./context/Transition";
import { motion } from "framer-motion";

import { Home, Statistics, Account, MyList, Product } from "./pages";

import { Nav, NotificationsMenu } from "./components";
import { useAuth } from "./context/AuthContext";
import { ProductsProvider } from "./context/ProductsContext";

export default function App() {
  const location = useLocation();
  const { loggedIn } = useAuth();
  const [menu, setMenu] = useState(false);

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <ProductsProvider>
          <motion.div style={{ flexGrow: 1 }}>
            <Nav setMenu={setMenu} />
            <AnimatePresence exitBeforeEnter>
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/"
                  element={
                    <Transitions>
                      <Home />
                    </Transitions>
                  }
                />
                <Route
                  path="/statistics"
                  element={
                    <Transitions>
                      <Statistics />
                    </Transitions>
                  }
                />
                <Route
                  path="/mylist"
                  element={
                    <Transitions>
                      {loggedIn ? <MyList /> : <Navigate to="/" />}
                    </Transitions>
                  }
                />
                <Route
                  path="/account"
                  element={
                    <Transitions>
                      <Account />{" "}
                    </Transitions>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <Transitions>
                      <Product />
                    </Transitions>
                  }
                />
              </Routes>
            </AnimatePresence>
          </motion.div>
          <AnimatePresence>{menu && <NotificationsMenu />}</AnimatePresence>
        </ProductsProvider>
      </div>
      <Toaster />
    </div>
  );
}
