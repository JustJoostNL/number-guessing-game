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
import { useRouter } from "next/router";
import { StopDialog } from "./StopDialog";
import { useConfig } from "@/hooks/useConfig";

interface IProps {
  number: number;
  guesses: number;
  hints: boolean;
  min: number;
  max: number;
}

interface AlertData {
  severity: AlertProps["severity"];
  show: boolean;
  message: string;
}

export const PlayCard: FC<IProps> = ({ number, guesses, hints, min, max }) => {
  const { config, updateConfig } = useConfig();
  const router = useRouter();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [input, setInput] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number>(0);
  const [alertData, setAlertData] = useState<AlertData>({
    severity: "info",
    show: false,
    message: "",
  });

  const shouldStop = attempts >= guesses;

  useEffect(() => {
    if (shouldStop) setDialogOpen(true);
  }, [shouldStop]);

  const handleGuess = useCallback(() => {
    if (!input) return;

    setAttempts((prev) => prev + 1);

    setAlertData({
      severity: input === number ? "success" : "warning",
      show: true,
      message:
        input === number
          ? "Congratulations! You guessed the number!"
          : hints
            ? input < number
              ? `The number ${input} is too low, try a higher number!`
              : `The number ${input} is too high, try a lower number!`
            : `The number ${input} is incorrect, try again!`,
    });

    if (input === number) {
      setDialogOpen(true);
      updateConfig({
        winCount: config.winCount + 1,
        playedGames: config.playedGames + 1,
      });
    }
  }, [config.playedGames, config.winCount, hints, input, number, updateConfig]);

  const handleLeaveEarly = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleInputChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      const parsed = parseInt(ev.target.value, 10);

      if (!isNaN(parsed)) setInput(parsed);
    },
    [setInput],
  );

  return (
    <Card
      sx={{
        margin: "auto",
        width: "30%",
      }}
    >
      <StopDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        attempts={attempts}
        number={number}
        lastAttempt={input ?? 0}
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
            You have {guesses - attempts} guesses left.
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
