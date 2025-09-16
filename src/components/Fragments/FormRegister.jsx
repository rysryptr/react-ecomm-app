import Button from "../Elements/Button";
import InputLabel from "../Elements/Input";

const FormRegister = () => {
  return (
    <form action="">
      <InputLabel
        label="Full Name"
        type="text"
        name="fullname"
        placeholder="Input your Full Name"
      />
      <InputLabel
        label="Email"
        type="email"
        name="email"
        placeholder="Input your valid email"
      />
      <InputLabel
        label="Password"
        type="password"
        name="password"
        placeholder="Input your password"
      />
      <InputLabel
        label="Password Confirmation"
        type="password"
        name="password"
        placeholder="Input your password confirmation"
      />
      <Button classname="bg-sky-600 w-full">Register</Button>
    </form>
  );
};

export default FormRegister;
