import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Alert,
  AlertProps,
  AlertTitle,
  Stack,
} from "@mui/material";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { GameEndDialog } from "./GameEndDialog";
import { IGuess } from "@/lib/config/config_types";

interface IProps {
  number: number;
  maxGuesses: number;
  hintsEnabled: boolean;
  min: number;
  max: number;
}

interface AlertData {
  severity: AlertProps["severity"];
  show: boolean;
  message: string;
}

export const PlayCard: FC<IProps> = ({
  number,
  maxGuesses,
  hintsEnabled,
  min,
  max,
}) => {
  const [input, setInput] = useState<number | null>(null);
  const [abandoned, setAbandoned] = useState<boolean>(false);
  const [guesses, setGuesses] = useState<IGuess[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [alertData, setAlertData] = useState<AlertData>({
    severity: "info",
    show: false,
    message: "",
  });

  const shouldStop = guesses.length >= maxGuesses;

  useEffect(() => {
    if (shouldStop || abandoned) setDialogOpen(true);
  }, [shouldStop, abandoned]);

  const handleGuess = useCallback(() => {
    if (!input) return;

    setGuesses([...guesses, { number: input, date: new Date().toISOString() }]);

    setAlertData({
      severity: input === number ? "success" : "warning",
      show: true,
      message:
        input === number
          ? "Congratulations! You guessed the number!"
          : hintsEnabled
            ? input < number
              ? `The number ${input} is too low, try a higher number!`
              : `The number ${input} is too high, try a lower number!`
            : `The number ${input} is incorrect, try again!`,
    });

    if (input === number) setDialogOpen(true);
  }, [guesses, hintsEnabled, input, number]);

  const handleLeaveEarly = useCallback(() => {
    setAbandoned(true);
  }, []);

  const handleInputChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const parsed = parseInt(ev.target.value, 10);

      if (!isNaN(parsed)) setInput(parsed);
    },
    [setInput],
  );

  return (
    <Card sx={{ width: "30%" }}>
      <GameEndDialog
        open={dialogOpen}
        abandoned={abandoned}
        setOpen={setDialogOpen}
        number={number}
        maxGuesses={maxGuesses}
        guesses={guesses}
        numberRange={[min, max]}
        hintsEnabled={hintsEnabled}
      />
      <CardHeader
        title="Guess the number"
        subheader="You can start guessing now!"
      />

      <CardContent>
        {alertData.show && (
          <Alert
            severity={alertData.severity}
            sx={{
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <AlertTitle sx={{ mb: 0 }}>{alertData.message}</AlertTitle>
            You have {maxGuesses - guesses.length} guesses left.
          </Alert>
        )}

        <TextField
          label="Your guess"
          type="number"
          value={input ?? ""}
          onChange={handleInputChange}
          sx={{ width: "100%" }}
          error={input !== null && (input < min || input > max)}
          helperText={`Must be between ${min} and ${max}`}
          inputProps={{ min, max }}
        />

        <Stack
          direction="row"
          spacing={2}
          sx={{ marginTop: 2, height: 40 }}
          justifyContent="center"
        >
          <Button
            onClick={handleLeaveEarly}
            variant="outlined"
            sx={{ width: "25%" }}
          >
            Leave early
          </Button>

          <Button
            variant="contained"
            onClick={handleGuess}
            sx={{
              display: "flex",
              margin: "auto",
              width: "75%",
            }}
            disabled={input === null || input < min || input > max}
          >
            Guess
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
