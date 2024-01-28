import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, IconButton } from "@material-ui/core";
import { useAuthContext } from "../hooks/useAuthContext";
import DeleteIcon from "@material-ui/icons/Delete";
//import Chip from "@material-ui/core/Chip";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { user } = useAuthContext();

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_API_URL + "/cart",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.idToken}`,
          },
        }
      )
      .then((response) => {
        const items = response.data;
        setCartItems(items);
        calculateTotalAmount(items);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  const fetchCartData = () => {
    axios
      .get(
        process.env.REACT_APP_API_URL + "/cart",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.idToken}`,
          },
        }
      )
      .then(
        (response) => {
          setCartItems(response.data);
          calculateTotalAmount(response.data);
        },
        (error) => {
          alert("Error adding into cart");
        }
      );
  };
  const handleDeleteItem = (productId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${user.idToken}`,
        },
      })
      .then((response) => {
        fetchCartData();
      });
  };

  const handleQuantityChange = (productId, quantity) => {
    axios
      .post(
        process.env.REACT_APP_API_URL + "/cart/update_quantity",
        {
          productId: productId,
          quantity: quantity,
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.idToken}`,
          },
        }
      )
      .then(async (response) => {
        fetchCartData();
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  };

  const calculateTotalAmount = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setTotalAmount(total);
  };

  const handleCheckout = () => {
    console.log("Checkout button clicked");
  };
  const handleClearCart = () => {
    axios
      .delete(
        process.env.REACT_APP_API_URL + "/cart",

        {
          headers: {
            Authorization: `Bearer ${user.idToken}`,
          },
        }
      )
      .then((response) => {
        fetchCartData();
      })
      .catch((error) => {
        console.error("Error deleting cart items:", error);
      });
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Left side: List of items in the cart */}
      <div style={{ flex: 1 }}>
        <h2>
          Your Shopping Cart
          <button onClick={handleClearCart} style={{ marginLeft: "10px" }}>
            Clear Cart
          </button>
        </h2>
        {cartItems.map((item) => (
          <div
            key={item.productId}
            style={{
              marginBottom: "20px",
              border: "1px solid #ccc",
              padding: "20px",
              display: "flex",
            }}
          >
            <img
              src={item.product.productImageUrl}
              alt={item.product.name}
              style={{ width: "80px", height: "80px", marginRight: "20px" }}
            />
            <div>
              <p>{item.product.name}</p>
              <p>Price: ${item.product.price.toFixed(2)}</p>
              <p>
                Quantity:{" "}
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.productId,
                      parseInt(e.target.value, 10)
                    )
                  }
                />
              </p>
            </div>
            <DeleteIcon
              // Other props...
              onClick={() => handleDeleteItem(item.productId)}
            />
          </div>
        ))}
      </div>

      {/* Right side: Total amount and checkout button */}
      <div style={{ flex: 1, marginLeft: "20px" }}>
        <h2>Total Amount</h2>
        <p>Total: ${totalAmount.toFixed(2)}</p>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
