import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from '../../assets/images/login-bg.png';
import config from '../../config'; 

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError(""); // Reset error on each attempt
    if (!formData.email || !formData.password) {
      setError("Please fill in both fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${config.api.baseURL}${config.api.loginUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/admin/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [formData, navigate]);

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


