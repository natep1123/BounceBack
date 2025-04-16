import Navbar from "./Navbar";

const Header = ({ display }) => {
  return (
    <header className="border-b-2 border-pink-600">
      {display === "welcome" && (
        <h1 className="py-4 text-4xl font-bold text-gray-200 text-center">
          Welcome to BounceBack!
        </h1>
      )}
      {display === "navbar" && (
        <>
          <h1 className="pt-4 text-4xl font-bold text-gray-200 text-center pb-4">
            BounceBack!
          </h1>
          <Navbar />
        </>
      )}
      {display === "game" && (
        <h1 className="py-4 text-4xl font-bold text-gray-200 text-center">
          BounceBack!
        </h1>
      )}
    </header>
  );
};

export default Header;
