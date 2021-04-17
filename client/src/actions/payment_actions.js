import axios from "axios";
import {
  PAYMENT_ACTION_ERROR,
  PAYMENT_ACTION_START,
  PAYMENT_ACTION_SUCCESS,
} from "./actionsTypes";
// import { toastr } from "react-redux-toastr";
import { configHeaders } from "./config";

export const payment = () => {
  var stripe = window.Stripe(
    "pk_test_51IgRbqF6ptzyzFCrFkgMNE81RZzhKA4qL27drQL99PSJJrnTOEeeT4yQ00JQjDhkaJgtnxiakDkOI22WWferZcbs00l8PUMrE5"
  );
  console.log(stripe);
  return async (dispatch) => {
    try {
      dispatch({ type: PAYMENT_ACTION_START });
      const { data } = await axios.get(
        "/api/payment/checkout-session",
        configHeaders()
      );
      console.log(data);
      dispatch({ type: PAYMENT_ACTION_SUCCESS, payload: data });
      await stripe.redirectToCheckout({ sessionId: data.session.id });
    } catch (error) {
      dispatch({ type: PAYMENT_ACTION_ERROR, payload: error });
    }
  };
};
