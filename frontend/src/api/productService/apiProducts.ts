import axios from "axios";
import { Review } from "../../types/product";
const API_URL = "http://localhost:8080/";

const addProducts = async (productData: any) => {
  const formData = new FormData();
  formData.append("productName", productData.productName);
  formData.append("productPrice", productData.productPrice);
  formData.append("category", productData.category);
  formData.append("description", productData.description);
  formData.append("image", productData.image);
  formData.append("stock", productData.stock);
  formData.append("ownerId", productData.ownerId);
  try {
    const res = await axios.post(
      `${API_URL}api/products/add-product`,
      formData
    );
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}api/products/get-products`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getProductById = async (id: string | undefined) => {
  try {
    const res = await axios.get(`${API_URL}api/products/get-product/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const addReview = async (review: Review) => {
  console.log(review);
  const commentDTO = {
    userId: review.user.id,
    productId: review.productId,
    rating: review.rating,
    comment: review.comment,
  }
  try {
    const res = await axios.post(`${API_URL}api/products/add-comment`, commentDTO);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export default {
  addProducts,
  getProducts,
  getProductById,
  addReview,
};
