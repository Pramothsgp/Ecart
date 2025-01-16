import { Star } from "lucide-react";

const ProductCardLoading = () => {
  return (
    <div className="w-72 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-4 animate-pulse">
      
      <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
      
      <div className="p-4">
        <div className="w-3/4 h-6 bg-gray-300 dark:bg-gray-600 rounded-md mb-4"></div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="h-5 w-5 text-gray-400 dark:text-gray-600" />
            <span className="ml-2 w-12 h-4 bg-gray-300 dark:bg-gray-600 rounded"></span>
          </div>
          <span className="w-10 h-4 bg-gray-300 dark:bg-gray-600 rounded"></span>
        </div>

        <div className="flex justify-between items-center">
          <div className="w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="w-24 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardLoading;
