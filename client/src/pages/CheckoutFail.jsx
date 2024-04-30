import React from "react";
import { useHistory } from "react-router";
import { Button } from "semantic-ui-react";
import "./CheckoutSuccess.css";

export default function CheckoutFail() {
  const history = useHistory();

  return (
    <div className="checkout">
      <h1>Fail</h1>
      <p className="checkout__text">
        your payment was not completed , you can try again
      </p>
      <Button
        primary
        onClick={() => history.push("/")}
        content="back to home page"
      />
    </div>
  );
}
