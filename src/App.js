import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import UploadProduct from "./pages/UploadProduct";
import ProductList from "./pages/ProductList";
import NewPassword from "./pages/NewPassword";
import Cart from "./pages/Cart";

import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/NewPassword" element={<NewPassword />} />
          <Route
            path="/UploadProduct"
            element={user ? <UploadProduct /> : <Navigate to="/login" />}
          />
          <Route
            path="/cart"
            element={user ? <Cart /> : <Navigate to="/login" />}
          />

          <Route
            path="/"
            element={user ? <ProductList /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
