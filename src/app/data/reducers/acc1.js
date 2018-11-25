import { increment1 } from "../actions/acc1";

const reducer = (state, action) => {
  switch (action.type) {
    case increment1.type:
      const { inc } = action.payload;
      return state + inc;

    default:
      return state;
  }
};

export default reducer;
