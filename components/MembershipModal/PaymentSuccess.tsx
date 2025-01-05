import React from 'react';
import { CButton } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilCheck } from '@coreui/icons';

const PaymentSuccess = ({ username, onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 rounded-full bg-green-100 p-3">
        <CIcon icon={cilCheck} />
      </div>

      <h3 className="mb-2 text-2xl font-semibold text-gray-900">
        Welcome to Pro Membership!
      </h3>

      <div className="mb-6 text-gray-600">
        <p className="mb-2">
          Thank you for your purchase, {username}! Your payment has been processed successfully.
        </p>
        <p>
          You now have full access to all Pro features including advanced filters,
          visible maps, and our upcoming weather feature.
        </p>
      </div>

      <div className="rounded-lg bg-gray-50 p-4 mb-6 w-full">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          Purchase Details
        </h4>
        <div className="text-sm text-gray-600">
          <div className="flex justify-between mb-1">
            <span>Plan</span>
            <span className="font-medium">Pro Membership</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Amount</span>
            <span className="font-medium">$99.00 USD</span>
          </div>
          <div className="flex justify-between">
            <span>Type</span>
            <span className="font-medium">Lifetime Access</span>
          </div>
        </div>
      </div>

      <CButton
        color="primary"
        onClick={onClose}
        className="w-full"
      >
        Start Exploring Pro Features
      </CButton>
    </div>
  );
};

export default PaymentSuccess;
