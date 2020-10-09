export const generateCells = (size: number, prob: number) => {
  const cells = [];
  for (let i = 0; i < size; i++) {
    const auxCells = [];
    for (let j = 0; j < size; j++) {
      const cell = Math.random() < prob;
      auxCells.push(cell);
    }
    cells.push(auxCells);
  }
  return cells;
};

const isAlive = (i: number, j: number, dim: number, cells: boolean[][]) => {
  if (i < 0 || i >= dim || j < 0 || j >= dim) {
    return 0;
  }
  return cells[i][j] ? 1 : 0;
};

export const nextGen = (cells: boolean[][]) => {
  const dim = cells.length;
  let newCells = Array(dim);
  for (let i = 0; i < dim; i++) {
    newCells[i] = Array(dim);
    for (let j = 0; j < dim; j++) {
      let numAlive =
        isAlive(i - 1, j - 1, dim, cells) +
        isAlive(i, j - 1, dim, cells) +
        isAlive(i + 1, j - 1, dim, cells) +
        isAlive(i - 1, j, dim, cells) +
        isAlive(i + 1, j, dim, cells) +
        isAlive(i - 1, j + 1, dim, cells) +
        isAlive(i, j + 1, dim, cells) +
        isAlive(i + 1, j + 1, dim, cells);

      if (numAlive === 2) {
        newCells[i][j] = cells[i][j];
      } else if (numAlive === 3) {
        newCells[i][j] = true;
      } else {
        newCells[i][j] = false;
      }
    }
  }
  return newCells;
};
