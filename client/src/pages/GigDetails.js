import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gig, setGig] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/gigs/${id}`)
      .then((res) => setGig(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleOrder = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/orders",
      {
        gigId: gig._id,
        buyerId: currentUser._id,
        sellerId: gig.userId,
        price: gig.price,
      }
    );

    console.log("ORDER CREATED:", res.data);

    // ✅ VERY IMPORTANT
    navigate(`/checkout/${res.data._id}`);

  } catch (err) {
    console.log("ORDER FAILED:", err);
  }
};

  if (!gig) return <div>Loading...</div>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>{gig.title}</h1>
      <p>{gig.desc}</p>
      <h3>${gig.price}</h3>

      {currentUser && (
        <button onClick={handleOrder}>Order Now</button>
      )}
    </div>
  );
};

export default GigDetails;
