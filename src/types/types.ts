// types/game.ts
export type WinningLine = [number, number][] | null;

export interface GameResult {
  winner: "X" | "O" | null;
  moves: number;
  timestamp: string;
  boardState: ("X" | "O" | null)[][];
  winningLine: WinningLine;
  starter: "X" | "O"; // بازیکن شروع کننده بازی
}

export interface GameStatsProps {
  gameHistory: GameResult[];
  currentGame: {
    board: ("X" | "O" | null)[][];
    currentPlayer: "X" | "O";
    status: "playing" | "won" | "draw";
    winner: "X" | "O" | null;
    movesCount: number;
    winningLine: WinningLine;
    gameNumber: number;
  };
  onClearHistory: () => void;
}
