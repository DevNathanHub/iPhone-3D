'use client';

import { useState, useContext } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import CartContext from '../context/CartContext';
import PayPalButton from './PayPalButton';
import { useNavigate } from 'react-router-dom';
import Policy from './Policy';

export default function Checkout() {
  const context = useContext(CartContext);
  if (!context) {
    console.error('CartContext is not provided');
    return <div>Error: CartContext is not provided</div>;
  }

  const { cart, setCart } = context;
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (sum, product) => sum + product.quantity * parseFloat(product.price.slice(1)),
    0
  ).toFixed(2);

  const handlePaymentSuccess = (details) => {
    localStorage.setItem('orderDetails', JSON.stringify(details));
    setIsLoading(false);
    setCurrentStep(2); // Move to success step
  };

  const handleCheckout = () => {
    setIsLoading(true);
    setCurrentStep(1); // Move to loading step
  };

  const handleCancel = () => {
    setIsLoading(false);
    setCurrentStep(0); // Return to checkout step
  };

  const steps = [
    { label: 'Checkout', description: 'Review your cart and proceed to payment.' },
    { label: 'Loading', description: 'Processing your payment...' },
    { label: 'Success', description: 'Payment successful!' },
  ];
  
  return (
    <div className="flex h-screen w-full justify-center pt-24 px-4">
      <div className="w-full max-w-md">
        {/* Stepper */}
        <div className="flex justify-between mb-6">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`h-10 w-10 flex items-center justify-center rounded-full ${
                  index <= currentStep ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              <p
                className={`mt-2 text-sm font-medium ${
                  index <= currentStep ? 'text-indigo-600' : 'text-gray-500'
                }`}
              >
                {step.label}
              </p>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="rounded-xl bg-white/5 p-4">
          {currentStep === 0 && (
            <div>
              <h3 className="text-lg font-medium text-white">Checkout</h3>
              <p className="text-white/50 mt-2">Total: ${totalAmount}</p>
              <button
                onClick={handleCheckout}
                className="mt-4 w-full rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Pay with PayPal
              </button>
            </div>
          )}
          {currentStep === 1 && (
            <div className="flex flex-col items-center">
              <ArrowPathIcon className="h-10 w-10 text-white/50 animate-spin" />
              <p className="text-white/50 mt-4">Processing payment...</p>
              <div id="paypal-button-container" className="mt-4">
                <PayPalButton amount={totalAmount} onSuccess={handlePaymentSuccess} />
              </div>
              <button
                onClick={handleCancel}
                className="mt-4 text-red-600 hover:text-red-700"
              >
                Cancel
              </button>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-medium text-white">Payment successful</h3>
              <p className="text-white/50 mt-2">
                Your payment has been successfully submitted. We’ve sent you an email with all the details of your order.
              </p>
              <button
                onClick={() => navigate('/orders')}
                className="mt-4 w-full rounded-md bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700"
              >
                View Orders
              </button>
            </div>
          )}
        </div> 
        <Policy/>
      </div>
     
    </div>
  );
}
