import Navbar from "./Navbar";

const Header = ({ display }) => {
  return (
    <header className="border-b-2 border-pink-600 text-center">
      {/* Welcome Pages */}
      {display === "welcome" && <h1>Welcome to BounceBack!</h1>}

      {/* Navbar-Included Pages */}
      {display === "navbar" && (
        <>
          <h1>BounceBack!</h1>
          <Navbar />
        </>
      )}
    </header>
  );
};

export default Header;
