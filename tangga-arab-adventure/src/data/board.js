export const BOARD_SIZE = 30;

export const LADDERS = {
  3: 8,
  11: 16,
  20: 25,
};

export const SNAKES = {
  14: 9,
  24: 18,
  28: 22,
};

export const BOMBS = [6, 17, 27];
export const BOOSTERS = [4, 12, 21];
export const QUESTION_TILES = [5, 10, 15, 19, 23, 29];

export function getCellMeta(position) {
  if (position === 1) return { type: "start", label: "MULAI" };
  if (position === BOARD_SIZE) return { type: "finish", label: "FINISH" };
  if (LADDERS[position]) return { type: "ladder", to: LADDERS[position], label: `Naik ke ${LADDERS[position]}` };
  if (SNAKES[position]) return { type: "snake", to: SNAKES[position], label: `Turun ke ${SNAKES[position]}` };
  if (BOMBS.includes(position)) return { type: "bomb", label: "Bom: mundur 3" };
  if (BOOSTERS.includes(position)) return { type: "booster", label: "Booster +10" };
  if (QUESTION_TILES.includes(position)) return { type: "question", label: "Kartu soal" };
  return { type: "normal", label: "" };
}

export function getBoardCoordinates(number) {
  const levelFromBottom = Math.floor((number - 1) / 5);
  const offset = (number - 1) % 5;
  const column = levelFromBottom % 2 === 0 ? offset : 4 - offset;
  const rowFromTop = 5 - levelFromBottom;
  return { row: rowFromTop + 1, column: column + 1 };
}
