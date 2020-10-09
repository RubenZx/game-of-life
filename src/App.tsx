import React, { useState } from "react";
import Conway from "./Conway";
import { generateCells } from "./utils/conways";

const App = () => {
  const [prob, setProb] = useState(0.2);
  const [dimension, setDimension] = useState(30);

  return (
    <Conway
      initialState={generateCells(dimension, prob)}
      prob={prob}
      dimension={dimension}
      setProb={(newProb: number) => setProb(newProb)}
      setDimension={(newDim: number) => setDimension(newDim)}
    />
  );
};

export default App;
