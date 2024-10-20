import React, { useState, useEffect } from 'react';
import {
  CModal,
  CModalHeader,
  CModalBody,
  CButton,
  CForm,
  CFormInput,
  CFormCheck,
  CCollapse,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react';
import { showLoginTray } from '../../atoms/showLoginTray';
import { useRecoilState } from 'recoil';
import { loggedInUserProfile } from '../../atoms/userProfile';
import { CIcon } from '@coreui/icons-react';
import {
  cibFacebookF,
  cilChevronBottom,
} from '@coreui/icons';
import useWindowDimensions from '../../hooks/getWindowDimensions';
import breakpoints from '@/js/components/config/breakpoints';
import { googleIcon, xLogo } from '../../icons/awesomeIcons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { postLoginAction } from '../../atoms/postLoginAction';
import { showMembershipTray } from '../../atoms/showMembershipTray';
import { mockProfiles } from '../../mocks/UserMocks';

const LoginModal: React.FC = () => {
  const { width } = useWindowDimensions();
  const [, setUserProfile] = useRecoilState(loggedInUserProfile);
  const [postLoginActionState, setPostLoginAction] = useRecoilState(postLoginAction);
  const [, setShowMembershipModal] = useRecoilState(showMembershipTray);
  const [showLoginState, setShowLoginState] = useRecoilState(showLoginTray);
  const visible = showLoginState !== null;
  const [isSigningUp, setIsSigningUp] = useState(showLoginState === 'signup');
  const [visibleEmail, setVisibleEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [acceptEmails, setAcceptEmails] = useState(true);

  const router = useRouter();
  const backendBaseUrl = 'https://your-backend-url.com';

  const TermsConditionsLabel = () => (
    <span>
      I&apos;ve read the <Link href="/terms-and-conditions">Terms and Conditions</Link>, I agree, now let me ski!
    </span>
  );

  useEffect(() => {
    if (showLoginState === 'signup') {
      setIsSigningUp(true);
    } else if (showLoginState === 'login') {
      setIsSigningUp(false);
    }
  }, [showLoginState]);

  const handleSuccess = () => {

    // Get UserProfileData then store it for use.
    setUserProfile(mockProfiles.janedoe);
    if (postLoginActionState === 'showMembershipModal') {
      setShowMembershipModal(true);
    }
    setShowLoginState(null);
    setPostLoginAction(null);
  };


  const handleOAuthSignIn = async (provider: string) => {
    try {
      // Call your Next.js API route that will initiate the OAuth flow with October CMS
      const response = await fetch(`/api/auth/${provider}`);
      const data = await response.json();

      if (response.ok) {
        // If the API route returns a URL, redirect the user to it
        if (typeof window !== 'undefined' && data.url) {
          router.push(data.url);
        } else {
          // Handle successful authentication
          handleSuccess();
        }
      } else {
        // Handle errors
        setErrorMessage(data.message || 'Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('OAuth Sign-in error:', error);
      setErrorMessage('An error occurred during authentication');
    }
  };

  const handleEmailAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    if (isSigningUp && !acceptTerms) {
      setErrorMessage('You must accept the terms and conditions to sign up.');
      return;
    }

    try {
      const endpoint = isSigningUp ? '/api/auth/register' : '/api/auth/login';

      const response = await fetch(`${backendBaseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          acceptTerms,
          acceptEmails,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        handleSuccess();
      } else {
        setErrorMessage(data.message || 'Authentication failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred during authentication');
    }
  };

  return (
    <>
      <CModal
        className="login"
        fullscreen="xl"
        alignment="center"
        visible={visible}
        onClose={() => setShowLoginState(null)}
      >
        {width < breakpoints.md && (
          <CModalHeader>
            <h5>
              {isSigningUp ? 'Sign Up' : 'Login'}
            </h5>
          </CModalHeader>
        )}
        <CModalBody>
          <div className="login-body-wrap">
            <div className="login-email-button-wrap">
              <CNav
                className="justify-content-evenly mb-4"
                variant="underline"
              >
                <CNavItem>
                  <CNavLink
                    href="#"
                    active={isSigningUp}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSigningUp(true);
                    }}
                  >
                    <span className={'tab-underline'}>
                      Sign up
                    </span>
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    href="#"
                    active={!isSigningUp}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSigningUp(false);
                    }}
                  >
                    <span className={'tab-underline'}>
                      Login
                    </span>
                  </CNavLink>
                </CNavItem>
              </CNav>
              <div className="login-button-group-wrap">
                <CButton
                  color="warning"
                  className="mb-2 w-100"
                  disabled={!acceptTerms && isSigningUp}
                  onClick={() => {
                    handleSuccess();
                  }}
                >
                  Sign in fake user
                </CButton>

                <CButton
                  color="light"
                  className="mb-2 w-100"
                  disabled={!acceptTerms && isSigningUp}
                  onClick={() => handleOAuthSignIn('google')}
                >
                  <CIcon icon={googleIcon} className="me-2" />
                  Continue with Google
                </CButton>
                <CButton
                  color="dark"
                  disabled={!acceptTerms && isSigningUp}
                  className="facebook mb-2 w-100"
                  onClick={() => handleOAuthSignIn('facebook')}
                >
                  <CIcon icon={cibFacebookF} className="me-2" />
                  Continue with Facebook
                </CButton>
                <CButton
                  color="dark"
                  disabled={!acceptTerms && isSigningUp}
                  className="x-logo mb-4 w-100"
                  onClick={() => handleOAuthSignIn('x')}
                >
                  <CIcon icon={xLogo} className={'me-2'} />
                  Continue with X
                </CButton>
              </div>

              {errorMessage && (
                <div style={{ color: 'red', marginBottom: '1rem' }}>
                  {errorMessage}
                </div>
              )}

              <CButton
                className="mb-3"
                color="link"
                onClick={() => setVisibleEmail(!visibleEmail)}
                aria-expanded={visibleEmail}
                aria-controls="collapseWidthExample"
              >
                <CIcon
                  icon={cilChevronBottom}
                  className={`me-2 icon-chevron ${visibleEmail && 'rotate-up'}`}
                />
                {!visibleEmail ? 'Or via email...' : 'Show less'}
              </CButton>
              <CCollapse id="collapseWidthExample" visible={visibleEmail}>
                <hr />
                <div className="login-email-wrap">
                  <CForm onSubmit={handleEmailAuth}>
                    {isSigningUp && (
                      <CFormInput
                        type="name"
                        name="name"
                        disabled={!acceptTerms && isSigningUp}
                        placeholder="Name"
                        className="mb-3"
                        required
                      />
                    )}
                    <CFormInput
                      type="email"
                      name="email"
                      disabled={!acceptTerms && isSigningUp}
                      placeholder="Email"
                      className="mb-3"
                      required
                    />
                    <CFormInput
                      type="password"
                      name="password"
                      disabled={!acceptTerms && isSigningUp}
                      placeholder="Password"
                      className="mb-3"
                      required
                    />
                    <CButton
                      type="submit"
                      color="success"
                      disabled={!acceptTerms && isSigningUp}
                      className="w-100"
                    >
                      {isSigningUp ? 'Sign Up' : 'Login'}
                    </CButton>
                  </CForm>
                </div>
              </CCollapse>

              {isSigningUp && (
                <div className="mt-3">
                  <CFormCheck
                    id="acceptTerms"
                    label={<TermsConditionsLabel />}
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mb-2 small"
                  />
                  <CFormCheck
                    id="acceptEmails"
                    label="Yes, avalanche my inbox! Email me the good stuff."
                    checked={acceptEmails}
                    onChange={(e) => setAcceptEmails(e.target.checked)}
                    className="mb-2 small"
                  />
                </div>
              )}
            </div>
          </div>
        </CModalBody>
      </CModal>
    </>
  );
};

export default LoginModal;
