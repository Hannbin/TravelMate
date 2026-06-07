import { useState } from "react";
import API from "../services/api";
import "../styles/createTrip.css";

export default function CreateTrip({ reloadTrips }) {
  const [form, setForm] = useState({
    user_id: 2,
    title: "",
    destination: "",
    start_date: "",
    end_date: "",
    description: "",
    max_members: 5,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (loading) return;

    if (!form.title || !form.destination) {
      alert("Nhập đủ thông tin");
      return;
    }

    setLoading(true);

    try {
      await API.post("/create-trip", form);

      alert("Tạo thành công");
      reloadTrips();

      setForm({
        user_id: 2,
        title: "",
        destination: "",
        start_date: "",
        end_date: "",
        description: "",
        max_members: 5,
      });
    } catch (err) {
      alert("Lỗi tạo trip");
    }

    setLoading(false);
  };

  return (
    <div className="trip-create-wrapper">
      <div className="trip-create-card">

        <h2>✈️ Tạo chuyến đi mới</h2>
        <p>Chia sẻ hành trình của bạn với mọi người</p>

        <div className="form-grid">

          <input
            name="title"
            placeholder="Tên chuyến đi"
            onChange={handleChange}
            value={form.title}
          />

          <input
            name="destination"
            placeholder="Điểm đến"
            onChange={handleChange}
            value={form.destination}
          />

          <input
            type="date"
            name="start_date"
            onChange={handleChange}
            value={form.start_date}
          />

          <input
            type="date"
            name="end_date"
            onChange={handleChange}
            value={form.end_date}
          />

          <input
            type="number"
            name="max_members"
            placeholder="Số người tối đa"
            onChange={handleChange}
            value={form.max_members}
          />

          <textarea
            name="description"
            placeholder="Mô tả chuyến đi..."
            onChange={handleChange}
            value={form.description}
          />

        </div>

        <button
          className="create-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "⏳ Đang tạo..." : "🚀 Tạo chuyến đi"}
        </button>

      </div>
    </div>
  );
}