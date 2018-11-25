import { createAction } from "../../../lib/state/state";

const increment1 = createAction("increment1");
const incrementAsync1 = createAction("incrementAsync1");

export { increment1, incrementAsync1 };
