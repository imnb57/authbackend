import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [tc, setTc] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !name || !tc || !password || !password2) {
      setError("Please fill in all fields and agree to the terms.");
      return;
    }

    if (password !== password2) {
      setError("Passwords must match.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/user/register/", {
        email,
        name,
        tc,
        password,
        password2,
      });

      console.log(response.data); // Log the response for debugging
      setSuccess("Registration successful! Redirecting to login...");

      // Redirect to login page after a delay
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Registration failed:", err.response || err);
      setError(
        err.response?.data?.detail ||
        "Registration failed. Please ensure all fields are correct."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {success && <div className="text-green-500 text-sm mb-4">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name" className="block text-sm font-semibold text-gray-700">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password2" className="block text-sm font-semibold text-gray-700">
              Confirm Password
            </Label>
            <Input
              id="password2"
              type="password"
              placeholder="Confirm your password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6 flex items-center">
            <input
              id="tc"
              type="checkbox"
              checked={tc}
              onChange={(e) => setTc(e.target.checked)}
              className="mr-2"
            />
            <Label htmlFor="tc" className="text-sm text-gray-700">
              I agree to the terms and conditions
            </Label>
          </div>

          <Button type="submit" variant="solid" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Register
          </Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/" className="text-blue-600 hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
