import React, { useEffect, useState, useMemo } from "react";
import pathToRegex from "path-to-regexp";
import { createAction } from "../state/state";
import map from "lodash/map";
import zipObject from "lodash/zipObject";

const goto = createAction("@router/goto");
const addParams = createAction("@router/addParams");

const routerReducer = (state, action) => {
  switch (action.type) {
    case goto.type:
      return action.payload.location;
    case addParams.type:
      return {
        ...state,
        params: { ...state.params, ...action.payload.params }
      };

    default:
      return state;
  }
};

const Router = React.memo(({ history, store, children }) => {
  useEffect(
    () => {
      history.listen(location => store.dispatch(goto.create({ location })));
    },
    ["history"]
  );

  return children;
});

const UnconnectedRoute = ({ dispatch, location = {}, path, children }) => {
  const [state, setState] = useState({ visible: false });
  const { visible } = state;
  const { pathname } = location;

  const { regex, keys } = useMemo(
    () => {
      let keys = [];
      const regex = pathToRegex(path, keys);
      return { keys, regex };
    },
    [path]
  );

  useEffect(
    () => {
      if (regex && pathname && regex.test(pathname)) {
        const result = regex.exec(pathname);
        const values = result.slice(1);
        const params = zipObject(map(keys, "name"), values);
        dispatch(addParams.create({ params }));
        setState({ visible: true });
      } else setState({ visible: false });
    },
    [pathname]
  );

  return visible ? children : null;
};

export { Router, UnconnectedRoute, goto, routerReducer };
