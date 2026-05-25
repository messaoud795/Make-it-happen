import axios from "axios";

import {
  QUOTE_LOAD_ERROR,
  QUOTE_LOAD_START,
  QUOTE_LOAD_SUCCESS,
} from "./actionsTypes";

function generateRandom(maxLimit = 100) {
  let rand = Math.random() * maxLimit;
  rand = Math.floor(rand);
  return rand;
}

export const loadQuote = () => {
  return async (dispatch) => {
    try {
      const today = new Date().toDateString(); // e.g., "Mon May 25 2026"
      const cachedQuote = localStorage.getItem("daily_quote");
      const cachedDate = localStorage.getItem("daily_quote_date");

      // 1. If a quote was already fetched today, use it and stop
      if (cachedQuote && cachedDate === today) {
        const { quote, author } = JSON.parse(cachedQuote);
        dispatch({ type: QUOTE_LOAD_SUCCESS, payload: { quote, author } });
        return;
      }

      // 2. If it's a new day, fetch a fresh quote
      dispatch({ type: QUOTE_LOAD_START });
      const { data } = await axios.get("https://type.fit/api/quotes");

      let quote;
      let author;
      let attempts = 0;
      const maxAttempts = 50; // Prevent infinite loops if data structure changes

      do {
        const index = generateRandom(data.length);
        quote = data[index].text;
        author = data[index].author || "Anonymous";
        attempts++;
      } while (
        (quote.length > 150 || quote.toLowerCase().includes("fuck")) &&
        attempts < maxAttempts
      );

      // 3. Save the chosen quote and today's date to localStorage
      localStorage.setItem("daily_quote", JSON.stringify({ quote, author }));
      localStorage.setItem("daily_quote_date", today);

      // 4. Dispatch to Redux state
      dispatch({ type: QUOTE_LOAD_SUCCESS, payload: { quote, author } });
    } catch (error) {
      dispatch({ type: QUOTE_LOAD_ERROR });
    }
  };
};
