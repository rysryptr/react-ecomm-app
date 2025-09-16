import "./index.css";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* <LoginPage></LoginPage> */}
      <RegisterPage />
    </div>
  );
}

export default App;
