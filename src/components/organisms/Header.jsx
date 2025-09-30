import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import SearchBar from "@/components/molecules/SearchBar";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  const cartCount = getCartCount();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Women", path: "/category/women" },
    { label: "Men", path: "/category/men" },
    { label: "Accessories", path: "/category/accessories" },
    { label: "Sale", path: "/sale" }
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-secondary shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-primary">
                Vogue Vault
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-primary hover:text-accent transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-primary hover:text-accent transition-colors duration-200"
              >
                <ApperIcon name="Search" size={22} />
              </button>

              <button
                onClick={() => navigate("/wishlist")}
                className="relative p-2 text-primary hover:text-accent transition-colors duration-200"
              >
                <ApperIcon name="Heart" size={22} />
                {wishlist.length > 0 && (
                  <Badge
                    variant="accent"
                    className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center"
                  >
                    {wishlist.length}
                  </Badge>
                )}
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 text-primary hover:text-accent transition-colors duration-200"
              >
                <ApperIcon name="ShoppingCart" size={22} />
                {cartCount > 0 && (
                  <Badge
                    variant="accent"
                    className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center"
                  >
                    {cartCount}
                  </Badge>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-primary hover:text-accent transition-colors duration-200"
              >
                <ApperIcon
                  name={mobileMenuOpen ? "X" : "Menu"}
                  size={24}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border-t border-secondary bg-white"
            >
              <div className="max-w-3xl mx-auto px-4 py-6">
                <SearchBar onClose={() => setSearchOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-primary/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl">
              <div className="p-6">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-6 right-6 text-primary hover:text-accent"
                >
                  <ApperIcon name="X" size={24} />
                </button>
                <nav className="mt-12 space-y-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xl font-display font-medium text-primary hover:text-accent transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;