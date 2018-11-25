import { increment2 } from "../actions/acc2";

const reducer = (state, action) => {
  switch (action.type) {
    case increment2.type:
      return state + 1;
    default:
      return state;
  }
};

export default reducer;
