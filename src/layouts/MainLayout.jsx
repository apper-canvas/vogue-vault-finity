import { Outlet } from "react-router-dom";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/layouts/Root";

const MainLayout = () => {
  const cart = useCart();
  const wishlist = useWishlist();
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet context={{ cart, wishlist, user }} />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;