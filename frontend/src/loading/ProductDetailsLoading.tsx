
const ProductDetailsLoading = () => {
    return (
      <div className="w-4/5 h-[calc(100vh-5rem)] m-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-200 dark:bg-gray-900 flex gap-4 animate-pulse">
        {/* Image Skeleton */}
        <div className="w-1/2 h-full rounded-lg shadow-lg bg-gray-300 dark:bg-gray-700"></div>
  
        {/* Content Skeleton */}
        <div className="w-1/2 h-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-8 overflow-y-auto">
          {/* Title Placeholder */}
          <div className="w-3/4 h-10 bg-gray-300 dark:bg-gray-600 rounded-md mb-6"></div>
  
          {/* Price Placeholder */}
          <div className="w-1/2 h-8 bg-gray-300 dark:bg-gray-600 rounded-md mb-6"></div>
  
          {/* Description Placeholder */}
          <div className="w-full h-4 bg-gray-300 dark:bg-gray-600 rounded-md mb-4"></div>
          <div className="w-5/6 h-4 bg-gray-300 dark:bg-gray-600 rounded-md mb-4"></div>
          <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-600 rounded-md mb-6"></div>
  
          {/* Category Placeholder */}
          <div className="w-1/2 h-6 bg-gray-300 dark:bg-gray-600 rounded-md mb-6"></div>
  
          {/* Buttons Placeholder */}
          <div className="flex justify-between mt-auto">
            <div className="w-1/3 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            <div className="w-1/3 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductDetailsLoading;
  