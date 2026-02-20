import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";

const SingleGig = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⭐ Fetch Gig
  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await axios.get(`/gigs/${id}`);
        setGig(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGig();
  }, [id]);

  // ⭐ Buy Order
  const handleBuy = async () => {
    try {
      await axios.post("/orders", {
        gigId: gig._id,
      });

      alert("Order Created Successfully ✅");
    } catch (err) {
      console.log(err.response?.data);
      alert("Order Failed ❌");
    }
  };

  if (loading) return <h2>Loading...</h2>;

  if (!gig) return <h2>Gig Not Found</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{gig.title}</h1>

      <p>{gig.description}</p>

      <h3>Price: ₹{gig.price}</h3>

      <button
        onClick={handleBuy}
        style={{
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Buy Gig
      </button>
    </div>
  );
};

export default SingleGig;
