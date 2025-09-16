import { useEffect, useRef, useState } from "react";
import Button from "../Elements/Button";
import InputLabel from "../Elements/Input";
import { login } from "../../services/login.service";

const FormLogin = () => {
  const [loginFailed, setLoginFailed] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // localStorage.setItem("username", e.target.username.value);
    // localStorage.setItem("password", e.target.password.value);

    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
        window.location.href = "/products";
      } else {
        setLoginFailed(res.response.data);
      }
    });
  };

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  });
  return (
    <form onSubmit={handleLogin}>
      {loginFailed && (
        <p className="text-red-500 bg-red-100 p-2 text-center font-semibold rounded-md text-sm mb-2">
          {loginFailed}
        </p>
      )}
      <InputLabel
        label="username"
        type="text"
        name="username"
        ref={usernameRef}
        placeholder="Input your valid username"
      />
      <InputLabel
        label="password"
        type="password"
        name="password"
        placeholder="Input your password"
      />
      <Button classname="bg-sky-600 w-full hover:cursor-pointer" type="submit">
        Login
      </Button>
    </form>
  );
};

export default FormLogin;
