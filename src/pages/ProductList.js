import React, { useState, useEffect } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import config from "../config.json";
import axios from "axios";
import NavBar from "../components/NavBar";

const pageSize = 2;
let page = 1;
const ProductList = () => {
  const [cart, setCart] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchData = () => {
    let params;
    if (search !== "") {
      params = { page: page, pageSize: pageSize, search: search };
    } else {
      params = { page: page, pageSize: pageSize };
    }

    axios
      .get(config.API_URL + "/products", {
        params: params,
      })
      .then((res) => {
        setProductList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const handleCartClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setAnchorEl(null);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const open = Boolean(anchorEl);
  const id = open ? "cart-popover" : undefined;

  return (
    <div>
      <NavBar />

      <div style={{ marginTop: "80px" }}>
        {/* Add top margin to create space for NavBar */}
        <header
          style={{
            textAlign: "right",
            padding: "10px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
              style={{ marginLeft: "10px" }}
            />
          </div>
          <ShoppingCartIcon onClick={handleCartClick} />
          <span style={{ marginLeft: "5px", cursor: "pointer" }}>
            {cart.length}
          </span>
        </header>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            padding: "20px",
          }}
        >
          {!loading &&
            productList.map((product) => (
              <div
                key={product._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  margin: "10px",
                  width: "200px",
                }}
              >
                <img
                  src={product.productImageUrl}
                  alt={product.name}
                  style={{ maxWidth: "100%", marginBottom: "10px" }}
                />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>
                  {product.currency}
                  {product.price.toFixed(2)}
                </p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))}
        </div>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleCartClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <div style={{ padding: "10px" }}>
            <Typography variant="h6">Shopping Cart</Typography>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    {item.name} - ${item.price.toFixed(2)}
                    <button onClick={() => removeFromCart(item.id)}>
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Popover>

        <div
          style={{
            textAlign: "center",
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowBackIcon
            onClick={handlePrevPage}
            style={{ cursor: "pointer" }}
          />
          <span style={{ margin: "0 10px" }}>Page {page}</span>
          <ArrowForwardIcon
            onClick={handleNextPage}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
