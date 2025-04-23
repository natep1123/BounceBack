"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to homepage after 5 seconds
    // Auth check at "/" may redirect again
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-pink-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-400 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <p className="text-gray-400">Redirecting in a few seconds...</p>
    </div>
  );
}
