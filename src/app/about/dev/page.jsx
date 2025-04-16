import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Header from "@/components/Header";
import Link from "next/link";

export default async function AboutDev() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Header display="navbar" title="BounceBack!" />
      <main className="flex flex-col items-center min-h-screen bg-gray-900 mt-4">
        <h2 className="text-3xl font-bold text-white">About the Developer</h2>
        <div className="w-full max-w-2xl p-8 mt-4 bg-gray-800 rounded-lg shadow-lg shadow-pink-500/20">
          <div className="text-gray-200 space-y-5">
            <p>
              Hi, I'm Nate Perry, a passionate developer who loves building
              engaging and interactive web applications.
            </p>
            <p>
              BounceBack! is my take on the classic Pong game, reimagined as a
              solo challenge. I had a blast creating it, and I hope you enjoy
              playing it as much as I enjoyed building it.
            </p>
            <p>
              Got questions or feedback? Feel free to reach out—I'd love to hear
              from you!
            </p>
            <p className="italic">— Nate Perry</p>
            <h3 className="text-2xl font-bold text-white mb-4">Contact Me:</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  className="text-orange-300 underline"
                  href="https://github.com/natep1123"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
              </li>
              <li>
                <a
                  className="text-orange-300 underline"
                  href="https://www.linkedin.com/in/nathaniel-perry-646bb4326/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Link className="mt-4 text-orange-400 font-medium" href="/about/game">
          About the Game
        </Link>
      </main>
    </>
  );
}
