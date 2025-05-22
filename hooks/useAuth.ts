import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState, authLoadingState, authErrorState } from '../atoms/authAtoms';
import { MUTATIONS } from '../graphql/auth';
import { useEffect, useCallback, useRef } from 'react';

export const useAuth = () => {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useRecoilState(authLoadingState);
  const [error, setError] = useRecoilState(authErrorState);
  const resetUser = useResetRecoilState(userState);

  const popupRef = useRef<Window | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

  // Get token from local storage
  const getToken = useCallback(() => localStorage.getItem('auth_token'), []);

  // Generic GraphQL request function
  const graphqlRequest = useCallback(
    async (query: string, variables = {}) => {
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
        console.log('GraphQL Response:', data);

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

  // Check authentication status
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const token = getToken();
      const storedUserData = localStorage.getItem('user_data');

      if (token && storedUserData) {
        try {
          const userData = JSON.parse(storedUserData);
          const email = userData.email;

          const { data } = await graphqlRequest(MUTATIONS.AUTHENTICATED_USER, {
            data: { email },
          });

          if (data?.authenticatedUser?.token) {
            // Update token if a new one is provided
            localStorage.setItem('auth_token', data.authenticatedUser.token);

            const updatedUserData = {
              ...data.authenticatedUser.user,
              shredProfile: data.authenticatedUser.shredProfile,
            };

            // Update stored user data
            localStorage.setItem('user_data', JSON.stringify(updatedUserData));
            setUser(updatedUserData);

            return true;
          } else {
            resetAuth();
            return false;
          }
        } catch (e) {
          console.error('Failed to parse user data or validate session:', e);
          resetAuth();
          return false;
        }
      } else {
        resetAuth();
        return false;
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      resetAuth();
      return false;
    } finally {
      setLoading(false);
    }
  }, [setUser, setLoading, resetUser, graphqlRequest, getToken, resetAuth]);

  // Helper to reset authentication state
  const resetAuth = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    resetUser();
  }, [resetUser]);

  // Login with email/username and password
  const login = async (emailOrUsername: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await graphqlRequest(MUTATIONS.LOGIN, {
        data: {
          identifier: emailOrUsername,
          password,
        },
      });

      if (data?.login?.token) {
        const token = data.login.token;
        const userData = {
          ...data.login.user,
          shredProfile: data.login.shredProfile,
        };

        // Store authentication data
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(userData));

        setUser(userData);
        return data.login;
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      // Generic error message for frontend
      setError('Invalid username or password');
      console.error('Login error:', err);
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  // OAuth login initialization
  const oauth_login = useCallback(async (provider: string) => {
    try {
      setLoading(true);
      setError(null);

      // First determine if we need to use the API-provided URL or direct backend URL
      let redirectUrl;

      try {
        // Try to get the OAuth URL from the API first
        const { data } = await graphqlRequest(MUTATIONS.OAUTH_LOGIN, { provider });
        redirectUrl = data?.oauthRedirect?.url;
      } catch (err) {
        console.warn('Could not get OAuth URL from API, using direct backend URL:', err);
        redirectUrl = `${BACKEND_URL}/auth/${provider}/redirect`;
      }

      if (!redirectUrl) {
        throw new Error(`Failed to get OAuth redirect URL for provider: ${provider}`);
      }

      const width = 375;
      const height = 500;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

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
            clearInterval(intervalRef.current as NodeJS.Timeout);
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
                clearInterval(intervalRef.current as NodeJS.Timeout);
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
  }, [BACKEND_URL, graphqlRequest, setLoading, setError]);

  // OAuth callback handling
  const oauth_callback = useCallback(async (code: string, provider?: string) => {
    try {
      setLoading(true);
      setError(null);

      const variables = provider
        ? { input: { code, provider } }
        : { input: { code } };

      const { data } = await graphqlRequest(MUTATIONS.OAUTH_CALLBACK, variables);

      const tokenData = data?.exchangeToken;
      if (tokenData?.token) {
        const token = tokenData.token;
        const userData = {
          ...tokenData.user,
          shredProfile: tokenData.shredProfile,
        };

        // Store in local storage
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(userData));
        setUser(userData);

        console.log('OAuth login successful:', userData.username || userData.email);
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
  }, [graphqlRequest, setUser, setError, setLoading]);

  // Signup function
  const signup = async (username: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await graphqlRequest(MUTATIONS.CREATE_USER, {
        input: {
          username,
          email,
          password,
          is_mail_blocked: false  // Add the required field
        },
      });

      if (data?.createUser?.token) {
        const token = data.createUser.token;
        const userData = {
          ...data.createUser.user,
          shredProfile: data.createUser.shredProfile,
        };

        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(userData));

        setUser(userData);
        return data.createUser;
      } else {
        throw new Error('Signup failed');
      }
    } catch (err) {
      // Generic error message for frontend
      setError('Signup failed. Please check your information and try again.');
      console.error('Signup error:', err);
      throw new Error('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = useCallback(async () => {
    try {
      setLoading(true);

      const storedUserData = localStorage.getItem('user_data');
      if (storedUserData) {
        try {
          const userData = JSON.parse(storedUserData);
          const email = userData.email;

          await graphqlRequest(MUTATIONS.LOGOUT, {
            data: { email },
          });
        } catch (e) {
          console.error('Failed to parse user data for logout:', e);
        }
      }
    } catch (err) {
      console.error('Logout API call failed, proceeding with local cleanup:', err);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      resetUser();
      setLoading(false);
      setError(null);
    }
  }, [graphqlRequest, resetUser, setLoading, setError]);

  // Check authentication validity
  const checkAuthValidity = useCallback(async () => {
    const token = getToken();
    if (!token) {
      resetUser();
      return false;
    }

    try {
      const result = await checkAuth();
      return !!user;
    } catch (err) {
      console.error('Token validation failed:', err);
      logout();
      return false;
    }
  }, [getToken, resetUser, logout, checkAuth, user]);

  // Initialize auth on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUserData = localStorage.getItem('user_data');
        const storedToken = localStorage.getItem('auth_token');

        if (storedUserData && storedToken) {
          try {
            // First set the user from localStorage to avoid flicker
            const userData = JSON.parse(storedUserData);
            setUser(userData);
            console.log('User restored from local storage:', userData.username || userData.email);

            // Then validate with server (important for session persistence)
            await checkAuth();
          } catch (e) {
            console.error('Failed to parse user data from local storage:', e);
            resetAuth();
          }
        } else {
          console.log('No auth data found in local storage');
          resetAuth();
        }
      } catch (err) {
        console.error('Authentication initialization error:', err);
        resetAuth();
      } finally {
        setLoading(false);
      }
    };

    // Run auth initialization
    initializeAuth();

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (popupRef.current) popupRef.current.close();
    };
  }, [setUser, resetAuth, setLoading, checkAuth]);

  return {
    user,
    loading,
    error,
    login,
    signup,
    oauth_login,
    oauth_callback,
    logout,
    checkAuth,
    checkAuthValidity,
  };
};
