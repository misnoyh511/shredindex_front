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
  CSpinner,
} from '@coreui/react';
import { useRecoilState } from 'recoil';
import { CIcon } from '@coreui/icons-react';
import {
  cibFacebookF,
  cilChevronBottom,
} from '@coreui/icons';
import { googleIcon, xLogo } from '../../icons/awesomeIcons';
import Link from 'next/link';
import { showLoginTray } from '../../atoms/showLoginTray';
import { showMembershipTray } from '../../atoms/showMembershipTray';
import { postLoginAction } from '../../atoms/authAtoms';
import useWindowDimensions from '../../hooks/getWindowDimensions';
import breakpoints from '@/js/components/config/breakpoints';
import { useAuth } from '../../hooks/useAuth';

const LoginModal: React.FC = () => {
  const { width } = useWindowDimensions();
  const { login, signup, oauth_login, error: authError, loading, user } = useAuth();
  const [showLoginState, setShowLoginState] = useRecoilState(showLoginTray);
  const [postLoginActionState, setPostLoginAction] = useRecoilState(postLoginAction);
  const [, setShowMembershipModal] = useRecoilState(showMembershipTray);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const visible = showLoginState !== null;
  const [isSigningUp, setIsSigningUp] = useState(showLoginState === 'signup');
  const [visibleEmail, setVisibleEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [acceptEmails, setAcceptEmails] = useState(true);
  const [validated, setValidated] = useState(false);

  const TermsConditionsLabel = () => (
    <span>
      I&apos;ve read the <Link href="/terms-and-conditions">Terms and Conditions</Link>, I agree, now let me ski!
    </span>
  );

  const handleSuccess = () => {
    if (postLoginActionState === 'showMembershipModal') {
      setShowMembershipModal(true);
    }
    setShowLoginState(null);
    setPostLoginAction(null);
    setIsAuthenticating(false);
  };

  useEffect(() => {
    if (user && isAuthenticating) {
      handleSuccess();
    }
  }, [user, isAuthenticating, postLoginActionState]);

  const handleOAuthSignIn = async (provider: string) => {
    try {
      setIsAuthenticating(true);
      setErrorMessage('');
      await oauth_login(provider);
    } catch (error) {
      console.error('OAuth Sign-in error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred during authentication');
      setIsAuthenticating(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (isSigningUp && !acceptTerms) {
      setErrorMessage('You must accept the terms and conditions to sign up.');
      return;
    }

    setIsAuthenticating(true);
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      if (isSigningUp) {
        const username = (form.elements.namedItem('username') as HTMLInputElement).value;
        await signup(username, email, password);
      } else {
        await login(email, password);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Authentication failed');
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    if (showLoginState === 'signup') {
      setIsSigningUp(true);
    } else if (showLoginState === 'login') {
      setIsSigningUp(false);
    }
  }, [showLoginState]);

  useEffect(() => {
    if (authError) {
      setErrorMessage(authError);
      setIsAuthenticating(false);
    }
  }, [authError]);

  const handleCloseModal = () => {
    setShowLoginState(null);
    setIsAuthenticating(false);
    setErrorMessage('');
    setValidated(false);
  };

  if (isAuthenticating) {
    return (
      <CModal
        className="login"
        fullscreen="xl"
        alignment="center"
        visible={visible}
        onClose={handleCloseModal}
      >
        <CModalBody className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <div className="text-center">
            <CSpinner color="primary" className="mb-3" />
            <div>Authenticating...</div>
          </div>
        </CModalBody>
      </CModal>
    );
  }

  return (
    <CModal
      className="login"
      fullscreen="xl"
      alignment="center"
      visible={visible}
      onClose={handleCloseModal}
    >
      {width < breakpoints.md && (
        <CModalHeader>
          <h5>{isSigningUp ? 'Sign Up' : 'Login'}</h5>
        </CModalHeader>
      )}
      <CModalBody>
        <div className="login-body-wrap">
          <div className="login-email-button-wrap">
            <CNav className="justify-content-evenly mb-4" variant="underline">
              <CNavItem>
                <CNavLink
                  href="#"
                  active={isSigningUp}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSigningUp(true);
                    setValidated(false);
                    setErrorMessage('');
                  }}
                >
                  <span className="tab-underline">Sign up</span>
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  href="#"
                  active={!isSigningUp}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSigningUp(false);
                    setValidated(false);
                    setErrorMessage('');
                  }}
                >
                  <span className="tab-underline">Login</span>
                </CNavLink>
              </CNavItem>
            </CNav>

            <div className="login-button-group-wrap">
              <CButton
                color="light"
                className="mb-2 w-100"
                disabled={(!acceptTerms && isSigningUp) || loading}
                onClick={() => handleOAuthSignIn('google')}
              >
                <CIcon icon={googleIcon} className="me-2" />
                Continue with Google
              </CButton>

              <CButton
                color="dark"
                className="facebook mb-2 w-100"
                disabled={(!acceptTerms && isSigningUp) || loading}
                onClick={() => handleOAuthSignIn('facebook')}
              >
                <CIcon icon={cibFacebookF} className="me-2" />
                Continue with Facebook
              </CButton>

              <CButton
                color="dark"
                className="x-logo mb-4 w-100"
                disabled={(!acceptTerms && isSigningUp) || loading}
                onClick={() => handleOAuthSignIn('x')}
              >
                <CIcon icon={xLogo} className="me-2" />
                Continue with X
              </CButton>
            </div>

            {errorMessage && (
              <div className="alert alert-danger" role="alert">
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
                <CForm
                  className="needs-validation"
                  validated={validated}
                  onSubmit={handleEmailAuth}
                >
                  {isSigningUp && (
                    <CFormInput
                      type="text"
                      name="username"
                      disabled={!acceptTerms && isSigningUp}
                      placeholder="Username"
                      className="mb-3"
                      required
                      minLength={3}
                      maxLength={30}
                      feedbackInvalid="Username must be between 3 and 30 characters"
                    />
                  )}
                  <CFormInput
                    type={isSigningUp ? 'email' : 'text'}
                    name="email"
                    disabled={!acceptTerms && isSigningUp}
                    placeholder={isSigningUp ? 'Email' : 'Email or Username'}
                    className="mb-3"
                    required
                    minLength={5}
                    maxLength={50}
                    feedbackInvalid={isSigningUp ? 'Please enter a valid email address (5-50 characters)' : 'Email or username is required'}
                  />
                  <CFormInput
                    type="password"
                    name="password"
                    disabled={!acceptTerms && isSigningUp}
                    placeholder="Password"
                    className="mb-3"
                    required
                    minLength={8}
                    maxLength={50}
                    feedbackInvalid="Password must be between 8 and 50 characters"
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
                  required
                  feedbackInvalid="You must accept the terms and conditions"
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
  );
};

export default LoginModal;
