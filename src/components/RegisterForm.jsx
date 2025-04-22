"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "./Loader";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
    if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
      setError("Username must be between 3 and 20 characters.");
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }
    if (trimmedPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/register", {
        username: trimmedUsername,
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (response.status === 201) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        setError(response.data?.message || "Registration failed.");
        setLoading(false);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-900 relative">
      {loading && <Loader isLoading={loading} />}
      <div
        className={`shadow-xl p-6 rounded-xl bg-gray-800 border-t-4 border-purple-400 transition-opacity ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="p-3 rounded-md border border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="p-3 rounded-md border border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-3 rounded-md border border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            type="submit"
            className="bg-pink-600 text-white font-bold rounded-md px-6 py-3 hover:bg-pink-500 transition-colors cursor-pointer"
            disabled={loading}
          >
            Register
          </button>
          {error && (
            <div className="	bg-red-500 text-white text-sm py-1 px-3 rounded-md mt-2 w-fit mx-auto text-center">
              {error}
            </div>
          )}
          <Link
            className="text-sm text-right text-orange-300 hover:text-orange-200 hover:underline"
            href={"/"}
          >
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
