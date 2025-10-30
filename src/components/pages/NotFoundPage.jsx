import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <div className="mb-8">
          <ApperIcon name="Search" size={80} className="text-primary/20 mx-auto mb-4" />
          <h1 className="text-6xl font-display font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-display font-semibold text-primary mb-2">
            Page Not Found
          </h2>
          <p className="text-primary/60 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate("/")}
          className="mx-auto"
        >
          <ApperIcon name="Home" size={20} />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;