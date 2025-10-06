import { useEffect, useState } from "react";
import CardProducts from "../components/Fragments/CardProducts";
import { getProduct } from "../services/products.service";
import { useLogin } from "../hooks/useLogin";
import TableCart from "../components/Fragments/TableCart";
import Navbar from "../components/Layouts/Navbar";

const ProductsPage = () => {
  const [cart, setCart] = useState([]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  useLogin();

  useEffect(() => {
    getProduct((data) => {
      setProducts(data);
    });
  });

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

  return (
    <>
      <Navbar />
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
          <TableCart products={products} />
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
