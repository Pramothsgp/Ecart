import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiProducts from "../api/productService/apiProducts";
import { Product } from "../types/product";
import ProductDetailsLoading from "../loading/ProductDetailsLoading";
import Comments from "./Comments";
import cartapi from "../api/productService/cartapi";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [imageBlobURL, setImageBlobURL] = useState("placeholder.jpg");
  const [loading, setLoading] = useState<boolean>(true);

  const {user} = useContext(AuthContext);
  const addToCart = () => {
    cartapi.addToCart(product?.id , user?.id)
    .then((res) => {
      toast.success("Product added to cart",{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
      });
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
  });
};
  useEffect(() => {
    if (id) {
      setLoading(true);
      apiProducts
        .getProductById(id)
        .then((res) => {
          setProduct(res);
          if (res?.image) {
            const blob = new Blob(
              [Uint8Array.from(atob(res.image), (c) => c.charCodeAt(0))],
              { type: "image/jpeg" }
            );
            const url = URL.createObjectURL(blob);
            setImageBlobURL(url);

          } else {
            setImageBlobURL("placeholder.jpg");
          }
        })
        .finally(() => setLoading(false));
    }
  }, [id]);
  if (loading) {
    return <ProductDetailsLoading />;
  }
  return (
    <div className="w-4/5 h-[calc(100vh-5rem)] m-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-200 dark:bg-gray-900 flex gap-4">
      <div
        className="w-1/2 h-full rounded-lg shadow-lg bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageBlobURL})`,
        }}
      ></div>
    <div className="w-1/2 h-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-8 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-8 overflow-y-auto">
        <h2 className="text-4xl font-bold mb-6">{product?.productName}</h2>
        <h3 className="text-xl font-semibold text-gray-700 dark:text-yellow-400 mb-6">
          Price: ₹ {product?.price}
        </h3>
        <p className="text-lg mb-6 leading-relaxed">{product?.description}</p>
        <p className="text-md font-medium text-gray-500 dark:text-gray-400 mb-6">
          Category: {product?.category}
        </p>
        <div className="flex justify-between mt-auto">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
          onClick={addToCart}>
            Add to Cart
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors dark:bg-green-500 dark:hover:bg-green-600">
            Buy Now
          </button>
        </div>
      </div>
            <div className="h-1/2 rounded-lg shadow-lg bg-no-repeat bg-cover bg-center overflow-x-auto custom-scrollbar">
          {product?.id && <Comments comments={product?.comments} productId={product.id} />}
    </div>
    </div>
    </div>
  );
};

export default ProductDetails;
