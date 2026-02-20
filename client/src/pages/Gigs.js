import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const Gigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/gigs")
      .then(res => setGigs(res.data))
      .catch(err => console.log(err));
      setLoading(false);
  }, []);
if (loading) return <Loader />;
  return (
    <div style={{ padding: "40px" }}>
      <h2>All Gigs</h2>

     {gigs.length === 0 && !loading && (
  <p>No gigs found</p>
)}
      {gigs.map(gig => (
        <div key={gig._id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "8px"
          }}
        >
          <h3>{gig.title}</h3>
          <p>${gig.price}</p>

          <Link to={`/gig/${gig._id}`}>
            <button>View Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
};



export default Gigs;
