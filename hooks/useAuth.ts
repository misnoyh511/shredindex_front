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
  const intervalRef = useRef<NodeJS.Timeout>();

  const API_URL = process.env.NEXT_DEVELOPMENT_GRAPHQL_ENDPOINT || process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  const BACKEND_URL = process.env.NEXT_DEVELOPMENT_API_URL || process.env.NEXT_PUBLIC_API_URL;

  const graphqlRequest = async (query: string, variables = {}) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('token') && {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const data = await response.json();
    console.log('GraphQL Response:', data);

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data;
  };

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const identifier = localStorage.getItem('userIdentifier');

      if (token && identifier) {
        const { data } = await graphqlRequest(MUTATIONS.AUTHENTICATED_USER, {
          data: { email: identifier },
        });

        if (data?.authenticatedUser?.token) {
          setUser({
            ...data.authenticatedUser.user,
            shredProfile: data.authenticatedUser.shredProfile,
          });
        } else {
          resetUser();
        }
      } else {
        resetUser();
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      localStorage.removeItem('token');
      localStorage.removeItem('userIdentifier');
      resetUser();
    } finally {
      setLoading(false);
    }
  }, [setUser, setLoading, resetUser]);

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
        localStorage.setItem('token', data.login.token);
        localStorage.setItem('userIdentifier', data.login.user.email);
        setUser({
          ...data.login.user,
          shredProfile: data.login.shredProfile,
        });
        return data.login;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const oauth_login = async (provider: string) => {
    try {
      setLoading(true);
      setError(null);

      const width = 375;
      const height = 500;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const redirectUrl = `${BACKEND_URL}/auth/${provider}/redirect`;
      
      if (popupRef.current) {
        popupRef.current.close();
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      popupRef.current = window.open(
        redirectUrl,
        'OAuth Login',
        `width=${width},height=${height},top=${top},left=${left},location=yes,toolbar=no,menubar=no`,
      );

      if (!popupRef.current) {
        throw new Error('Popup was blocked. Please allow popups for this site.');
      }

      intervalRef.current = setInterval(() => {
        try {
          if (!popupRef.current || popupRef.current.closed) {
            clearInterval(intervalRef.current);
            setLoading(false);
            return;
          }

          const currentUrl = popupRef.current.location.href;

          if (currentUrl && currentUrl.includes('code=')) {
            const url = new URL(currentUrl);
            const code = url.searchParams.get('code');

            if (code) {
              clearInterval(intervalRef.current);
              popupRef.current.close();
              oauth_callback(code, provider);
            }
          }
        } catch (e) {
          // Ignore cross-origin errors - these are expected until the redirect completes
        }
      }, 500);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  };

  const oauth_callback = async (code: string, provider: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data } = await graphqlRequest(MUTATIONS.OAUTH_CALLBACK, {
        input: { code, provider },
      });

      if (data?.exchangeToken?.token) {
        localStorage.setItem('token', data.exchangeToken.token);
        localStorage.setItem('userIdentifier', data.exchangeToken.user.email ?? data.exchangeToken.user.username);
        setUser({
          ...data.exchangeToken.user,
          shredProfile: data.exchangeToken.shredProfile,
        });
        return true;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string, is_mail_blocked:boolean) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await graphqlRequest(MUTATIONS.CREATE_USER, {
        input: { username, email, password, is_mail_blocked },
      });

      if (data?.createUser?.token) {
        localStorage.setItem('token', data.createUser.token);
        localStorage.setItem('userIdentifier', data.createUser.user.email);
        setUser({
          ...data.createUser.user,
          shredProfile: data.createUser.shredProfile,
        });
        return data.createUser;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const identifier = localStorage.getItem('userIdentifier');
      if (identifier) {
        await graphqlRequest(MUTATIONS.LOGOUT, {
          data: { email: identifier },
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('userIdentifier');
      resetUser();
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && !user) {
        checkAuth();
      }
    }
  }, [checkAuth, user]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (popupRef.current) {
        popupRef.current.close();
      }
    };
  }, []);

  return {
    user,
    loading,
    error,
    login,
    oauth_login,
    oauth_callback,
    signup,
    logout,
    checkAuth,
  };
};
