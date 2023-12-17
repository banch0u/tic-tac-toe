import { useState } from 'react';
import './App.css';

function App() {
  const [player, setPlayer] = useState(true); //player1 = true; player2 = false;
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [winner, setWinner] = useState(false);

  const handleInput = (i) => {
    const newBoard = [...board];
    if (newBoard[i] === '') {
      newBoard[i] = player ? 'X' : 'O';
      setBoard([...newBoard]);
      checkWin(newBoard);
    }
  };
  const checkWin = (arr) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (arr[a] === arr[b] && arr[b] === arr[c] && arr[a] !== '') {
        setWinner(true);
        return;
      }
    }

    setPlayer(!player);
  };
  const playAgain = () => {
    setPlayer(true);
    setBoard(['', '', '', '', '', '', '', '', '']);
    setWinner(false);
  };
  return (
    <div className='flex justify-center pt-11'>
      <div className='grid grid-cols-3 w-[29rem] gap-4'>
        {board.map((item, i) => (
          <div
            className='w-36 h-36 rounded bg-gray-700 text-white text-9xl flex justify-center items-center leading-none'
            onClick={() => handleInput(i)}>
            {item}
          </div>
        ))}
      </div>
      {winner ? (
        <>
          <div className='bg-black opacity-30 w-full h-[100vh] absolute top-0 left-0'></div>
          <div className='w-80 p-7 rounded text-center bg-gray-950 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <h1 className='text-4xl mb-4'>"{player ? 'X' : 'O'}" Wins</h1>
            <h2 className='text-3xl mb-3'>Congratulations!</h2>
            <button
              onClick={playAgain}
              className='bg-gray-700 text-2xl p-2 rounded'>
              Play again
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;
