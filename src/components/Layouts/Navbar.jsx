import { useSelector } from "react-redux";
import { useLogin } from "../../hooks/useLogin";
import { useContext } from "react";
import { DarkMode } from "../../contexts/DarkMode";

const Navbar = () => {
  const username = useLogin();
  const cart = useSelector((state) => state.cart.data);
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

  const totalItem = cart.reduce((acc, total) => acc + total.qty, 0);

  const handleLogout = () => {
    window.location.href = "/login";
    localStorage.removeItem("token");
  };

  return (
    <div className="bg-black flex justify-end items-center py-4 px-8 gap-4">
      <button
        className=" bg-slate-800 rounded-lg py-2 px-4 text-white"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? "Light" : "Dark"}
      </button>
      <p className="text-white font-light">{username}</p>
      <div className="flex items-center justify-center py-2 px-4 rounded-full bg-slate-800 text-white text-sm">
        {totalItem}
      </div>
      <button
        className="bg-slate-800 rounded-md py-2 px-4 text-white hover:cursor-pointer font-medium"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
