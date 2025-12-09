// stores/gameStore.ts
import { create } from "zustand";

interface GameStore {
  totalGames: number;
  xWins: number;
  oWins: number;
  draws: number;
  incrementWins: (player: "X" | "O") => void;
  incrementDraws: () => void;
  resetStats: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  totalGames: 0,
  xWins: 0,
  oWins: 0,
  draws: 0,

  incrementWins: (player) =>
    set((state) => ({
      totalGames: state.totalGames + 1,
      xWins: player === "X" ? state.xWins + 1 : state.xWins,
      oWins: player === "O" ? state.oWins + 1 : state.oWins,
    })),

  incrementDraws: () =>
    set((state) => ({
      totalGames: state.totalGames + 1,
      draws: state.draws + 1,
    })),

  resetStats: () =>
    set({
      totalGames: 0,
      xWins: 0,
      oWins: 0,
      draws: 0,
    }),
}));
