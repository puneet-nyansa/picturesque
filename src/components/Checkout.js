import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./Checkout.css";
import stripeAPIcalls from "../stripeAPIcalls";
import { Link } from "react-router-dom";

const Checkout = props => {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Step 1: Fetch product details such as amount and currency from
    // API to make sure it can't be tampered with in the client.
    stripeAPIcalls.getProductDetails().then(productDetails => {
      setAmount(productDetails.amount / 100);
      setCurrency(productDetails.currency);
    });

    // Step 2: Create PaymentIntent over Stripe API
    stripeAPIcalls
      .createPaymentIntent({
        payment_method_types: ["card"],
        metadata: {'product_name': props.selectedImage}
      })
      .then(clientSecret => {
        setClientSecret(clientSecret);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [props]);

  const renderSuccess = () => {
      return (
        <div>
          <h2>Your test payment succeeded</h2>
          <ul>
           <li><Link to="/memories">Go Back</Link></li>
          </ul>
        </div>
      );
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    // Step 3: Use clientSecret from PaymentIntent and the CardElement
    // to confirm payment with stripe.confirmCardPayment()
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: ev.target.name.value,
          email: ev.target.email.value
        }
      }
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
      console.log("[error]", payload.error);
    } else {
      setError(null);
      setSucceeded(true);
      setProcessing(false);
    }
  };

  const renderForm = () => {
      const options = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#aab7c4"
            }
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
          }
        }
      };

      return (
        <form onSubmit={handleSubmit}>
          <h3>
            {currency.toLocaleUpperCase()}{" "}
            {amount.toLocaleString(navigator.language, {
              minimumFractionDigits: 2
            })}{" "}
          </h3>
          <div className="sr-combo-inputs">
            <div className="sr-combo-inputs-row">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                autoComplete="cardholder"
                className="sr-input"
              />
            </div>

            <div className="sr-combo-inputs-row">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email for fulfillment"
                autoComplete="email"
                className="sr-input"
              />
            </div>

            <div className="sr-combo-inputs-row">
              <CardElement
                className="sr-input sr-card-element"
                options={options}
              />
            </div>
          </div>

          {error && <div className="message sr-field-error">{error}</div>}

          <button
            className="btn"
            disabled={processing || !clientSecret || !stripe}
          >
            {processing ? "Processing…" : "Pay"}
          </button>
        </form>
      );
  };

  return (
    <div className="checkout-form">
      <div className="sr-payment-form">
        <div className="sr-form-row" />
        <h1>Picturesque</h1>
        {succeeded ? renderSuccess() : renderForm()}
      </div>
    </div>
  );
};

export default Checkout;
