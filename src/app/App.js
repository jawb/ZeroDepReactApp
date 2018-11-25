import React, { useState, useEffect } from "react";
import Counter1 from "./ui/Counter1";
import Counter2 from "./ui/Counter2";
import { context, store, connect } from "./data/store";
import { Router, UnconnectedRoute, goto } from "../lib/router/router";
import createHistory from "history/createHashHistory";

const history = createHistory();
const Route = connect(state => {
  return { location: state.location };
})(UnconnectedRoute);

const Page = ({ i, location: { params } }) => (
  <h1>
    Page {i} {params && params.id}
  </h1>
);

const ConnectedPage = connect(state => ({
  location: state.location
}))(Page);

const App = () => {
  const [gs, setGs] = useState(store.state);

  useEffect(() => {
    store.subscribe(state => setGs(state));
    store.dispatch(goto.create({ location: history.location }));
  }, []);

  return (
    <context.Provider value={{ state: gs, dispatch: store.dispatch }}>
      <Router history={history} store={store}>
        <a href="#/">Home</a>
        <a href="#/page1/12">Page 1</a>
        <a href="#/page2">Page 2</a>
        <Route path="/">
          <div style={{ margin: 50 }}>
            <h1>Yo!</h1>
            <Counter1 name="ACC1" />
            <Counter2 name="ACC2" />
          </div>
        </Route>
        <Route path="/page1/:id">
          <ConnectedPage i={1} />
        </Route>
        <Route path="/page2">
          <ConnectedPage i={2} />
        </Route>
      </Router>
    </context.Provider>
  );
};

export default App;
