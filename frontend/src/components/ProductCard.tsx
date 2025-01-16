import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }: any) => {
  const navigate = useNavigate();
  const timeDiff = () => {
    const now = new Date();
    const diff = now.getTime() - product.addedTime;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  };
  const timeAgo = timeDiff();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-4">
      <div
        className="w-full h-64 bg-center bg-contain bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(data:image/jpeg;base64,${product.image})`,
        }}
      ></div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
              {product.rating}
            </span>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
            {timeAgo}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ₹{product.price}
          </span>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => navigate(`/home/products/${product.id}`)}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
