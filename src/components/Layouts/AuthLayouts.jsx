import { useContext } from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../../contexts/DarkMode";

const AuthLayout = (props) => {
  const { title, children, type } = props;
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  console.log(isDarkMode);

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${
        isDarkMode && "bg-slate-800"
      }`}
    >
      <div className="w-full max-w-xs">
        <button
          className="absolute top-2 right-2 bg-sky-600 rounded-lg py-2 px-4 text-white"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? "Light" : "Dark"}
        </button>
        <h1 className="text-3xl font-bold mb-2 text-sky-600">{title}</h1>
        <p className="font-medium text-gray-500 mb-4">
          Welcome! Please enter your details
        </p>
        {children}
        <Navigation type={type} />
      </div>
    </div>
  );
};

const Navigation = ({ type }) => {
  return (
    <p className="text-sm mt-4 text-gray-600 text-center">
      {type === "login"
        ? "Don't have an account? "
        : "Already have an account? "}

      {type === "login" && (
        <Link to="/register" className="text-sky-700 font-semibold">
          Register
        </Link>
      )}

      {type === "register" && (
        <Link to="/login" className="text-sky-700 font-semibold">
          Login
        </Link>
      )}
    </p>
  );
};

export default AuthLayout;
