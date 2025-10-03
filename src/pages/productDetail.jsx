import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../services/products.service";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProductDetail(id, (data) => {
      setProduct(data);
    });
  }, [id]);

  return (
    <>
      <div className="flex min-h-screen w-full max-w-4xl items-center justify-center mx-auto gap-4">
        {Object.keys(product).length > 0 && (
          <>
            <div className="max-w-lg max-h-10/12">
              <img src={product.image} alt="" />
            </div>
            <div className="flex flex-col w-full max-w-lg gap-4">
              <div className="flex w-full justify-between">
                <p className="font-bold text-lg">{product.title}</p>
                <p className="font-light text-lg">${product.price}</p>
              </div>
              <p className="text-sm">
                Rating: {product.rating.rate}/5 <b>({product.rating.count})</b>
              </p>
              <div className="flex w-full gap-4">
                <div className="w-10 h-10 text-white bg-black rounded-lg flex items-center justify-center">
                  S
                </div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  M
                </div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  L
                </div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  XL
                </div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  XXL
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-medium">Description</h3>
                <p className="text-gray-500 text-md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatem quasi est atque corrupti suscipit placeat
                  praesentium non asperiores obcaecati temporibus.
                </p>
              </div>
              <button className="w-full bg-black p-2 text-white rounded-lg">
                Add to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetailPage;
