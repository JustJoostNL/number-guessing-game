import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import { useConfig } from "@/hooks/useConfig";
import { IGuess } from "@/lib/config/config_types";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  maxGuesses: number;
  guesses: IGuess[];
  difficulty: number;
  preventDuplicateGuesses: boolean;
  abandoned: boolean;
  numberRange: [number, number];
  hintsEnabled: boolean;
  number: number;
}

export const GameEndDialog: FC<IProps> = ({
  open,
  setOpen,
  maxGuesses,
  difficulty,
  preventDuplicateGuesses,
  abandoned,
  guesses,
  numberRange,
  hintsEnabled,
  number,
}) => {
  const { config, updateConfig } = useConfig();
  const router = useRouter();

  const attempts = guesses.length;
  const lastAttempt = guesses[attempts - 1]?.number;
  const lastAttemptWasCorrect = lastAttempt === number;

  const handleRegisterGame = useCallback(() => {
    const nextId = config.games.length + 1;

    updateConfig({
      games: [
        ...config.games,
        {
          id: nextId,
          maxGuesses,
          difficulty,
          number,
          guesses,
          preventDuplicateGuesses,
          numberRange,
          abandoned,
          hintsEnabled,
          won: lastAttemptWasCorrect,
          date: new Date().toISOString(),
        },
      ],
    });
  }, [
    abandoned,
    config.games,
    difficulty,
    guesses,
    hintsEnabled,
    lastAttemptWasCorrect,
    maxGuesses,
    number,
    numberRange,
    preventDuplicateGuesses,
    updateConfig,
  ]);

  const handleGoHome = useCallback(() => {
    setOpen(false);
    handleRegisterGame();
    router.push("/");
  }, [handleRegisterGame, router, setOpen]);

  return (
    <Dialog open={open} onClose={handleGoHome} fullWidth maxWidth="sm">
      <DialogTitle>
        {abandoned
          ? "Abandoned Game"
          : lastAttemptWasCorrect
            ? "Congratulations!"
            : "Game Over!"}
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1">
          {abandoned
            ? "You have abandoned the game."
            : lastAttemptWasCorrect
              ? `You guessed the number ${number} after ${attempts > 1 ? `${attempts} attempts` : "a single attempt"}!`
              : `You couldn't guess the number ${number} in ${attempts} attempts!`}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={handleGoHome}>
          Go home
        </Button>
      </DialogActions>
    </Dialog>
  );
};
