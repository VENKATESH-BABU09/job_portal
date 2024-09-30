import Login from "../pages/Login";
import ProfilePage from "../pages/ProfilePage";
import RecruiterProfile from "../pages/RecruiterProfile";
import Signup from "../pages/Signup";
import HomePage from "../pages/HomePage";
import Footer from "../components/Footer";
import Loginemp from "../pages/Loginemp";
import PostJob from "../pages/PostJob";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import LandingPage from "../pages/LandingPage";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginemp" element={<Loginemp />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/recruiterProfile" element={<RecruiterProfile />} />

          {/* Protected Route for PostJob */}
          <Route
            path="/PostJob"
            element={<ProtectedRoute allowedRoles={['employer']} component={PostJob} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}