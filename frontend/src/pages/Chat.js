import { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";

export default function Chat() {

  const { trip_id } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sender_id = 1;

  // ✅ CHỈ GIỮ 1 fetchMessages
  const fetchMessages = async () => {
    try {
      const res = await API.get(`/messages/${trip_id}`);
      setMessages(res.data);
    } catch (err) {
      console.log("Lỗi load messages:", err);
    }
  };

  useEffect(() => {
  const fetchMessages = async () => {
    try {
      const res = await API.get(`/messages/${trip_id}`);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchMessages();
}, [trip_id]);

  const sendMessage = async () => {
    if (!text.trim()) return; // ❗ tránh gửi rỗng

    try {
      await API.post("/send-message", {
        trip_id: trip_id,
        sender_id: sender_id,
        message: text,
      });

      setText("");

      // reload lại tin nhắn
      fetchMessages();

    } catch (err) {
      console.log("Lỗi gửi tin:", err);
      alert("Gửi tin nhắn thất bại");
    }
  };

  return (
    <div>
      <h2>Chat Trip {trip_id}</h2>

      {messages.map((m, i) => (
        <div key={i}>
          <b>{m.sender_id}:</b> {m.message}
        </div>
      ))}

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập tin nhắn..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}