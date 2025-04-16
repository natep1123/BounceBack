import Navbar from "./Navbar";

const Header = ({ display, title }) => {
  return (
    <header className="py-4 border-b-2 border-pink-600">
      {display === "title" && title && (
        <h1 className="text-2xl font-bold text-gray-200 text-center pb-2">
          {title}
        </h1>
      )}
      {display === "navbar" && <Navbar />}
    </header>
  );
};

export default Header;
