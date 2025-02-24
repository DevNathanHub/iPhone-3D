// import React from 'react';
// import { PayPalButtons } from '@paypal/react-paypal-js';

// const PayPalButton = ({ amount, onSuccess }) => {
//   const createOrder = (data, actions) => {
//     return actions.order.create({
//       purchase_units: [
//         {
//           amount: {
//             value: amount,
//           },
//         },
//       ],
//     });
//   };

//   const onApprove = (data, actions) => {
//     return actions.order.capture().then(details => {
//       onSuccess(details);
//     });
//   };

//   return <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
// };

// export default PayPalButton;

import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({ amount, onSuccess, onError }) => {
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(details => {
      onSuccess(details);
    }).catch(onError);
  };

  const onErrorHandler = (err) => {
    onError(err);
  };

  return <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onErrorHandler} />;
};

export default PayPalButton;