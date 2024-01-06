import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import UploadProduct from "./pages/UploadProduct";
import ProductList from "./pages/ProductList";
import NewPassword from "./pages/NewPassword";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
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
            <UploadProduct />
          </Route>
          <Route exact path="/ProductList">
            <ProductList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
