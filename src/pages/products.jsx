import { useEffect, useRef, useState } from "react";
import CardProducts from "../components/Fragments/CardProducts";
import { getProduct } from "../services/products.service";
import { getUsername } from "../services/login.service";
import { useLogin } from "../hooks/useLogin";

const ProductsPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);

  const handleLogout = () => {
    window.location.href = "/login";
    localStorage.removeItem("token");
  };

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const username = useLogin();

  useEffect(() => {
    getProduct((data) => {
      setProducts(data);
    });
  });

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

  const handleAddToCart = (id) => {
    if (cart.find((item) => item.id === id)) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, qty: (item.qty += 1) } : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id,
          qty: 1,
        },
      ]);
    }
  };

  const totalPriceRef = useRef(null);

  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
    }
  }, [cart]);

  return (
    <>
      <div className="bg-black flex justify-end items-center py-4 px-8 gap-4">
        <p className="text-white font-light">{username}</p>
        <button
          className="bg-slate-800 rounded-md py-2 px-4 text-white hover:cursor-pointer font-medium"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="flex justify-center gap-4 mt-4 px-4">
        <div className="flex flex-wrap w-6/8 gap-4">
          {products.length > 0 &&
            products.map((product) => (
              <CardProducts key={product.id}>
                <CardProducts.Header id={product.id} image={product.image} />
                <CardProducts.Body title={product.title}>
                  {product.description}
                </CardProducts.Body>
                <CardProducts.Footer
                  price={product.price}
                  id={product.id}
                  handleAddToCart={handleAddToCart}
                />
              </CardProducts>
            ))}
        </div>
        <div className="w-2/8">
          <h1 className="text-xl font-semibold mb-4">Cart</h1>
          <table className="w-full text-left text-sm border-separate border-spacing-2 table-auto border-spacing-x-5">
            {/* <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead> */}
            <tbody>
              {products.length > 0 &&
                cart.map((item) => {
                  const product = products.find(
                    (product) => product.id === item.id
                  );
                  return (
                    <>
                      <tr key={item.id}>
                        <td rowSpan={2}>
                          <img
                            src={product.image}
                            alt="product"
                            className="w-10"
                          />
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
                            {(item.qty * product.price).toLocaleString(
                              "id-ID",
                              {
                                styles: "currency",
                                currency: "IDR",
                              }
                            )}
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
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
