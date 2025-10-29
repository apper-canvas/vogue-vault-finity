import { useSearchParams, Link } from 'react-router-dom';

const ErrorPage = () => {
  const [searchParams] = useSearchParams();
  const errorMessage = searchParams.get('message') || 'An error occurred';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-surface rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-error mb-4">Authentication Error</h1>
        <p className="text-primary/70 mb-6">{errorMessage}</p>
        <Link to="/login" className="inline-block px-6 py-3 bg-accent text-white rounded hover:brightness-110 transition-all">
          Return to Login
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;