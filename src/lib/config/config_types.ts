export interface IGuess {
  /**
   * The number that the player guessed.
   */
  number: number;

  /**
   * The date and time the guess was made.
   */
  date: string;
}

export interface IGame {
  /**
   * The unique identifier for the game.
   */
  id: number;

  /**
   * The maximum number of guesses allowed for the game.
   */
  maxGuesses: number;

  /**
   * The number that the player is trying to guess.
   */
  number: number;

  /**
   * The numbers that the player has guessed so far.
   */
  guesses: IGuess[];

  /**
   * The number range that the player can guess from.
   */
  numberRange: [number, number];

  /**
   * Whether hints are enabled for the game.
   */
  hintsEnabled: boolean;

  /**
   * Whether the player has won the game.
   */
  won: boolean;

  /**
   * The date and time the game was played.
   */
  date: string;
}

export interface IConfig {
  numberRange: [number, number];
  hints: boolean;
  maxGuesses: number;
  games: IGame[];
}
