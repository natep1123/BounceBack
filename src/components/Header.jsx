import Navbar from "./Navbar";

const Header = ({ display }) => {
  return (
    <header className="border-b-2 border-pink-600">
      {display === "title" && (
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
    </header>
  );
};

export default Header;
