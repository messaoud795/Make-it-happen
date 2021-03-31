import { asyncReducer } from "./asyncReducer";
import { authReducer } from "./authReducer";
import { reducer as toastrReducer } from "react-redux-toastr";
import { quoteReducer } from "./quoteReducer";
import { fieldReducer } from "./fieldReducer";
import { goalReducer } from "./goalReducer";
import { ActionReducer } from "./actionReducer";
import { promodoroReducer } from "./promodoroReducer";
import { chatReducer } from "./chatReducer";
const { combineReducers } = require("redux");

const rootReducer = combineReducers({
  auth: authReducer,
  async: asyncReducer,
  toastr: toastrReducer,
  quote: quoteReducer,
  field: fieldReducer,
  goal: goalReducer,
  action: ActionReducer,
  promodoro: promodoroReducer,
  chats: chatReducer,
});

export default rootReducer;
