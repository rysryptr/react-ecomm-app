import { Link } from "react-router-dom";
import Button from "../Elements/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

const CardProducts = (props) => {
  const { children } = props;
  return (
    <div className="w-full max-w-sm border border-gray-200 rounded-lg shadow flex flex-col justify-between">
      {children}
    </div>
  );
};

const Header = (props) => {
  const { image, id } = props;
  return (
    <Link to={`/product/${id}`}>
      <img
        src={image}
        alt="product"
        className="p-8 rounded-t-lg w-full h-60 object-cover"
      />
    </Link>
  );
};

const Body = (props) => {
  const { title, children } = props;
  return (
    <div className="px-5 pb-5 h-full">
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-slate-800 mb-4">
          {title.substring(0, 30)}...
        </h5>
        <p className="text-md text-gray-600">{children.substring(1, 100)}...</p>
      </a>
    </div>
  );
};

const Footer = (props) => {
  const { price, id } = props;
  const dispatch = useDispatch();
  return (
    <div className="px-5 pb-5 flex items-center justify-between text-slate-800">
      <span className="text-lg font-semibold">
        ${" "}
        {price.toLocaleString("id-ID", { styles: "currency", currency: "IDR" })}
      </span>
      <Button
        className="bg-sky-500 py-2 px-4 text-sm"
        onClick={() => dispatch(addToCart({ id, qty: 1 }))}
      >
        Add To Cart
      </Button>
    </div>
  );
};

CardProducts.Header = Header;
CardProducts.Body = Body;
CardProducts.Footer = Footer;

export default CardProducts;
