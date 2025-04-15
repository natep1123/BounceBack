"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check for empty fields
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Email and password are required.");
      return;
    }

    const result = await signIn("credentials", {
      email: trimmedEmail,
      password: trimmedPassword,
      redirect: false,
    });

    // Simplified error handling due to nextauth v5 error complexity...
    /* NextAuth v5 wraps custom error messages from the `authorize` function into generic `CallbackRouteError` or `Configuration` errors, making it difficult to display specific messages like "No user found with this email" in the client-side `LoginForm.js`. */
    if (result?.error) {
      setError("Incorrect email or password.");
    } else if (result?.ok) {
      router.push("/start");
    }
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-900">
      <div className="shadow-xl p-6 rounded-xl bg-gray-800 border-t-4 border-purple-400">
        <h1 className="text-2xl font-bold my-4 text-gray-200">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          >
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link
            className="text-sm mt-3 text-right text-orange-300 hover:text-orange-200 hover:underline"
            href={"/register"}
          >
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
