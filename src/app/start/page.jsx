import LogoutButton from "@/components/Logout-Button";

export default function Start() {
  return (
    <main>
      <h1>Welcome to BounceBack!</h1>
      <p>
        BounceBack is a single-player twist on the classic Pong game. Use your
        paddles to bounce the ball back and score points!
      </p>
      <LogoutButton />
    </main>
  );
}
