import { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ Update Order Status
  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order updated ✅");
      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to update order ❌");
    }
  };

  return (
    <div>
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>Gig: {order.gigId?.title}</h3>
            <p>Price: ₹{order.price}</p>
            <p>Status: {order.status}</p>

            <button onClick={() => updateStatus(order._id, "accepted")}>
              Accept Order
            </button>

            <button onClick={() => updateStatus(order._id, "completed")}>
              Mark Completed
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
