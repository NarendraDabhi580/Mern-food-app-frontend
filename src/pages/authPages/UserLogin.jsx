import { UserLoginMetadata } from "./metaData";
import AuthForm from "./authForm";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((pre) => ({ ...pre, [name]: value }));
  };

  //API : /api/auth/user/login
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const { email, password } = userData ?? {};
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || ""}/api/auth/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      navigate("/user");
    } catch (err) {
      let msg = "Login failed. Please try again.";
      if (err.response?.data?.message) msg = err.response.data.message;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      metadata={UserLoginMetadata}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      error={error}
      loading={loading}
    />
  );
};

export default UserLogin;
