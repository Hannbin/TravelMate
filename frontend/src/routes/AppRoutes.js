import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Chat from "../pages/Chat";
import Register from "../pages/Register";
import TripDetail from "../pages/TripDetail";
import CreateTrip from "../pages/CreateTrip";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import ManageTrip from "../pages/ManageTrip";
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/chat/:trip_id" element={<Chat />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trip/:id" element={<TripDetail />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/manage-trip/:id" element={<ManageTrip />}

/>
      </Routes>
    </BrowserRouter>
  );
}