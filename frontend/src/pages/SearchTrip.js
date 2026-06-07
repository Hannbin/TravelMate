import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/searchTrip.css";

const SearchTrip = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [people, setPeople] = useState(1);

  const handleSearch = () => {
    navigate(
      `/explore?keyword=${keyword}&start=${startDate}&end=${endDate}&people=${people}`
    );
  };

  return (
    <div className="search-trip">

      <div className="field">
        <label>📍 Điểm đến</label>
        <input
          placeholder="Bạn muốn đi đâu? (VD: Đà Lạt)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="field">
        <label>📅 Ngày đi</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="field">
        <label>📅 Ngày về</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="field">
        <label>👤 Số người</label>
        <input
          type="number"
          min="1"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        />
      </div>

      <button onClick={handleSearch}>
        🔍 Tìm chuyến đi
      </button>

    </div>
  );
};

export default SearchTrip;