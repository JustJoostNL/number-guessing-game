import { IConfig } from "./config_types";

export const defaultConfig: IConfig = {
  defaultNumberRange: [1, 25],
  defaultHintsEnabled: true,
  defaultMaxGuesses: 5,
  preventDuplicateGuessesByDefault: false,
  defaultUsername: null,
  useLastGameSettingsAsDefault: true,
  hideNavbarDuringGame: false,
  games: [],
};
