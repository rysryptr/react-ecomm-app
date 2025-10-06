import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { DarkMode } from "../../contexts/DarkMode";

const TableCart = (props) => {
  const { products } = props;
  const cart = useSelector((state) => state.cart.data);
  const [totalPrice, setTotalPrice] = useState(0);
  const totalPriceRef = useRef(null);
  const { isDarkMode } = useContext(DarkMode);

  useEffect(() => {
    if (cart.length > 0 && products.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + item.qty * product.price;
      }, 0);

      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);

  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  }, [cart]);

  return (
    <table
      className={`w-full text-left p-2 text-sm border-separate border-spacing-2 table-auto border-spacing-x-5 rounded-lg ${
        isDarkMode && "text-white bg-slate-800"
      }`}
    >
      <tbody>
        {products.length > 0 &&
          cart.map((item) => {
            const product = products.find((product) => product.id === item.id);
            return (
              <>
                <tr key={item.id}>
                  <td rowSpan={2}>
                    <img src={product.image} alt="product" className="w-10" />
                  </td>
                  <td colSpan={3}>
                    <p>{product.title.substring(0, 40)}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    Price:{" "}
                    <b>
                      ${" "}
                      {product.price.toLocaleString("id-ID", {
                        styles: "currency",
                        currency: "IDR",
                      })}
                    </b>
                  </td>
                  <td>
                    Qty: <b>{item.qty}</b>
                  </td>
                  <td>
                    <b>
                      ${" "}
                      {(item.qty * product.price).toLocaleString("id-ID", {
                        styles: "currency",
                        currency: "IDR",
                      })}
                    </b>
                  </td>
                </tr>
              </>
            );
          })}
        <tr ref={totalPriceRef}>
          <td colSpan={3}>
            <b>Total Price</b>
          </td>
          <td>
            <b>
              ${" "}
              {totalPrice.toLocaleString("id-ID", {
                styles: "currency",
                currency: "IDR",
              })}
            </b>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableCart;
