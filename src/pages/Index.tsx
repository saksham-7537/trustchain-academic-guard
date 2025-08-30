// This page redirects to the main landing page

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to landing page
    navigate('/', { replace: true });
  }, [navigate]);

  return null;
};

export default Index;
