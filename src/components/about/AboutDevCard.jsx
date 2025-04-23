"use client";

export default function AboutDevCard({ setAboutState }) {
  return (
    <>
      <h2>About the Developer</h2>
      <div className="w-full max-w-2xl p-8 bg-gray-800 rounded-lg shadow-lg shadow-pink-500/20">
        <div className="text-gray-200 space-y-5">
          <p>
            Hi, I'm Nate, a passionate developer who loves building engaging and
            interactive web applications.
          </p>
          <p>
            BounceBack! is my take on the classic Pong game, reimagined as a
            solo challenge. I had a blast creating it, and I hope you enjoy
            playing it as much as I enjoyed building it.
          </p>
          <p>
            Got questions, feedback or collaboration ideas? Feel free to reach
            out, I'd love to hear from you!
          </p>
          <p className="italic">— Nate Perry</p>
          <p className="font-bold text-white mb-2">Contact Me:</p>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                className="text-orange-300 underline"
                href="https://github.com/natep1123"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
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
      <a
        className="mt-4 text-orange-400 font-medium cursor-pointer"
        onClick={() => setAboutState("game")}
      >
        About the Game
      </a>
    </>
  );
}
