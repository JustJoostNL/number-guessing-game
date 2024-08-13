import { TextField } from "@mui/material";
import { ChangeEvent, FC, useCallback } from "react";
import { useConfig } from "@/hooks/useConfig";

export const DefaultMaxGuessesInput: FC = () => {
  const { config, updateConfig } = useConfig();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateConfig({
        defaultMaxGuesses: Number(event.target.value),
      });
    },
    [updateConfig],
  );

  const maxGuessesAllowed =
    config.defaultNumberRange[1] - config.defaultNumberRange[0];
  const maxGuessesError =
    config.defaultMaxGuesses < 1 ||
    config.defaultMaxGuesses > maxGuessesAllowed;

  return (
    <TextField
      label="Default max guesses"
      type="number"
      value={config.defaultMaxGuesses}
      error={maxGuessesError}
      helperText={`Must be between 1 and ${maxGuessesAllowed}`}
      onChange={handleChange}
      sx={{ width: 150 }}
      inputProps={{ min: 1, max: maxGuessesAllowed }}
    />
  );
};
