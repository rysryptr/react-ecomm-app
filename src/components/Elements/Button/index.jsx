const Button = (props) => {
  const {
    children,
    classname = "bg-black",
    onClick = () => {},
    type = "button",
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-sky-500 rounded-md py-3 px-4 font-medium text-sm text-white ${classname} hover:cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default Button;
