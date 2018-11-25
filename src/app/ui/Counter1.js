import React, { useCallback } from "react";
import { connect } from "../data/store";
import { increment1, incrementAsync1 } from "../data/actions/acc1";

const Counter1 = React.memo(({ name, counter, dispatch }) => {
  const increment = useCallback(() => dispatch(increment1.create({ inc: 1 })));
  const incrementAsync = useCallback(() => dispatch(incrementAsync1.create()));

  return (
    <div>
      <button onClick={increment}>+</button>
      <button onClick={incrementAsync}>+ Async</button>
      {name}: {counter}
    </div>
  );
});

export default connect(state => ({
  counter: state.acc1
}))(Counter1);
