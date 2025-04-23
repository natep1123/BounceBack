"use client";

import { deleteUser } from "@/lib/dbLogic";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  loading,
  setLoading,
  setError,
  setIsDeleted,
}) {
  const router = useRouter();

  const handleDelete = async () => {
    // Confirmation dialog
    if (
      !confirm(
        "Are you sure you want to delete your account? This cannot be undone."
      )
    ) {
      return;
    }
    // Set loading state
    setLoading(true);
    setError("");

    // API call
    try {
      const response = await deleteUser();

      if (response.status === 200) {
        setIsDeleted(true);
        setTimeout(async () => {
          router.push("/");
        }, 3000);
      } else {
        setError(response.data.message || "Failed to delete account.");
        setLoading(false);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white font-bold rounded-md px-6 py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete Account"}
    </button>
  );
}
