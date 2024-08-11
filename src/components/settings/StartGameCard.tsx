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
import React, { FC, useState, useCallback } from "react";
import { NumberRangeSlider } from "./NumberRangeSlider";

const MIN_DISTANCE = 2;

export const StartGameCard: FC = () => {
  const [value, setValue] = useState<number[]>([0, 25]);
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

  return (
    <Card
      sx={{
        width: "100%",
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
          />
        </ListItem>

        <Button
          variant="contained"
          color="primary"
          startIcon={<RocketLaunchRounded />}
          sx={{ display: "flex", margin: "auto", marginTop: 2, width: 150 }}
          onClick={() => {
            console.log(value, enableHints, maxGuesses);
          }}
        >
          Start Game
        </Button>
      </CardContent>
    </Card>
  );
};
