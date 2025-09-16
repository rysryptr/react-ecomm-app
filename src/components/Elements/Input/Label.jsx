const Label = (props) => {
  const { label, children } = props;

  return (
    <label
      htmlFor={label}
      className="block text-gray-700 text-sm font-bold mb-2"
    >
      {children}
    </label>
  );
};

export default Label;
