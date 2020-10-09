import React from "react";

interface CellProps {
  state: boolean;
  coordinates: { i: number; j: number };
  handleChange: ((i: number, j: number) => void) | (() => void);
}

const Cell = ({ state, coordinates, handleChange }: CellProps) => (
  <td
    className="box"
    style={{
      width: "15px",
      height: "15px",
      border: "1px solid lightgray",
      backgroundColor: state ? "#81db74" : "white",
    }}
    onClick={() => {
      handleChange(coordinates.i, coordinates.j);
    }}
  />
);

export default Cell;
