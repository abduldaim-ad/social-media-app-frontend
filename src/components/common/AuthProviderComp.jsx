import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Context
import { AuthProvider } from '../../context';

// Custom Hooks
import useAuth from '../../hooks/useAuth';

const AuthProviderComp = ({ children }) => {

  const navigate = useNavigate();

  const data = useAuth();
  console.log("Hererere", data);

  // useEffect(() => {
  //   console.log("Hererere1", data);
  //   if (!data.token) {
  //     navigate('/login');
  //   }
  // }, [data])

  return (
    <>
      {
        data && data.user && data.token && (
          <AuthProvider value={data}>
            {children}
          </AuthProvider>
        )
      }
    </>
  )
}

export default AuthProviderComp;