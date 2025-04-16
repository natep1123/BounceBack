import Navbar from "./Navbar";

const Header = ({ display }) => {
  return (
    <header className="border-b-2 border-pink-600">
      {display === "welcome" && <h1>Welcome to BounceBack!</h1>}
      {display === "navbar" && (
        <>
          <h1>BounceBack!</h1>
          <Navbar />
        </>
      )}
      {display === "game" && <h1>BounceBack!</h1>}
    </header>
  );
};

export default Header;
