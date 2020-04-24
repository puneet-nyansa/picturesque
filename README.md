# Accepting payments on an e-commerce application using Stripe APIs

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Product Overview
Picturesque is an e-commerce application created using React. The application pulls images in real-time from my online album on Flickr and creates a gallery of pictures that customers can select from. To accept payments from customers from around the world, the application uses Stripe as the payment platform provider.

Application Architecture
-	Application’s front-end client was built using – React js, React Router, React Hooks, Context API, Flickr API
-	Application’s backend was built using – Node & Stripe APIs to accept payments

## How to run locally

To run this application locally you need to start both a local dev server for the `front-end` and another server for the `back-end`.

You will need a Stripe account with its own set of [API keys](https://stripe.com/docs/development#api-keys).

Follow the steps below to run locally.

**1. Clone and configure the sample**

Clone/download the repository on your local machine.

You will need a Stripe account in order to run the demo. Once you set up your account, go to the Stripe [developer dashboard](https://stripe.com/docs/development#api-keys) to find your API keys.

Create a new file named .env in `src/server` and add the following lines to it, replace with your API keys and save the file

```
STRIPE_PUBLISHABLE_KEY=<replace-with-your-publishable-key>
STRIPE_SECRET_KEY=<replace-with-your-secret-key>
```

### Running the API server

1. Go to `src/server`
2. Install dependencies

```
npm install
```

3. Run the server

```
npm start
```

4. Use ngrok to receive Webhooks on localhost from Stripe Platform. Setup the webhook endpoint on your Stripe developer dashboard to setup event notifications for - Payment Intent & Charge Events. This will log fulfillment information into the `src/server/project.log` file. See instructions to set up ngrok here - https://www.twilio.com/blog/2013/10/test-your-webhooks-locally-with-ngrok.html


### Running the React client

1. Go to application root directory
2. Run `npm install`
3. Run `npm start` and your default browser should now open with the front-end being served from `http://localhost:3000/#/memories/home`.

### Using the sample app

When running both servers, you are now ready to use the app running in `http://localhost:3000/#/memories/home`.

1. Select the Product name you want to buy from the drop-down list
2. Hit "Buy"
3. On the checkout page enter payment details and email address for Product fulfillment

## Application Landing page
![](/picturesque-screenshot.png)

## Author(s)
Puneet Shetty
