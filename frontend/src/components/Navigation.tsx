import { MoonStar, ShoppingCart, SunMoon } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


const Navigation = () => {
  const [theme, setTheme] = useState<string |null >("light");
  useEffect(()=>{
    const theme = localStorage.getItem("theme");
    setTheme(theme);
  })

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (theme) {
      document.documentElement.classList.remove(theme);
    }
    document.documentElement.classList.add(newTheme); 
  };
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/home" className="ml-4 text-xl font-bold text-gray-800 dark:text-white hover:underline">E-Shop</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/home/my-orders" className="relative dark:text-white">Orders</Link>
              {theme === 'light' ?(
                <MoonStar className="h-6 w-6 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200" 
                onClick={toggleTheme} />
              ):(
              <SunMoon
                className="h-6 w-6 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-700"
                onClick={toggleTheme}
              />
              )}
              <Link to="/home/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link>
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

  )
}

export default Navigation