import { useNavigate } from "react-router-dom";
import "../styles/header.css";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="header">
      
      {/* LOGO */}
      <div className="logo" onClick={() => navigate("/")}>
        <img src="https://cdn-icons-png.flaticon.com/512/201/201623.png" alt="logo" />
        <span>TravelMate</span>
      </div>

      {/* MENU */}
      <nav className="nav">
        <span onClick={() => navigate("/")}>Trang Chủ</span>
        <span> Tìm Kiếm </span>
        <span> Bạn Đồng Hành </span>
      </nav>

      {/* RIGHT */}
      <div className="auth">
        {!user ? (
          <>
            <button className="login" onClick={() => navigate("/login")}>
              Đăng Nhập
            </button>

            <button className="register" onClick={() => navigate("/register")}>
              Đăng Ký
            </button>
          </>
        ) : (
          <button onClick={() => {
            localStorage.clear();
            navigate("/");
          }}>
            Logout
          </button>
        )}
      </div>

    </header>
  );
}