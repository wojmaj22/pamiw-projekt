import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
import PrivateRoute from "./helpers/PrivateRoute";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Form from "./components/Form";
import Secured from "./pages/Secured";
import "./styles/index.css";
import Footer from "./components/Footer";

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/form/:productId?" element={<Form />} />
          <Route
            path="/secured"
            element={
              <PrivateRoute>
                <Secured />
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
