import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Chat() {
  const { receiverId } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/messages/${receiverId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [receiverId, user.token]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Send message
  const sendMessage = async () => {
    if (!text) return;

    try {
      await axios.post(
        "http://localhost:5000/api/messages",
        {
          receiverId,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setText("");
      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Chat</h1>

      <div style={{ border: "1px solid gray", padding: "10px" }}>
        {messages.map((msg) => (
          <p key={msg._id}>
            <strong>{msg.senderId}:</strong> {msg.text}
          </p>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message"
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
