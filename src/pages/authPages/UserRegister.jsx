import { useState } from "react";
import "../../index.css";
import AuthForm from "./AuthForm";
import { UserRegisterMetadata } from "./metaData";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const { fullName, email, password } = userData ?? {};
    if (!fullName || !email || !password) {
      setError("Full name, email, and password are required.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || ""}/api/auth/user/register`,
        { fullName, email, password },
        { withCredentials: true }
      );
      navigate("/user");
    } catch (err) {
      let msg = "Registration failed. Please try again.";
      if (err.response?.data?.message) msg = err.response.data.message;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      metadata={UserRegisterMetadata}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      error={error}
      loading={loading}
    />
  );
};

export default UserRegister;
