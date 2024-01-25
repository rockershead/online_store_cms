import React, { useState, useEffect } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import config from "../config.json";
import axios from "axios";
import NavBar from "../components/NavBar";
import { useAuthContext } from "../hooks/useAuthContext";
import { useHistory } from "react-router-dom";

const pageSize = 2;
let page = 1;
const ProductList = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { user } = useAuthContext();
  const history = useHistory();

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
        headers: { Authorization: `Bearer ${user.idToken}` },
      })
      .then((res) => {
        setProductList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        //alert(err);
        history.push("/login");
        setLoading(false);
      });
  };

  const fetchCartData = () => {
    axios
      .get(
        config.API_URL + "/cart",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.idToken}`,
          },
        }
      )
      .then(
        (response) => {
          extractTotal(response.data);
        },
        (error) => {
          alert("Error adding into cart");
        }
      );
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  useEffect(() => {
    fetchCartData();
  }, []);
  //used to calculate total no of items in cart
  const extractTotal = (arr) => {
    let _total = 0;
    arr.forEach((obj) => {
      _total = _total + obj.quantity;
    });
    setTotal(_total);
  };

  const addToCart = (product) => {
    //setCart([...cart, product]);

    axios
      .post(
        config.API_URL + "/cart",
        {
          productId: product._id,
          quantity: quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.idToken}`,
          },
        }
      )
      .then(
        (response) => {
          extractTotal(response.data);
        },
        (error) => {
          alert("Error adding into cart");
        }
      );
  };

  /*const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };*/

  const handleCartClick = (event) => {
    //setAnchorEl(event.currentTarget);
    history.push("/cart");
  };

  /*const handleCartClose = () => {
    setAnchorEl(null);
  };*/
  const handleQuantityChange = (event) => {
    // Update the quantity state when the input changes
    const value = parseInt(event.target.value, 10) || 1; // Ensure a valid number
    setQuantity(value);
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
          <span style={{ marginLeft: "5px", cursor: "pointer" }}>{total}</span>
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
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  style={{ marginBottom: "5px" }}
                />
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))}
        </div>

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
