import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function Success() {
  const { orderId } = useParams();

  useEffect(() => {
    const completeOrder = async () => {
      await axios.put(
        `http://localhost:5000/api/orders/complete/${orderId}`
      );
    };

    completeOrder();
  }, [orderId]);

  return (
    <div>
      <h1>Payment Successful 🎉</h1>
    </div>
  );
}
