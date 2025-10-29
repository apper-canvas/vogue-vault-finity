import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "@/store/userSlice";
export const useAuth = () => {
const dispatch = useDispatch();
  const { user, isAuthenticated, isInitialized } = useSelector((state) => state.user);

  const logout = async () => {
    try {
      if (window.ApperSDK?.ApperUI) {
        await window.ApperSDK.ApperUI.logout();
      }
      dispatch(clearUser());
    } catch (error) {
      console.error("Logout error:", error);
      dispatch(clearUser());
    }
  };

  return {
    user,
    loading: !isInitialized,
    logout,
    isAuthenticated
  };
};