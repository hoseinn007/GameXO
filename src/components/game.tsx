// app/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import GameStats from "./gameState";
import { GameResult } from "@/types/types";
import { toPersianNumber } from "@/utils/persianNumber";

type Player = "X" | "O" | null;
type GameStatus = "playing" | "won" | "draw";
type WinningLine = [number, number][] | null;

interface GameState {
  board: Player[][];
  currentPlayer: "X" | "O";
  status: GameStatus;
  winner: Player;
  movesCount: number;
  winningLine: WinningLine;
  gameNumber: number;
}

export default function TicTacToeGame() {
  const [gameState, setGameState] = useState<GameState>({
    board: Array(3)
      .fill(null)
      .map(() => Array(3).fill(null)),
    currentPlayer: "X",
    status: "playing",
    winner: null,
    movesCount: 0,
    winningLine: null,
    gameNumber: 1,
  });

  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);
  const [nextStarter, setNextStarter] = useState<"X" | "O">("O");
  const [showStatus, setShowStatus] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (gameState.status !== "playing") {
      setTimeout(() => setShowStatus(true), 50);
    } else {
      setShowStatus(false);
    }
  }, [gameState.status]);

  const checkWinner = (
    board: Player[][]
  ): { winner: Player; line: WinningLine } => {
    const lines: { line: [number, number][] }[] = [
      // Rows
      {
        line: [
          [0, 0],
          [0, 1],
          [0, 2],
        ] as [number, number][],
      },
      {
        line: [
          [1, 0],
          [1, 1],
          [1, 2],
        ] as [number, number][],
      },
      {
        line: [
          [2, 0],
          [2, 1],
          [2, 2],
        ] as [number, number][],
      },
      // Columns
      {
        line: [
          [0, 0],
          [1, 0],
          [2, 0],
        ] as [number, number][],
      },
      {
        line: [
          [0, 1],
          [1, 1],
          [2, 1],
        ] as [number, number][],
      },
      {
        line: [
          [0, 2],
          [1, 2],
          [2, 2],
        ] as [number, number][],
      },
      // Diagonals
      {
        line: [
          [0, 0],
          [1, 1],
          [2, 2],
        ] as [number, number][],
      },
      {
        line: [
          [0, 2],
          [1, 1],
          [2, 0],
        ] as [number, number][],
      },
    ];

    for (const { line } of lines) {
      const [a, b, c] = line;
      const [rowA, colA] = a;
      const [rowB, colB] = b;
      const [rowC, colC] = c;

      if (
        board[rowA][colA] &&
        board[rowA][colA] === board[rowB][colB] &&
        board[rowA][colA] === board[rowC][colC]
      ) {
        return { winner: board[rowA][colA], line };
      }
    }

    return { winner: null, line: null };
  };

  const checkDraw = (board: Player[][]): boolean => {
    return board.flat().every((cell) => cell !== null);
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameState.status !== "playing") {
      resetGame();
      return;
    }

    if (gameState.board[row][col] !== null) {
      return;
    }

    const newBoard = [...gameState.board.map((row) => [...row])];
    newBoard[row][col] = gameState.currentPlayer;

    const { winner, line } = checkWinner(newBoard);
    const isDraw = !winner && checkDraw(newBoard);
    const newMovesCount = gameState.movesCount + 1;

    if (winner) {
      const result: GameResult = {
        winner,
        moves: newMovesCount,
        timestamp: new Date().toISOString(),
        boardState: newBoard,
        winningLine: line,
        starter: nextStarter === "X" ? "O" : "X",
      };

      setGameHistory((prev) => [...prev, result]);

      setGameState({
        board: newBoard,
        currentPlayer: gameState.currentPlayer,
        status: "won",
        winner,
        movesCount: newMovesCount,
        winningLine: line,
        gameNumber: gameState.gameNumber,
      });

      setNextStarter(winner === "X" ? "O" : "X");
    } else if (isDraw) {
      const result: GameResult = {
        winner: null,
        moves: newMovesCount,
        timestamp: new Date().toISOString(),
        boardState: newBoard,
        winningLine: null,
        starter: gameState.currentPlayer === "X" ? "O" : "X",
      };

      setGameHistory((prev) => [...prev, result]);

      setGameState({
        board: newBoard,
        currentPlayer: gameState.currentPlayer,
        status: "draw",
        winner: null,
        movesCount: newMovesCount,
        winningLine: null,
        gameNumber: gameState.gameNumber,
      });

      setNextStarter(gameState.currentPlayer === "X" ? "O" : "X");
    } else {
      setGameState({
        board: newBoard,
        currentPlayer: gameState.currentPlayer === "X" ? "O" : "X",
        status: "playing",
        winner: null,
        movesCount: newMovesCount,
        winningLine: null,
        gameNumber: gameState.gameNumber,
      });
    }
  };

  const resetGame = () => {
    const starter = nextStarter;

    setGameState({
      board: Array(3)
        .fill(null)
        .map(() => Array(3).fill(null)),
      currentPlayer: starter,
      status: "playing",
      winner: null,
      movesCount: 0,
      winningLine: null,
      gameNumber: gameState.gameNumber + 1,
    });

    setNextStarter(starter === "X" ? "O" : "X");
    setShowStatus(false);
  };

  const isWinningCell = (row: number, col: number): boolean => {
    if (!gameState.winningLine) return false;
    return gameState.winningLine.some(
      ([winRow, winCol]) => winRow === row && winCol === col
    );
  };

  const getCellClass = (row: number, col: number) => {
    let className =
      "relative flex items-center justify-center text-4xl font-bold cursor-pointer transition-all duration-300 ";

    if (isWinningCell(row, col)) {
      className += "winning-cell ";
    } else {
      if (row < 2) className += "border-b-2 border-gray-800 ";
      if (col < 2) className += "border-l-2 border-gray-800 ";
    }

    if (gameState.status === "playing" && !gameState.board[row][col]) {
      className += "hover:bg-gray-100 hover:scale-105 ";
    }

    return className;
  };

  const getStatusMessage = () => {
    if (gameState.status === "won") {
      return `${gameState.winner} برنده شد! 🎉`;
    } else if (gameState.status === "draw") {
      return "مساوی شد! 🤝";
    }
    return "";
  };

  return (
    <div
      className="min-h-screen font-Sahel bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 font-noto">
            بازی دوز X O
          </h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg gap-4">
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 font-noto">
                      بازیکن فعلی
                    </div>
                    <div
                      className={`text-2xl font-bold ${
                        gameState.currentPlayer === "X"
                          ? "text-blue-600"
                          : "text-red-600"
                      }`}
                    >
                      {gameState.currentPlayer}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-gray-500 font-noto">
                      تعداد حرکات
                    </div>
                    <div className="text-2xl font-bold font-sahel  text-gray-700">
                      {toPersianNumber(gameState.movesCount)}/۹
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={resetGame}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-noto"
                  >
                    بازی مجدد
                  </button>
                  <div className="text-center px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="text-sm text-green-700 font-noto">
                      شروع با:{" "}
                      <span
                        className={`font-bold ${
                          nextStarter !== "X" ? "text-blue-600" : "text-red-600"
                        }`}
                      >
                        {nextStarter === "X" ? "O" : "X"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Game Status Message - Animated */}
              <div
                ref={statusRef}
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  showStatus
                    ? "max-h-40 opacity-100 mt-4 mb-6"
                    : "max-h-0 opacity-0 mt-0 mb-0"
                }`}
              >
                {gameState.status !== "playing" && (
                  <div
                    className={`p-4 rounded-lg text-center ${
                      gameState.status === "won"
                        ? "bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200"
                        : "bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200"
                    }`}
                  >
                    <div className="text-3xl font-bold mb-2 font-noto">
                      {gameState.status === "won" ? (
                        <span className="text-green-600">
                          {getStatusMessage()}
                        </span>
                      ) : (
                        <span className="text-yellow-600">
                          {getStatusMessage()}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-600 font-noto mb-2">
                      بازی با
                      <span
                        className={`font-bold ${
                          nextStarter !== "X" ? "text-blue-600" : "text-red-600"
                        }`}
                      >
                        {nextStarter === "X" ? " O " : " X "}
                      </span>
                      شروع شده بود
                    </div>
                    <p className="text-gray-500 font-noto">
                      برای شروع بازی جدید روی هر خانه کلیک کنید.
                    </p>
                  </div>
                )}
              </div>

              {/* Game Board */}
              <div className="max-w-md mx-auto">
                <div className="bg-white rounded-xl shadow-inner p-2 md:p-4 relative">
                  {gameState.board.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center">
                      {row.map((cell, colIndex) => (
                        <div
                          key={`${rowIndex}-${colIndex}`}
                          className={getCellClass(rowIndex, colIndex)}
                          style={{ width: "100px", height: "100px" }}
                          onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                          {cell && (
                            <span
                              className={`${
                                cell === "X" ? "text-blue-600" : "text-red-600"
                              } ${
                                isWinningCell(rowIndex, colIndex)
                                  ? "animate-win"
                                  : "animate-pop"
                              }`}
                            >
                              {cell}
                            </span>
                          )}
                          {!cell && gameState.status === "playing" && (
                            <span className="text-gray-300 opacity-0 hover:opacity-100 transition-opacity">
                              {gameState.currentPlayer}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                {/* 
                {gameState.winningLine && (
                  <div
                    className={`mt-4 transition-all duration-500 ${
                      showStatus ? "opacity-100 max-h-20" : "opacity-0 max-h-0"
                    } overflow-hidden`}
                  >
                    <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="text-center text-green-700 font-noto">
                        <span className="font-bold">خط برنده:</span> سه خانه{" "}
                        {gameState.winner} در یک ردیف
                      </div>
                    </div>
                  </div>
                )} */}
              </div>

              {/* Game Instructions */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <h3 className="font-bold text-gray-700 mb-2 font-noto">
                  قوانین بازی:
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 font-noto pr-4">
                  <li>اولین بازی با X شروع می‌شود</li>
                  <li>بازی بعدی با بازیکن مخالف برنده شروع می‌شود</li>
                  <li>
                    در صورت مساوی، بازی بعدی با بازیکن مخالف آخرین بازیکن شروع
                    می‌شود
                  </li>
                  <li>
                    اولین بازیکنی که ۳ مهره خود را در یک ردیف قرار دهد برنده
                    می‌شود
                  </li>
                  <li>
                    بعد از پایان بازی، روی صفحه کلیک کنید تا بازی جدید شروع شود
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Game Statistics */}
          <div className="lg:w-80">
            <GameStats
              gameHistory={gameHistory}
              currentGame={gameState}
              onClearHistory={() => setGameHistory([])}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          70% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes winPulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
          }
        }

        @keyframes winGlow {
          0%,
          100% {
            text-shadow: 0 0 5px currentColor, 0 0 10px currentColor;
            color: currentColor;
          }
          50% {
            text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
            color: white;
          }
        }

        @keyframes slideIn {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-pop {
          animation: pop 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .animate-win {
          animation: winGlow 1s infinite ease-in-out;
        }

        .winning-cell {
          background: linear-gradient(
            135deg,
            rgba(187, 247, 208, 0.3),
            rgba(187, 247, 208, 0.6)
          );
          animation: winPulse 2s infinite;
          position: relative;
          overflow: hidden;
          border: none !important;
          z-index: 10;
        }

        .winning-cell::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 70%
          );
          animation: shine 3s infinite;
          pointer-events: none;
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
