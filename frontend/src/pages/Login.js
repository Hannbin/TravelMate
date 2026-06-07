import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await API.post("/login", { email, password });

    // ❗ kiểm tra có user không
    if (res.data && res.data.id) {
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
    } else {
      alert("Sai tài khoản hoặc mật khẩu");
    }

  } catch (err) {
    alert("Sai tài khoản hoặc mật khẩu");
  }
};

  return (
  <div className="auth-container">
    <div className="auth-box">
      <h2>🌴 TravelMate</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin}>Đăng nhập</button>

      <Link to="/register" className="auth-link">
        Chưa có tài khoản? Đăng ký
      </Link>
    </div>
  </div>
);
}