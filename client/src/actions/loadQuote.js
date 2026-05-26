import axios from "axios";
import {
  QUOTE_LOAD_ERROR,
  QUOTE_LOAD_START,
  QUOTE_LOAD_SUCCESS,
} from "./actionsTypes";

export const loadQuote = () => async (dispatch) => {
  dispatch({ type: QUOTE_LOAD_START });

  try {
    // DummyJSON is fully CORS-enabled for localhost development
    const response = await axios.get("https://dummyjson.com/quotes/random");

    if (response.data && response.data.quote) {
      dispatch({
        type: QUOTE_LOAD_SUCCESS,
        payload: {
          quote: response.data.quote,
          author: response.data.author,
        },
      });
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.warn(
      "Live quote API failed, falling back to local fallback defaults.",
      error.message,
    );
    dispatch({
      type: QUOTE_LOAD_ERROR,
      payload: {
        quote: "Make it happen today. Consistency yields progress.",
        author: "System",
      },
    });
  }
};
