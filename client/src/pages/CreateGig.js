import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateGig = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/gigs", {
        title,
        desc,
        price,
        userId: currentUser._id,
        cover: "image.jpg"
      });

      alert("Gig Created Successfully!");
      navigate("/gigs");

    } catch (err) {
      console.log(err);
      alert("Error creating gig");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Create New Gig</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Gig Title"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <textarea
          placeholder="Gig Description"
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Create Gig</button>
      </form>
    </div>
  );
};

export default CreateGig;
