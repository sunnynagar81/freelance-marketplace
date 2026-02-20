import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{
      height: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(90deg,#6a11cb,#2575fc)",
      color: "white"
    }}>
      <h1>Freelance Marketplace</h1>
      <p>Buy & Sell Services Easily</p>
      <Link to="/gigs">
        <button>Explore Gigs</button>
      </Link>
    </div>
  );
};

export default Home;
