"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser, promoteGuestUser } from "@/lib/dbLogic";
import Image from "next/image";
import Loader from "./Loader";

export default function RegisterForm({ isGuest }) {
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

    // Input validation
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

    // API Call
    try {
      let response;
      // New User
      if (!isGuest) {
        response = await registerUser(
          trimmedUsername,
          trimmedEmail,
          trimmedPassword
        );
      }
      // Promote Guest User
      if (isGuest) {
        response = await promoteGuestUser(
          trimmedUsername,
          trimmedEmail,
          trimmedPassword
        );
      }

      if (response.status === 201) {
        const form = e.target;
        form.reset();
        router.push("/login");
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
    <div className="flex flex-col items-center min-h-screen bg-gray-900 relative">
      {loading && <Loader isLoading={loading} />}
      {!loading && (
        <Image
          src="/logo.png"
          alt="Logo"
          height={775}
          width={517}
          className="h-26 w-auto mb-4 mt-4"
        />
      )}
      <div
        className={`shadow-xl p-4 rounded-xl bg-gray-800 border-t-4 border-purple-400 transition-opacity ${
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
            className="bg-pink-600 text-white font-bold rounded-md px-6 py-3 cursor-pointer"
            disabled={loading}
          >
            Register
          </button>
          {error && (
            <div className="bg-red-500 text-white text-sm py-1 px-3 rounded-md mt-2 w-fit mx-auto text-center">
              {error}
            </div>
          )}
          <span className="text-center text-orange-300">
            Already have an account?
            <ul>
              <li className="mt-2">
                <Link href={"/login"} className="underline">
                  Login
                </Link>
              </li>
            </ul>
          </span>
        </form>
      </div>
    </div>
  );
}
