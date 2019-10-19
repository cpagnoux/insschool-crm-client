import { useEffect, useState } from 'react';

import { useTokenContext } from '../store';
import { AuthAPI } from '.';

const useAuthenticationStatus = () => {
  const [token] = useTokenContext();
  const [isAuthenticated, setIsAuthenticated] = useState();

  // Check existence and validity of access token.
  useEffect(() => {
    const verifyToken = async (accessToken: string) => {
      try {
        const res = await AuthAPI.me(accessToken);
        setIsAuthenticated(res.status === 200);
      } catch (e) {
        setIsAuthenticated(false);
      }
    };

    if (!token) {
      return;
    }

    if (!token.access_token) {
      setIsAuthenticated(false);
      return;
    }

    verifyToken(token.access_token);
  }, [token]);

  return isAuthenticated;
};

export default useAuthenticationStatus;
