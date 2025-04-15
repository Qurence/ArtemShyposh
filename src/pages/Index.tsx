import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This page is just a redirect to Home
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/");
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p>Redirecting...</p>
      </div>
    </div>
  );
};

export default Index;
