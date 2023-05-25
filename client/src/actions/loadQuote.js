import axios from "axios";

import {
  QUOTE_LOAD_ERROR,
  QUOTE_LOAD_START,
  QUOTE_LOAD_SUCCESS,
} from "./actionsTypes";

export const loadQuote = () => {
  return async (dispatch) => {
    try {
      var quote;
      var author;
      do {
        dispatch({ type: QUOTE_LOAD_START });

        const { data } = await axios.get("https://zenquotes.io/api/quotes", {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        // await axios.get("https://quotes15.p.rapidapi.com/quotes/random/", {
        //   headers: {
        //     "x-rapidapi-key":
        //       "dd080ddb04msh8e57ee8c4107e4ap181dcbjsne036e571148d",
        //     "x-rapidapi-host": "quotes15.p.rapidapi.com",
        //     useQueryString: true,
        //   },
        // });
        quote = data[0].q;
        author = data[0].a;
      } while (quote.length > 150 && !quote.include("fuck"));

      await dispatch({ type: QUOTE_LOAD_SUCCESS, payload: { quote, author } });
    } catch (error) {
      dispatch({ type: QUOTE_LOAD_ERROR });
    }
  };
};
