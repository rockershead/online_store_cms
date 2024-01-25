import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
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
  console.log(user);
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/login">
            {<Login />}
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/ForgotPassword">
            <ForgotPassword />
          </Route>
          <Route exact path="/NewPassword">
            <NewPassword />
          </Route>
          <Route exact path="/UploadProduct">
            {user ? <UploadProduct /> : Redirect("/login")}
          </Route>
          <Route exact path="/cart">
            {user ? <Cart /> : Redirect("/login")}
          </Route>

          <Route exact path="/">
            {user ? <ProductList /> : Redirect("/login")}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
