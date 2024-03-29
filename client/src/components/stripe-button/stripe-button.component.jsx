import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    // stripe wants the price in Cents
    const priceForStripe = price * 100;
    const publishableKey =
        'pk_test_51KIpbmFTCUYXuWJWZltWWXNojTmLXnkvQ2hFplXST6EO3dKUhCAZGNkbcUl2WqIovflxMMmIKFwmIHWi4IAV4H4A003YW4m9Qm';

    // this token is handled in backend for real payment,
    // but we're just testing, so we can just fake it here
    // in the frontend
    const onToken = (token) => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token: token,
            },
        })
            .then((response) => {
                alert('Payment successful');
            })
            .catch((error) => {
                console.log('Payment error: ', JSON.parse(error));
                alert(
                    'There was an issue with your payment. Please make sure you use the provieded credit card'
                );
            });
    };

    return (
        <StripeCheckout
            label="Pay Now"
            name="CRNW Clothing Ltd"
            billingAddress
            shippingAddress
            // image="https://svgshare.com/i/cuz.svg"
            description={`Your total price is ${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
