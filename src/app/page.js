import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900">
      <Image
        src="/logo.png"
        alt="Logo"
        height={775}
        width={517}
        className="h-32 w-auto mt-8 mb-6"
      />
      <h2 className="text-4xl font-bold text-gray-200 mb-4">
        Welcome to the Game!
      </h2>
      <p className="text-lg text-gray-400 mb-8 text-center max-w-md">
        Join the fun! Log in to save your progress, register for an account, or
        play as a guest.
      </p>
      <div className="flex flex-col gap-4">
        <Link
          href="/login"
          className="bg-pink-600 text-white font-bold rounded-md px-6 py-3 text-center"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="bg-gray-700 text-white font-bold rounded-md px-6 py-3 text-center"
        >
          Register
        </Link>
        <Link
          href="/game"
          className="bg-purple-600 text-white font-bold rounded-md px-6 py-3 text-center"
        >
          Play as Guest
        </Link>
      </div>
    </div>
  );
}
