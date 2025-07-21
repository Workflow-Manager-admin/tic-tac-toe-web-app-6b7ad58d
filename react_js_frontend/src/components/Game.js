import { useState } from 'react';

// PUBLIC_INTERFACE
const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [playerSymbol, setPlayerSymbol] = useState('X');

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const handleSymbolChoice = (symbol) => {
    setPlayerSymbol(symbol);
    handleRestart();
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(cell => cell !== null);
  
  const getStatus = () => {
    if (winner) return `Winner: ${winner}`;
    if (isDraw) return "It's a Draw!";
    return `Next player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div>
      <div className="game-controls">
        <button 
          className="btn btn-primary" 
          onClick={() => handleSymbolChoice('X')}
        >
          Play as X
        </button>
        <button 
          className="btn btn-accent" 
          onClick={() => handleSymbolChoice('O')}
        >
          Play as O
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={handleRestart}
        >
          Restart Game
        </button>
      </div>

      <div className="game-status">
        {getStatus()}
      </div>

      <div className="game-board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${cell}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Game;
