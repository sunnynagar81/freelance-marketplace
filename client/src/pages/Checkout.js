import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        console.log("ORDER ID:", orderId);

        const res = await axios.get(
          `http://localhost:5000/api/orders/single/${orderId}`
        );

        console.log("RESPONSE:", res.data);

        setOrder(res.data);
      } catch (err) {
        console.log("FRONTEND ERROR:", err);
        setError("Failed to load order.");
      }

    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (error) {
    return <div style={{ padding: "40px" }}>{error}</div>;
  }

  if (!order) {
    return <div style={{ padding: "40px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Checkout Page</h2>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Price:</strong> ₹{order.price}</p>
      <button
  onClick={async () => {
    const res = await axios.post(
      "http://localhost:5000/api/payment/create-checkout-session",
      {
        price: order.price,
        orderId: order._id,
      }
    );

    window.location.href = res.data.url;
  }}
>
  Pay Now
</button>

    </div>
  );
};


export default Checkout;
