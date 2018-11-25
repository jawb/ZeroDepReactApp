import React, { useContext } from "react";

const createContext = store => {
  const context = React.createContext(store);
  return { context };
};

const connect = context => select => Comp => props => {
  const { state, dispatch } = useContext(context);
  const subState = select(state);
  const newProps = { ...props, ...subState, dispatch };
  return <Comp {...newProps} />;
};

export { createContext, connect };
