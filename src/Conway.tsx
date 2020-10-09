import React, { useEffect, useState } from "react";
import Cell from "./Cell";
import { generateCells, nextGen } from "./utils/conways";

interface ConwayProps {
  initialState: boolean[][];
  dimension: number;
  prob: number;
  setProb: (prob: number) => void;
  setDimension: (dim: number) => void;
}

const probs = Array.from({ length: 9 }, (_v, k) => (k + 1) / 10);

const Conway = ({
  dimension,
  initialState,
  prob,
  setProb,
  setDimension,
}: ConwayProps) => {
  const [cells, setCells] = useState<boolean[][]>(initialState);
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(200);
  const [play, setPlay] = useState(false);

  const handleCellChange = (i: number, j: number) => {
    setCells(
      cells.map((row, rowi) =>
        row.map((_e, ej) =>
          i === rowi && j === ej ? !cells[rowi][ej] : cells[rowi][ej]
        )
      )
    );
  };

  const handleRandomize = (dimension: number, prob: number) => {
    setGeneration(0);
    setCells(generateCells(dimension, prob));
  };

  useEffect(() => {
    if (play) {
      setTimeout(() => {
        const newCells = nextGen(cells);
        setCells(newCells);
        setGeneration((prev) => prev + 1);
      }, speed);
    }
  }, [cells, play, speed]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "700px",
        margin: "auto",
      }}
    >
      <h3>CONWAY'S GAME OF LIFE</h3>
      <p>
        <span style={{ margin: "0px 12px", fontWeight: "bold" }}>
          Generations:
        </span>
        {generation}
      </p>

      <table style={{ borderSpacing: "0px" }}>
        <tbody>
          {cells.map((row, i) => {
            return (
              <tr key={i}>
                {row.map((e, j) => (
                  <Cell
                    key={j}
                    state={e}
                    coordinates={{ i, j }}
                    handleChange={play ? () => {} : handleCellChange}
                  />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "inherit",
          margin: "12px 0px",
        }}
      >
        <div>
          <span style={{ margin: "0px 12px", fontWeight: "bold" }}>
            Life's chance:
          </span>
          <select
            disabled={play}
            name="probs"
            value={prob}
            onChange={(event) => {
              const newProb = +event.target.value;
              setProb(newProb);
              handleRandomize(dimension, newProb);
            }}
          >
            {probs.map((v, idk) => (
              <option key={idk} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div>
            <span style={{ margin: "0px 12px", fontWeight: "bold" }}>
              Dimension:
            </span>
            {dimension}
          </div>
          <input
            type="range"
            min="10"
            max="40"
            style={{ margin: "0px 12px" }}
            value={dimension}
            disabled={play}
            onChange={(event) => {
              const newDimension = +event.target.value;
              setDimension(newDimension);
              handleRandomize(newDimension, prob);
            }}
          />
        </div>

        <div>
          <div>
            <span style={{ margin: "0px 12px", fontWeight: "bold" }}>
              Speed:
            </span>
            {speed} ms
          </div>
          <input
            disabled={play}
            type="range"
            min="10"
            max="3000"
            style={{ margin: "0px 12px" }}
            value={speed}
            onChange={(event) => {
              setSpeed(+event.target.value);
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-around",
          maxWidth: "100%",
          marginBlockStart: "1.33em",
          marginBlockEnd: "1.33em",
        }}
      >
        <button
          disabled={play}
          onClick={() => {
            setPlay(true);
          }}
        >
          {generation > 0 ? "Continue" : "Play"}
        </button>
        <button
          style={{ marginLeft: "20px" }}
          onClick={() => {
            setPlay(false);
          }}
        >
          Stop
        </button>
        <button
          disabled={play}
          style={{ marginLeft: "20px" }}
          onClick={() => {
            setGeneration(0);
            setCells(initialState);
          }}
        >
          Restart
        </button>
        <button
          style={{ marginLeft: "20px" }}
          disabled={play}
          onClick={() => {
            handleRandomize(dimension, prob);
          }}
        >
          Randomize
        </button>
        <button
          style={{ marginLeft: "20px" }}
          disabled={play}
          onClick={() => {
            setGeneration(0);
            setCells(Array(dimension).fill(Array(dimension).fill(false)));
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Conway;
