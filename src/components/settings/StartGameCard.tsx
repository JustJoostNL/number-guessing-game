import {
  Button,
  Card,
  CardContent,
  CardHeader,
  ListItem,
  ListItemText,
  Switch,
  TextField,
} from "@mui/material";
import { RocketLaunchRounded } from "@mui/icons-material";
import React, { FC, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { NumberRangeSlider } from "./NumberRangeSlider";
import { useConfig } from "@/hooks/useConfig";

const MIN_DISTANCE = 2;

export const StartGameCard: FC = () => {
  const router = useRouter();
  const { config, updateConfig } = useConfig();

  const [value, setValue] = useState<number[]>([1, 25]);
  const [enableHints, setEnableHints] = useState<boolean>(true);
  const [maxGuesses, setMaxGuesses] = useState<number>(10);

  const handleChange = useCallback(
    (newValue: number | number[]) => {
      if (!Array.isArray(newValue)) {
        return;
      }

      setValue(newValue);
    },
    [setValue],
  );

  const handleStartGame = useCallback(() => {
    updateConfig({
      numberRange: value as [number, number],
      hints: enableHints,
      maxGuesses,
    });

    router.push({
      pathname: "/game",
      query: {
        s: btoa(
          JSON.stringify({
            v: value,
            h: enableHints,
            mg: maxGuesses,
          }),
        ),
      },
    });
  }, [updateConfig, value, enableHints, maxGuesses, router]);

  useEffect(() => {
    setValue(config.numberRange);
    setEnableHints(config.hints);
    setMaxGuesses(config.maxGuesses);
  }, [config]);

  const maxGuessesAllowed = value[1] - value[0];
  const maxGuessesError = maxGuesses < 1 || maxGuesses > maxGuessesAllowed;

  return (
    <Card
      sx={{
        width: "60%",
        margin: "auto",
      }}
    >
      <CardHeader
        title="Welcome to Number Guessing Game"
        subheader="Please define your settings below"
      />

      <CardContent>
        <ListItem>
          <ListItemText
            primary="Number Range"
            secondary="Define the range of numbers to guess"
          />

          <div style={{ width: 300 }}>
            <NumberRangeSlider
              value={value}
              onChange={handleChange}
              min={1}
              max={100}
              minDistance={MIN_DISTANCE}
            />
          </div>
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Enable hints"
            secondary="If you guess wrong, it will show you if the number is higher or lower"
          />

          <Switch
            checked={enableHints}
            onChange={() => setEnableHints((prev) => !prev)}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Max guesses"
            secondary="How many guesses you have before the game ends"
          />

          <TextField
            label="Max guesses"
            type="number"
            value={maxGuesses}
            onChange={(ev) => setMaxGuesses(Number(ev.target.value))}
            sx={{ width: 150 }}
            error={maxGuessesError}
            helperText={`Must be between 1 and ${maxGuessesAllowed}`}
            inputProps={{ min: 1, max: maxGuessesAllowed }}
          />
        </ListItem>

        <Button
          variant="contained"
          color="primary"
          startIcon={<RocketLaunchRounded />}
          disabled={maxGuessesError}
          sx={{ display: "flex", margin: "auto", mt: 2, width: 200 }}
          onClick={handleStartGame}
        >
          Start Game
        </Button>
      </CardContent>
    </Card>
  );
};
