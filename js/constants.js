const TYPE_COLORS = {
  "L": 'red',
  "T": 'purple',
  "I": 'green'
};

const INITIAL_POSITIONS = {
  "L": [[8, 0], [7, 0], [7, 1], [7, 2]],
  "T": [[7, 0], [8, 1], [7, 1], [7, 2]],
  "I": [[9, 1], [8, 1], [7, 1]]
};

const MIRRORED_INITIAL_POSITIONS = {
  "L": [[7, 1], [8, 1], [8, 2], [8, 3]],
  "T": [[8, 1], [8, 2], [8, 2], [8, 3]],
  "I": [[9, 1], [8, 1], [7, 1]]
};

const FIGURE_TYPES = ["L", "I", "T"];
// Event keys
const DOWN  = "ArrowDown";
const LEFT  = "ArrowLeft";
const RIGHT = "ArrowRight";
const PAUSE = "Escape";
const UP = "ArrowUp";