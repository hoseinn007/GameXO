"use client";

import { GameStatsProps, WinningLine } from "@/types/types";
import { toPersianNumber } from "@/utils/persianNumber";

export default function GameStats({
  gameHistory,
  currentGame,
  onClearHistory,
}: GameStatsProps) {
  const xWins = gameHistory.filter((game) => game.winner === "X").length;
  const oWins = gameHistory.filter((game) => game.winner === "O").length;
  const draws = gameHistory.filter((game) => game.winner === null).length;
  const totalGames = gameHistory.length;

  const xStarts = gameHistory.filter((game) => game.starter === "X").length;
  const oStarts = gameHistory.filter((game) => game.starter === "O").length;

  const winsWhenStartedWithX = gameHistory.filter(
    (game) => game.starter === "X" && game.winner === "X"
  ).length;
  const winsWhenStartedWithO = gameHistory.filter(
    (game) => game.starter === "O" && game.winner === "O"
  ).length;

  const getStatusText = (status: string) => {
    switch (status) {
      case "playing":
        return "در حال بازی";
      case "won":
        return "پایان یافته";
      case "draw":
        return "مساوی";
      default:
        return status;
    }
  };

  const getWinningPatternDescription = (winningLine: WinningLine): string => {
    if (!winningLine) return "";

    const sortedLine = [...winningLine].sort(
      (a, b) => a[0] - b[0] || a[1] - b[1]
    );

    const rows = sortedLine.map(([row]) => row);
    const cols = sortedLine.map(([, col]) => col);

    if (rows[0] === rows[1] && rows[1] === rows[2]) {
      const rowNumber = rows[0] + 1;
      return `ردیف ${rowNumber}`;
    } else if (cols[0] === cols[1] && cols[1] === cols[2]) {
      const colNumber = cols[0] + 1;
      return `ستون ${colNumber}`;
    } else if (
      sortedLine[0][0] === 0 &&
      sortedLine[0][1] === 0 &&
      sortedLine[1][0] === 1 &&
      sortedLine[1][1] === 1 &&
      sortedLine[2][0] === 2 &&
      sortedLine[2][1] === 2
    ) {
      return "مورب اصلی";
    } else {
      return "مورب فرعی";
    }
  };

  return (
    <div
      className="bg-white font-Sahel rounded-2xl shadow-xl p-6 h-fit"
      dir="rtl"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 font-noto">
        آمار بازی
      </h2>

      <div className="mb-6">
        <h3 className="font-bold text-gray-700 mb-3 font-noto">
          آمار شروع کننده‌ها
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {toPersianNumber(xStarts)}
            </div>
            <div className="text-sm text-gray-600 font-noto">شروع با X</div>
            <div className="text-xs text-green-600 mt-1">
              {toPersianNumber(winsWhenStartedWithX)} برد
            </div>
          </div>
          <div className="text-center p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {toPersianNumber(oStarts)}
            </div>
            <div className="text-sm text-gray-600 font-noto">شروع با O</div>
            <div className="text-xs text-green-600 mt-1">
              {toPersianNumber(winsWhenStartedWithO)} برد
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-gray-700 mb-3 font-noto">آمار کلی</h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {toPersianNumber(xWins)}
            </div>
            <div className="text-sm text-gray-600 font-noto">بردهای X</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {toPersianNumber(oWins)}
            </div>
            <div className="text-sm text-gray-600 font-noto">بردهای O</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {toPersianNumber(draws)}
            </div>
            <div className="text-sm text-gray-600 font-noto">مساوی</div>
          </div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-800">
            {toPersianNumber(totalGames)}
          </div>
          <div className="text-sm text-gray-600 font-noto">
            تعداد کل بازی‌ها
          </div>
        </div>
      </div>

      {gameHistory.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-700 font-noto">بازی‌های اخیر</h3>
            <button
              onClick={onClearHistory}
              className="text-sm text-red-600 hover:text-red-700 font-noto"
            >
              پاک کردن تاریخچه
            </button>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {gameHistory
              .slice(-5)
              .reverse()
              .map((game, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium font-noto">
                      {game.winner ? (
                        <span
                          className={
                            game.winner === "X"
                              ? "text-blue-600"
                              : "text-red-600"
                          }
                        >
                          {toPersianNumber(game.winner)} برنده شد
                        </span>
                      ) : (
                        <span className="text-yellow-600">مساوی</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 font-noto">
                      {toPersianNumber(game.moves)} حرکت
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500 font-noto">
                      شروع:
                      <span
                        className={`mr-1 font-bold ${
                          game.starter === "X"
                            ? "text-blue-600"
                            : "text-red-600"
                        }`}
                      >
                        {game.starter}
                      </span>
                    </div>

                    <div className="text-xs text-gray-500 font-noto">
                      {new Date(game.timestamp).toLocaleTimeString("fa-IR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </div>
                  </div>

                  {game.winningLine && (
                    <div className="mt-2 text-xs text-green-600 font-noto">
                      {getWinningPatternDescription(game.winningLine)}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
