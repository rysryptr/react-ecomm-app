import { Link } from "react-router-dom";

const AuthLayout = (props) => {
  const { title, children, type } = props;
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xs">
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
