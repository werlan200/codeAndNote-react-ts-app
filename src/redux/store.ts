import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { insertBeforeCell } from "./actionCreators";
export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.dispatch(insertBeforeCell(null, "text"));
