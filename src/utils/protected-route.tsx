import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ jwt, children }: { jwt: string | null, children: ReactNode }) => {
   if (!jwt) {
      return <Navigate to='/auth' replace={true} />;
   }

   return <div>{children}</div>;
}