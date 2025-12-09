// utils/persianNumber.ts
export const toPersianNumber = (input: string | number): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return input
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

export const toPersianDate = (date: string): string => {
  return toPersianNumber(date);
};
