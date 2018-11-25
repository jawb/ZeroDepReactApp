import { increment1, incrementAsync1 } from "../actions/acc1";
import { store } from "../store";

async function mainSaga(state, action) {
  if (action.type === incrementAsync1.type) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    store.dispatch(increment1.create({ inc: 10 }));
  }
  return;
}

export default mainSaga;
