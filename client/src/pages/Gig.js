import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Gig() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gig, setGig] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch single gig
  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/gigs/${id}`
        );

        setGig(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGig();
  }, [id]);

  // Buy Gig
  const handleBuy = async () => {
    try {
      if (!user) {
        alert("Please login first");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          gigId: gig._id,
          sellerId: gig.sellerId,
          price: gig.price,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      alert("Order Created Successfully ✅");

      navigate("/orders");
    } catch (error) {
      console.log(error);
      alert("Order Failed ❌");
    }
  };

  if (!gig) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{gig.title}</h1>
      <p>{gig.description}</p>
      <h3>Price: ₹{gig.price}</h3>

      <button onClick={handleBuy}>Buy Now</button>
    </div>
  );
}

export default Gig;
