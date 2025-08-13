// components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import React from 'react';

interface ProtectedRouteProps {
  condition: boolean;
  redirectTo?: string;
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  condition,
  redirectTo = '/',
  children,
}) => {
  if (!condition) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
