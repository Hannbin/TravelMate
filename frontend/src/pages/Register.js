import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/register", {
        name,
        email,
        password,
      });

      alert("Đăng ký thành công");
      navigate("/");
    } catch (err) {
      alert("Đăng ký thất bại");
      console.log(err);
    }
  };

  return (
  <div className="auth-container">
    <div className="auth-box">
      <h2>✈️ Đăng ký</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Đăng ký</button>

      <Link to="/" className="auth-link">
        Đã có tài khoản? Đăng nhập
      </Link>
    </div>
  </div>
);
}