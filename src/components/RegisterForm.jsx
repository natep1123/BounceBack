"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (!username.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Try to register the user
    try {
      const response = await axios.post("/api/register", {
        username: username.trim(),
        email: email.trim(),
        password,
      });

      // Ensure success status
      if (response.status === 201) {
        const form = e.target;
        form.reset();
        router.push("/");
      } else {
        setError(response.data?.message || "Registration failed.");
      }
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response?.data || error
      );
      // Handle error response
      setError(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
    }
  }; // end handleSubmit

  return (
    <div className="grid place-items-center h-screen bg-gray-900">
      <div className="shadow-xl p-6 rounded-xl bg-gray-800 border-t-4 border-purple-400">
        <h1 className="text-2xl font-bold my-4 text-gray-200">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            className="p-3 rounded-md border border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="p-3 rounded-md border border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-3 rounded-md border border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button className="bg-pink-600 text-white font-bold rounded-md px-6 py-3 hover:bg-pink-500 transition-colors cursor-pointer">
            Register
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link
            className="text-sm mt-3 text-right text-orange-300 hover:text-orange-200 hover:underline"
            href={"/"}
          >
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
