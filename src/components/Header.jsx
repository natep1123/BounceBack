import Navbar from "./Navbar";

const Header = ({ display }) => {
  return (
    <header className="border-b-2 border-pink-600 text-center">
      {display === "welcome" && (
        <h1 className="py-2">Welcome to BounceBack!</h1>
      )}
      {display === "navbar" && (
        <>
          <h1 className="py-2">BounceBack!</h1>
          <Navbar />
        </>
      )}
      {display === "game" && <h1 className="py-2">BounceBack!</h1>}
    </header>
  );
};

export default Header;
