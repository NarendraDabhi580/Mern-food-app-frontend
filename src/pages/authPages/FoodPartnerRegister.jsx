import { FoodPartnerRegisterMetadata } from "./metaData";
import AuthForm from "./authForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const FoodPartnerRegister = () => {
  const [userData, setUserData] = useState({
    name: "",
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

  //API : http://localhost:3200/api/auth/food-partner/register
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const { name, email, password } = userData ?? {};
    if (!name || !email || !password) {
      setError("Name, email, and password are required.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || ""}/api/auth/food-partner/register`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      navigate("/food-partner");
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
      metadata={FoodPartnerRegisterMetadata}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      error={error}
      loading={loading}
    />
  );
};

export default FoodPartnerRegister;
