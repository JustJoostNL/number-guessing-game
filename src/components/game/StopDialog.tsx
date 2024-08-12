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

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  attempts: number;
  number: number;
  lastAttempt: number;
}

export const StopDialog: FC<IProps> = ({
  open,
  setOpen,
  attempts,
  number,
  lastAttempt,
}) => {
  const router = useRouter();
  const lastAttemptWasCorrect = lastAttempt === number;

  const handleGoHome = useCallback(() => {
    setOpen(false);
    router.push("/");
  }, [router, setOpen]);

  return (
    <Dialog open={open} onClose={handleGoHome} fullWidth maxWidth="sm">
      <DialogTitle>
        {lastAttemptWasCorrect ? "Congratulations!" : "Game Over!"}
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1">
          {lastAttemptWasCorrect
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
