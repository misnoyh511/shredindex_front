import React from 'react';
import {
  CModal,
  CModalHeader,
  CModalBody,
} from '@coreui/react';
import { useRecoilState } from 'recoil';
import { showMembershipTray } from '../../atoms/showMembershipTray';
import { loggedInUserProfile } from '../../atoms/userProfile';
import useWindowDimensions from '../../hooks/getWindowDimensions';
import breakpoints from '@/js/components/config/breakpoints';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { stripePublishableKey } from '../../stripeConfig';
import MembershipForm from '@/MembershipModal/MembershipForm';
import { showLoginTray } from '../../atoms/showLoginTray';
import { postLoginAction } from '../../atoms/postLoginAction';

// Load your Stripe publishable key
const stripePromise = loadStripe(stripePublishableKey);

const MembershipModal: React.FC = () => {
  const { width } = useWindowDimensions();

  const [visible, setVisible] = useRecoilState(showMembershipTray);
  const [, setPostLoginAction] = useRecoilState(postLoginAction);
  const [, setShowLoginState] = useRecoilState(showLoginTray);
  const [userProfile ] = useRecoilState(loggedInUserProfile);

  const handleLogin = () => {
    setShowLoginState('login');
    setPostLoginAction('showMembershipModal');
    setVisible(false); // Close the membership modal
  };

  const handleSignUp = () => {
    setShowLoginState('signup');
    setPostLoginAction('showMembershipModal');
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <CModal className="membership" fullscreen="xl" alignment="center" visible={visible} onClose={() => handleClose()}>
        {width < breakpoints.md && (
          <CModalHeader>
            <h5>Upgrade to Pro Membership</h5>
          </CModalHeader>
        )}
        <CModalBody>
          <Elements stripe={stripePromise}>
            <MembershipForm
              user={userProfile}
              setVisible={setVisible}
              handleLogin={handleLogin}
              handleSignUp={handleSignUp}
            />
          </Elements>
        </CModalBody>
      </CModal>
    </>
  );
};

export default MembershipModal;
