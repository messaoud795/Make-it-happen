import axios from "axios";

import {
  QUOTE_LOAD_ERROR,
  QUOTE_LOAD_START,
  QUOTE_LOAD_SUCCESS,
} from "./actionsTypes";

export const loadQuote = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: QUOTE_LOAD_START });
      const { data } = await axios.get(
        "https://quotes15.p.rapidapi.com/quotes/random/",
        {
          headers: {
            "x-rapidapi-key":
              "dd080ddb04msh8e57ee8c4107e4ap181dcbjsne036e571148d",
            "x-rapidapi-host": "quotes15.p.rapidapi.com",
            useQueryString: true,
          },
        }
      );
      let quote = data.content;
      let author = data.originator.name;

      await dispatch({ type: QUOTE_LOAD_SUCCESS, payload: { quote, author } });
    } catch (error) {
      dispatch({ type: QUOTE_LOAD_ERROR });
    }
  };
};
