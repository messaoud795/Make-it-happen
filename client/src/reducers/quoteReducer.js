import { QUOTE_LOAD } from "../actions/actionsTypes";

const initialState = { quote: "", author: "" };
export const quoteReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case QUOTE_LOAD:
      return (state = { quote: payload.quote, author: payload.author });

    default:
      return state;
  }
};
