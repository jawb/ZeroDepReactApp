const createStore = (reducer, initialState) => {
  let state = initialState;
  let listeners = [];

  const subscribe = listener => listeners.push(listener);

  const dispatch = action => {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener(state, action);
    }
  };

  return { state, dispatch, subscribe };
};

const combineReducers = reducers => (state, action) => {
  let newState = {};
  const reducerKeys = Object.keys(reducers);
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    const reducer = reducers[key];
    newState[key] = reducer(state[key], action);
  }
  return newState;
};

const createAction = name => ({
  type: name,
  create: args => ({ type: name, payload: args })
});

export { createStore, combineReducers, createAction };
