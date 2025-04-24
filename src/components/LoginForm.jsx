"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

export default function LoginForm() {
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
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    // API call
    const result = await signIn("credentials", {
      email: trimmedEmail,
      password: trimmedPassword,
      redirect: false,
    });

    // Handle response
    if (result?.error) {
      setError("Incorrect email or password.");
      setLoading(false);
    } else if (result?.ok) {
      router.push("/game");
    }
  };

  const handleGitHubLogin = async () => {
    setLoading(true);
    setError("");
    await signIn("github", { callbackUrl: "/game" });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 relative">
      {loading && <Loader isLoading={loading} />}
      {!loading && (
        <img src="/logo.png" alt="Logo" className="h-26 w-auto mb-4 mt-4" />
      )}
      <div
        className={`shadow-xl p-4 rounded-xl bg-gray-800 border-t-4 border-purple-400 transition-opacity ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Login</h2>
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
            className="bg-pink-600 text-white font-bold rounded-md px-6 py-3 cursor-pointer"
            disabled={loading}
          >
            Login
          </button>
          <button
            onClick={handleGitHubLogin}
            className="w-full bg-gray-700 text-white font-bold rounded-md px-6 py-3 cursor-pointer flex items-center justify-center gap-2"
            disabled={loading}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.77c-2.78.61-3.36-1.34-3.36-1.34-.45-1.14-1.1-1.44-1.1-1.44-.9-.61.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.56 9.56 0 0112 6.8c.85.004 1.71.11 2.52.33 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" />
            </svg>
            Login with GitHub
          </button>
          {error && (
            <div className="bg-red-500 text-white text-sm py-1 px-3 rounded-md mt-2 w-fit mx-auto text-center">
              {error}
            </div>
          )}
          <div className="text-center text-orange-300">
            <span className="test-white">Don't have an account?</span>
            <ul>
              <li className="mt-2">
                <Link href={"/register"} className="underline text-orange-300">
                  Register
                </Link>
              </li>
              <li className="mt-2">
                <Link href={"/game"} className="underline text-orange-300">
                  Play as Guest
                </Link>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}
