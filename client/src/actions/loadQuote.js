import axios from "axios";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "./async_actions";

import { QUOTE_LOAD } from "./actionsTypes";

export const loadQuote = () => {
  return async (dispatch) => {
    try {
      dispatch(asyncActionStart());
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

      await dispatch({ type: QUOTE_LOAD, payload: { quote, author } });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
    }
  };
};
