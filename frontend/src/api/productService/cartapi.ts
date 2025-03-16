
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const addToCart = async (productId: number = 0, userId: number  = 0,quantity : number = 1) => {
  
  try {
    const response = await axios.post(`${apiUrl}api/cart/add-to-cart/${userId}`, null,{
      params : {
        productId,
        quantity
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export default {
  addToCart,
};
