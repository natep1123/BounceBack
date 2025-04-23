import Navbar from "./Navbar";

const Header = ({ display, setGameState, setScore }) => {
  return (
    <header className="border-b-2 border-pink-600 text-center">
      {/* Welcome Pages */}
      {display === "welcome" && (
        <h1 className="py-2">Welcome to BounceBack!</h1>
      )}

      {/* Navbar-Included Pages */}
      {display === "navbar" && (
        <>
          <h1 className="py-2">BounceBack!</h1>
          <Navbar setGameState={setGameState} setScore={setScore} />
        </>
      )}

      {/* Active Gameplay Page */}
      {display === "game" && <h1 className="py-2">BounceBack!</h1>}
    </header>
  );
};

export default Header;
