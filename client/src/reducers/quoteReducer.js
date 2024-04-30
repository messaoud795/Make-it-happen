import {
  QUOTE_LOAD_ERROR,
  QUOTE_LOAD_START,
  QUOTE_LOAD_SUCCESS,
} from "../actions/actionsTypes";

const initialState = { quote: "", author: "", loadingQuote: false };
export const quoteReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case QUOTE_LOAD_START:
      return (state = { ...state, loadingQuote: true });
    case QUOTE_LOAD_SUCCESS:
      return (state = {
        quote: payload.quote,
        author: payload.author,
        loadingQuote: false,
      });
    case QUOTE_LOAD_ERROR:
      return (state = { ...state, loadingQuote: false });
    default:
      return state;
  }
};
