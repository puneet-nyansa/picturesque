import React, { Component } from "react";
import PhotoContextProvider from "./context/PhotoContext";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Item from "./components/Item";
import Checkout from "./components/Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import stripeAPIcalls from "./stripeAPIcalls";

const stripePromise = stripeAPIcalls.getPublicStripeKey().then(key => loadStripe(key));

class App extends Component {

  // Prevent page reload, clear input, set URL and push history on submit
  handleSubmit = (e, history, selectedValue) => {
    e.preventDefault();
    e.currentTarget.reset();
    let url = `/checkout`;
    history.push(url);
    this.selectedImage = selectedValue;
  };

  render() {
    return (
      <PhotoContextProvider>
        <HashRouter basename="/memories">
          <div className="container">
          <Elements stripe={stripePromise}>
          <Route
            path="/home"
            render={props => (
              <Header
                handleSubmit={this.handleSubmit}
                history={props.history}
              />
            )}
          />
          <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/home" />}
              />
              <Route
                path="/home"
                render={() => <Item />}
              />
              <Route
                path="/checkout"
                 render={() => <Checkout selectedImage={this.selectedImage} />}
              />
              <Route
                render={() => <Redirect to="/home" />}
              />
            </Switch>
            </Elements>
            </div>
        </HashRouter>
      </PhotoContextProvider>
    );
  }
}

export default App;
