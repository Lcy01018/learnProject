// 井字棋游戏
import { useState } from 'react';
let playing = false;
let isWinner = false;
function playSound(soundId) {
  if (isWinner) return;
  const playSound = document.querySelector(`#${soundId}`);
  if (!playing) {
    playSound.play();
    playSound.currentTime = 0;
    playing = true;
  }
  if (playing) playing = false; 
}
function Square({ value, onSecondClick }) {
  return (
    <button className="square" onClick={onSecondClick}>
      {value}
    </button>
  );
}
// Game
function Game() {
  // 全局棋盘副本
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  let xIsNext = currentMove % 2 === 0;
  // 当前最新的棋盘
  let currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    // console.log([history.slice(0, currentMove + 1), nextSquares]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  // 步数显示
  //  遍历整个history的索引
  //  如果索引大于0, 那么就显示Go to move #步数, 否则显示Go to start
  function jumpTo(nextMove) {
    playSound('clickSound');
    const nextHistory = [...history.slice(0, nextMove + 1)];
    setHistory(nextHistory);
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    return (
      <li key={move} className="list-item">
        {move === currentMove ? (
          <>You are move #{move}</>
        ) : (
          <button onClick={() => jumpTo(move)}>You are at move #{move}</button>
        )}
      </li>
    );
  });
  // console.log(moves);
  return (
    <div className="container">
      <audio src="./assets/click.mp3" id="clickSound"></audio>
      <audio src="./assets/cheer.wav" id="cheerSound"></audio>
      <audio src="./assets/failure.wav" id="failureSound"></audio>

      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <ol>{moves}</ol>
    </div>
  );
}
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    playSound('clickSound');

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    // console.log(nextSquares);
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }
  let winner = calculateWinner(squares);
  let status;
  if (winner) {
    isWinner = winner;
    status = '当前获胜者是' + winner;
  } else {
    status = '下一步是' + (xIsNext ? 'X' : 'O');
  }
  // 当前棋牌提示
  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <div className="board-row">
          {/* 点击之后跳转的函数 */}
          <Square value={squares[0]} onSecondClick={() => handleClick(0)} />
          <Square value={squares[1]} onSecondClick={() => handleClick(1)} />
          <Square value={squares[2]} onSecondClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSecondClick={() => handleClick(3)} />
          <Square value={squares[4]} onSecondClick={() => handleClick(4)} />
          <Square value={squares[5]} onSecondClick={() => handleClick(5)} />
        </div>

        <div className="board-row">
          <Square value={squares[6]} onSecondClick={() => handleClick(6)} />
          <Square value={squares[7]} onSecondClick={() => handleClick(7)} />
          <Square value={squares[8]} onSecondClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

// 传递棋牌的副本
// 检测玩家是否胜利
function calculateWinner(squares) {
  // TODO
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // console.log('length', lines.length, 'squares', squares.length);
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      playSound('cheerSound');
      return squares[a];
    }
  }
  return null;
}
// 管理全局state, 游戏的棋盘副本, 当前的位置状态
// Board
// 管理Square的jsx渲染, 传递给Square需要显示的符号(X, O), 点击函数
// handleClick(i) 当Square点击的时候跳到该函数
//
// Square

// 保存当前所有棋盘副本

//

// 玩家1在空余的方块下X
// 检查玩家1是否获胜
// - 检查行
// - 检查列
// - 检查对角线
// 玩家2在空余的方块下O
// 检查玩家2是否获胜
// - 检查行
// - 检查列
// - 检查对角线
// 检查是否还有位置？
// - 有 重新循环
// - 没有 平局
export default Game;

// Game 整个的父组件
// Board 棋盘
// Square 格子
