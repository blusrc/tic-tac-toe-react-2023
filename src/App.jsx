import { useState } from "react";

function App() {
  const clearBoard = [
    { id: 1, move: 0 },
    { id: 2, move: 0 },
    { id: 3, move: 0 },
    { id: 4, move: 0 },
    { id: 5, move: 0 },
    { id: 6, move: 0 },
    { id: 7, move: 0 },
    { id: 8, move: 0 },
    { id: 9, move: 0 },
  ];

  const [grid, setGrid] = useState(clearBoard);
  const [game, setGame] = useState(true);
  const [score, setScore] = useState(0);
  const [emptyCells, setEmptyCells] = useState(9);

  const gameInit = () => {
    setScore(0);
    setGame(true);
    setGrid(clearBoard);
    setEmptyCells(9);
  };

  const handlePlay = (elementId) => {
    const newGrid = grid.map((item) => {
      if (item.id === elementId && !item.text) {
        return { ...item, move: game ? 1 : -1 };
      } else return item;
    });
    setGame(!game);
    setGrid(newGrid);
    setEmptyCells(emptyCells - 1);
    checkWin(newGrid, elementId, emptyCells - 1);
  };

  const checkWin = (grid, id, e) => {
    const row = Math.ceil(id / 3) - 1;
    const col = ((id - 1) % 3) + 1;

    let res = 0;

    res += rowWin(grid, row) + colWin(grid, col);

    if (grid[0].move + grid[4].move + grid[8].move === 3) res++;
    if (grid[0].move + grid[4].move + grid[8].move === -3) res--;

    if (grid[2].move + grid[4].move + grid[6].move === 3) res++;
    if (grid[2].move + grid[4].move + grid[6].move === -3) res--;

    if (e === 0 && res === 0) {
      console.log("DRAW");
      res = 2;
    }

    setScore(res);
  };

  const rowWin = (grid, row) => {
    let count = 0;
    for (let i = 0; i < 3; i++) {
      // console.log(grid[3 * row + i].move);
      count += grid[3 * row + i].move;
    }
    if (count === 3) return 1;
    if (count === -3) return -1;
    return 0;
  };

  const colWin = (grid, col) => {
    let count = 0;
    for (let i = 0; i < 7; i += 3) {
      // console.log(grid[col + i - 1].move);
      count += grid[col + i - 1].move;
    }
    if (count === 3) return 1;
    if (count === -3) return -1;
    return 0;
  };

  return (
    <>
      <main className="bg-white h-screen flex flex-col justify-center items-center py-16">
        {/* <span>{`${score} ${game} ${emptyCells}`}</span> */}
        <h1 className="font-bold text-2xl">Tic-Tac-Toe</h1>
        {score === 0 ? (
          <h1 className="text-lg">Turn: Player {game ? "1" : "2"}</h1>
        ) : (
          <div className="flex gap-8 items-center">
            {score === 2 ? (
              <h1 className="text-lg">🪢 Draw!</h1>
            ) : (
              <h1 className="text-lg">
                🏆 Game Over! <br />{" "}
                {score === 1 ? "❌ " : score === -1 ? "⭕ " : ""} Won
              </h1>
            )}
            <button
              className="p-4 border-2 font-bold  rounded my-8"
              onClick={gameInit}
            >
              New Game
            </button>
          </div>
        )}
        <div className="grid grid-cols-3 m-auto bg-slate-950 gap-1">
          {grid.map((element) => (
            <button
              key={element.id}
              onClick={() => handlePlay(element.id)}
              className="bg-white w-32 md:w-48 aspect-square flex items-center justify-center font-semi text-8xl"
            >
              {element.move === 0 ? "" : element.move === 1 ? "X" : "O"}
            </button>
          ))}
        </div>
        <span className="text-xs">
          By{" "}
          <a
            className="underline"
            href="https://github.com/blusrc"
          >
            Aldiyar Serikov
          </a>
        </span>
      </main>
    </>
  );
}

export default App;
