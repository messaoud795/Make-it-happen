import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "semantic-ui-react";
import "./CheckoutSuccess.css";
import { loadProfile } from "../actions/auth_actions";

export default function CheckoutSuccess() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProfile());
  }, [dispatch]);
  return (
    <div className="checkout">
      <h1 className="checkout__success">Success</h1>
      <p className="checkout__text">
        your payment is done , you can now enjoy all features
      </p>
      <Button
        primary
        onClick={() => history.push("/")}
        content="Back to home page"
      />
    </div>
  );
}
