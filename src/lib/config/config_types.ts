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
   * A custom name for the game given by the player.
   */
  name?: string;

  /**
   * A custom description for the game given by the player.
   */
  description?: string;

  /**
   * The difficulty level of the game.
   */
  difficulty: number;

  /**
   * The username of the player.
   */
  username: string;

  /**
   * Whether the player has abandoned the game.
   */
  abandoned: boolean;

  /**
   * The maximum number of guesses allowed for the game.
   */
  maxGuesses: number;

  /**
   * Whether to prevent duplicate guesses for the game.
   */
  preventDuplicateGuesses: boolean;

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
  /**
   * The range of numbers that is used by default.
   */
  defaultNumberRange: [number, number];

  /**
   * Whether hints are enabled by default.
   */
  defaultHintsEnabled: boolean;

  /**
   * Whether to prevent duplicate guesses by default.
   */
  preventDuplicateGuessesByDefault: boolean;

  /**
   * Whether to use the settings of the last game as default.
   */
  useLastGameSettingsAsDefault: boolean;

  /**
   * The maximum number of guesses allowed by default.
   */
  defaultMaxGuesses: number;

  /**
   * The default username for the player.
   */
  defaultUsername: string | null;

  /**
   * The games that have been played.
   */
  games: IGame[];
}
