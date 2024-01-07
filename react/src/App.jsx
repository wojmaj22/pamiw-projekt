import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import PrivateRoute from "./helpers/PrivateRoute";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Form from "./pages/Form";
import "./styles/index.css";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import AdminRoute from "./helpers/AdminRoute";

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/form/:productId?"
            element={
              <AdminRoute>
                <Form />
              </AdminRoute>
            }
          />

          <Route
            path="/order"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </ReactKeycloakProvider>
  );
}

export default App;
