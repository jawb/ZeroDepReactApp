import { createStore, combineReducers } from "../../lib/state/state";
import {
  createContext,
  connect as _connect
} from "../../lib/state/state-react";
import reducers from "./reducers";
import mainSaga from "./sagas/main";
import { routerReducer } from "../../lib/router/router";

const reducer = combineReducers({ ...reducers, location: routerReducer });

const store = createStore(reducer, { acc1: 12, acc2: 76 });

store.subscribe((state, action) => console.log(state, action));
store.subscribe(mainSaga);

const { context } = createContext(store);

const connect = _connect(context);

export { store, context, connect };
