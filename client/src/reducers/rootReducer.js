import { asyncReducer } from "./asyncReducer";
import { authReducer } from "./authReducer";
import { reducer as toastrReducer } from "react-redux-toastr";
import { quoteReducer } from "./quoteReducer";
import { fieldReducer } from "./fieldReducer";
import { goalReducer } from "./goalReducer";
const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  auth: authReducer,
  async: asyncReducer,
  toastr: toastrReducer,
  quote: quoteReducer,
  field: fieldReducer,
  goal: goalReducer,
});

export default rootReducer;
