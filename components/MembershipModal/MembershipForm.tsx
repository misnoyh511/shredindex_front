import React, { useState, useEffect } from 'react';
import { CButton } from '@coreui/react';
import { useStripe, useElements, CardElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';

interface MembershipFormProps {
  username: string;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: () => void;
  handleSignUp: () => void;
}

const MembershipForm: React.FC<MembershipFormProps> = ({ user, setVisible, handleLogin, handleSignUp }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');
  const [paymentRequest, setPaymentRequest] = useState<stripe.paymentRequest.PaymentRequest | null>(null);
  const [paymentRequestSupported, setPaymentRequestSupported] = useState(false);
  const [paymentInProgress, setPaymentInProgress] = useState(false);

  useEffect(() => {
    if (stripe && user) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Pro Membership',
          amount: 900, // $9.00 in cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
          setPaymentRequestSupported(true);

          pr.on('paymentmethod', async (event) => {
            // Process the payment
            try {
              const { paymentMethod } = event;

              // Send paymentMethod to your server
              const response = await fetch('/api/create-subscription', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  paymentMethodId: paymentMethod.id,
                  email: event.payerEmail,
                  name: event.payerName,
                }),
              });

              const subscriptionResult = await response.json();

              if (subscriptionResult.error) {
                // Report to the browser that the payment failed
                event.complete('fail');
                setErrorMessage(subscriptionResult.error);
                return;
              }

              event.complete('success');
              setVisible(false);
              router.push('/payment-success'); // Adjust route as needed

            } catch (error) {
              console.error('Payment Request error:', error);
              event.complete('fail');
              setErrorMessage('An error occurred during payment');
            }
          });

        } else {
          setPaymentRequestSupported(false);
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
      // Create Payment Method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement!,
        billing_details: {
          name: user.username,
          email: 'user@example.com', // Replace with user's email
        },
      });

      if (error) {
        setErrorMessage(error.message || 'An error occurred while creating payment method');
        setPaymentInProgress(false);
        return;
      }

      // Send PaymentMethod to backend to create Subscription
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          email: 'user@example.com', // Replace with user's email
          name: user.username,
        }),
      });

      const subscriptionResult = await response.json();

      if (subscriptionResult.error) {
        setErrorMessage(subscriptionResult.error);
        setPaymentInProgress(false);
        return;
      }

      // Handle successful subscription
      setVisible(false);
      router.push('/payment-success'); // Adjust route as needed

    } catch (error) {
      console.error('Payment error:', error);
      setErrorMessage('An error occurred during payment');
    } finally {
      setPaymentInProgress(false);
    }
  };

  return (
    <div className="membership-body-wrap">
      <h3>Upgrade to Pro Membership</h3>
      <p>Get access to more filter options, visible maps, and our forthcoming weather feature.</p>
      <p><strong>$9 USD yearly</strong></p>

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
    </div>
  );
};

export default MembershipForm;
