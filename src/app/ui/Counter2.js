import React, { useCallback } from "react";
import { connect } from "../data/store";
import { increment2 } from "../data/actions/acc2";

const Counter2 = React.memo(({ name, counter, dispatch }) => {
  const increment = useCallback(() => dispatch(increment2.create()));

  return (
    <div>
      <button onClick={increment}>+</button>
      {name}: {counter}
    </div>
  );
});

export default connect(state => ({
  counter: state.acc2
}))(Counter2);
