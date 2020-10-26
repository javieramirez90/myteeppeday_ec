import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_hdZoi78Cn6IXz5DchHvVUlnn008B3nm19A';

  const onToken = token => {
    console.log(token);
    alert('Payment successful');
  };

  return (
    <StripeCheckout
      label="Pay Now" // text inside the Stripe button
      name="My Teepee Day" // the pop-in header title
      shippingAddress
      billingAddress
      image="https://sendeyo.com/up/d/f3eb2117da" // the pop-in header image (default none)
      description={`Your total is $${price}`} // the pop-in header subtitle
      ComponentClass="div"
      amount={priceForStripe} // cents
      currency="MXN"
      panelLabel='Pay Now'
      stripeKey={publishableKey}
      token={onToken}
    />
  )
}

export default StripeButton;