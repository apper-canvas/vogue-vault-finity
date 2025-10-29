import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary to-background px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center">
            <ApperIcon 
              name="AlertCircle" 
              size={48} 
              className="text-accent"
            />
          </div>
        </div>
        
        <h1 className="text-6xl font-display font-bold text-primary">404</h1>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-display font-semibold text-primary">
            Page Not Found
          </h2>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button
            onClick={() => navigate('/')}
            className="bg-primary text-white hover:bg-primary/90"
          >
            Go to Homepage
          </Button>
          <Button
            onClick={() => navigate(-1)}
            className="bg-secondary text-primary hover:bg-secondary/80"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;