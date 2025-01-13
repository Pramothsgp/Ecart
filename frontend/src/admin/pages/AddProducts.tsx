import { useState } from "react";
import { categories } from "../../data/sampleData";
import apiProducts from "../../api/productService/apiProducts";
import { toast } from "react-toastify";



const AddProducts = () => {
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: 0.0,
    category: "",
    description: "",
    image: null,
    stock: 0,
    ownerId: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target;


    if (type === "file" && files) {
      setProductData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setProductData((prevData) => ({
        ...prevData,
        [name]: type === "number" ? parseFloat(value) : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const res = await apiProducts.addProducts(productData);
      const theme = localStorage.getItem("theme");
      toast.success(res),{
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: theme,
      };
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded shadow-md">
      <h1 className="text-xl font-bold mb-4">Add Products</h1>
      <form onChange={handleChange} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium mb-1">
            Product Name:
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            required
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="productPrice" className="block text-sm font-medium mb-1">
            Product Price:
          </label>
          <input
            type=""
            id="productPrice"
            name="productPrice"
            required
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-1">
            Category:
          </label>
          <select
            id="category"
            name="category"
            required
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            required
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded file:text-sm file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label htmlFor="stock" className="block text-sm font-medium mb-1">
            Stock:
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            required
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
