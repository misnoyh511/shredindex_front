import { useRecoilState, useResetRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import { userState, authLoadingState, authErrorState } from '../atoms/authAtoms';
import { MUTATIONS } from '../graphql/auth';
import { useEffect, useCallback, useRef } from 'react';

export const useAuth = () => {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useRecoilState(authLoadingState);
  const [error, setError] = useRecoilState(authErrorState);
  const resetUser = useResetRecoilState(userState);

  const popupRef = useRef(null);
  const intervalRef = useRef(null);

  const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

  // Get token from local storage
  const getToken = useCallback(() => localStorage.getItem('auth_token'), []);

  // Generic GraphQL request function
  const graphqlRequest = useCallback(
    async (query, variables = {}) => {
      const token = getToken();
      if (!API_URL) {
        throw new Error('API URL is not configured');
      }
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({ query, variables }),
        });
        const data = await response.json();
        if (data.errors) {
          throw new Error(data.errors[0]?.message || 'GraphQL Error');
        }
        return data;
      } catch (err) {
        console.error('GraphQL request failed:', err);
        throw err;
      }
    },
    [API_URL, getToken]
  );

  // Restore user state from local storage on mount
  useEffect(() => {
    const initializeAuth = () => {
      const storedUserData = localStorage.getItem('user_data');
      const storedToken = localStorage.getItem('auth_token');
      if (storedUserData && storedToken) {
        try {
          const userData = JSON.parse(storedUserData);
          setUser(userData);
          console.log('User restored from local storage:', userData.username);
        } catch (e) {
          console.error('Failed to parse user data from local storage:', e);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user_data');
          resetUser();
        }
      } else {
        console.log('No auth data found in local storage');
      }
      setLoading(false); // Ensure loading is false after initialization
    };

    initializeAuth();

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (popupRef.current) popupRef.current.close();
    };
  }, [setUser, resetUser, setLoading]);

  // OAuth login function
  const oauth_login = useCallback(
    async (provider) => {
      try {
        setLoading(true);
        setError(null);

        const width = 375;
        const height = 500;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;

        const redirectUrl = `${BACKEND_URL}/auth/${provider}/redirect`;

        // Clean up any existing popup
        if (popupRef.current) popupRef.current.close();
        if (intervalRef.current) clearInterval(intervalRef.current);

        popupRef.current = window.open(
          redirectUrl,
          'OAuth Login',
          `width=${width},height=${height},top=${top},left=${left},location=yes,toolbar=no,menubar=no`
        );

        if (!popupRef.current) {
          throw new Error('Popup blocked. Please allow popups for this site.');
        }

        return new Promise((resolve, reject) => {
          intervalRef.current = setInterval(() => {
            if (!popupRef.current || popupRef.current.closed) {
              clearInterval(intervalRef.current);
              setLoading(false);
              reject(new Error('OAuth window closed before completion'));
              return;
            }

            try {
              const currentUrl = popupRef.current.location.href;
              if (currentUrl && currentUrl.includes('code=')) {
                const url = new URL(currentUrl);
                const code = url.searchParams.get('code');
                if (code) {
                  clearInterval(intervalRef.current);
                  popupRef.current.close();
                  popupRef.current = null;
                  oauth_callback(code, provider)
                    .then(resolve)
                    .catch(reject);
                }
              }
            } catch (e) {
              // Ignore cross-origin errors; assume redirect is in progress
            }
          }, 500);

          // Timeout after 2 minutes
          setTimeout(() => {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              if (popupRef.current) popupRef.current.close();
              setLoading(false);
              reject(new Error('OAuth login timed out'));
            }
          }, 120000);
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'OAuth login failed');
        setLoading(false);
        throw err;
      }
    },
    [BACKEND_URL, oauth_callback]
  );

  // OAuth callback function
  const oauth_callback = useCallback(
    async (code, provider) => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await graphqlRequest(MUTATIONS.OAUTH_CALLBACK, {
          input: { code, provider },
        });

        if (data?.exchangeToken?.token) {
          const token = data.exchangeToken.token;
          const userData = {
            ...data.exchangeToken.user,
            shredProfile: data.exchangeToken.shredProfile,
          };

          // Store in local storage
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_data', JSON.stringify(userData));
          setUser(userData);

          console.log('OAuth login successful:', userData.username);
          return true;
        } else {
          throw new Error('No token received from OAuth callback');
        }
      } catch (err) {
        console.error('OAuth callback failed:', err);
        setError(err instanceof Error ? err.message : 'OAuth callback failed');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [graphqlRequest, setUser, setError, setLoading]
  );

  // Logout function
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await graphqlRequest(MUTATIONS.LOGOUT);
      console.log('Logout successful');
    } catch (err) {
      console.error('Logout API call failed, proceeding with local cleanup:', err);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      resetUser();
      setLoading(false);
      setError(null);
      window.location.reload(); // Reset app state
    }
  }, [graphqlRequest, resetUser, setLoading, setError]);

  // Optional: Validate token periodically or on critical actions
  const checkAuthValidity = useCallback(async () => {
    const token = getToken();
    if (!token) {
      resetUser();
      return false;
    }
    try {
      // Add a lightweight "me" query if your API supports it
      // const { data } = await graphqlRequest(MUTATIONS.ME);
      // if (!data?.me) throw new Error('Invalid token');
      return true;
    } catch (err) {
      console.error('Token validation failed:', err);
      logout();
      return false;
    }
  }, [getToken, resetUser, logout]); // Uncomment and adjust if you add a ME query

  return {
    user,
    loading,
    error,
    oauth_login,
    logout,
    checkAuthValidity, // Optional, use as needed
  };
};
