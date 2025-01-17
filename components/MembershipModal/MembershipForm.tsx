import React, { useState, useEffect } from 'react';
import { CButton } from '@coreui/react';
import { useStripe, useElements, CardElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import PaymentSuccess from '@/MembershipModal/PaymentSuccess';
import Cookies from 'js-cookie';

interface MembershipFormProps {
  username: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: () => void;
  handleSignUp: () => void;
}

const CREATE_SUBSCRIPTION_MUTATION = `
  mutation CreateSubscription($input: CreateSubscriptionInput!) {
    createSubscription(input: $input) {
      user {
        id
        username
        email
      }
      token
      shredProfile {
        member_tier
        stripe_customer_id
      }
      message
    }
  }
`;

const MembershipForm: React.FC<MembershipFormProps> = ({ user, setVisible, handleLogin, handleSignUp }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<stripe.paymentRequest.PaymentRequest | null>(null);
  const [paymentRequestSupported, setPaymentRequestSupported] = useState(false);
  const [paymentInProgress, setPaymentInProgress] = useState(false);

  const processPayment = async (paymentMethodId: string, email: string, name: string) => {
    try {

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(Cookies.get('token') && {
            Authorization: `Bearer ${Cookies.get('token')}`,
          }),
        },
        body: JSON.stringify({
          query: CREATE_SUBSCRIPTION_MUTATION,
          variables: {
            input: {
              paymentMethodId,
              email,
              name,
            },
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      return result.data.createSubscription;

    } catch (error) {
      console.error('Payment error:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (stripe && user) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Pro Membership',
          amount: 19900,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
          setPaymentRequestSupported(true);

          pr.on('paymentmethod', async (event) => {
            try {
              const { paymentMethod } = event;
              const subscriptionResult = await processPayment(
                paymentMethod.id,
                event.payerEmail || user.email,
                event.payerName || user.username,
              );

              if (subscriptionResult.error) {
                event.complete('fail');
                setErrorMessage(subscriptionResult.error);
                return;
              }

              event.complete('success');
              setShowSuccess(true);
            } catch (error) {
              console.error('Payment Request error:', error);
              event.complete('fail');
              setErrorMessage(error.message);
            }
          });
        }
      });
    }
  }, [stripe, user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPaymentInProgress(true);
    setErrorMessage('');

    const cardElement = elements.getElement(CardElement);

    try {
      const { error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement!,
        billing_details: {
          name: user.username,
          email: user.email,
        },
      });

      if (error) {
        setErrorMessage(error.message || 'An error occurred while creating payment method');
        return;
      }

      setShowSuccess(true);

    } catch (error) {
      console.error('Payment error:', error);
      setErrorMessage(error.message);
    } finally {
      setPaymentInProgress(false);
    }
  };

  return (
    <div className="membership-body-wrap">
      {showSuccess ? (
        <PaymentSuccess
          username={user.username}
          onClose={() => {
            setVisible(false);
            // Any additional cleanup or redirection you want to do
          }}
        />
      ) : (
        <>
      <h3>Upgrade to Pro Membership</h3>
      <p>Get access to more filter options, visible maps, and our forthcoming weather feature.</p>
          <p><strong><span className={'text-decoration-line-through text-secondary'}>$299 USD</span> <span className={'text-primary'}>33% off!</span></strong></p>
          <p>
            <strong>$199 USD Lifetime Access</strong> <br />
            <small className="text-muted mb-3">No subscription bs</small>
          </p>


          {errorMessage && <div style={{ color: 'red', marginBottom: '1rem' }}>{errorMessage}</div>}

      {user ? (
        // User is logged in
        <div>
          {paymentRequestSupported && paymentRequest ? (
            <div>
              <PaymentRequestButtonElement
                options={{ paymentRequest }}
              />
              <div style={{ textAlign: 'center', margin: '1rem 0' }}>OR</div>
            </div>
          ) : null}

          <form onSubmit={handleSubmit}>
            <CardElement options={{ hidePostalCode: true }} />
            <CButton
              type="submit"
              color="primary"
              disabled={!stripe || paymentInProgress}
              className="mt-3"
            >
              {paymentInProgress ? 'Processing...' : 'Pay with Card'}
            </CButton>
          </form>
        </div>
      ) : (
        // User is not logged in
        <div>
          <p>Please log in or sign up to upgrade to Pro Membership.</p>
          <CButton
            color="primary"
            className="me-2"
            onClick={handleLogin}
          >
            Log In
          </CButton>
          <CButton
            color="secondary"
            onClick={handleSignUp}
          >
            Sign Up
          </CButton>
        </div>
      )}
        </>
      )}
    </div>
  );
};

export default MembershipForm;
