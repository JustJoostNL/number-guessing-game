import { GamepadRounded, ScheduleRounded } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { FC, useMemo } from "react";
import { Label, LabelColor } from "../shared/Label";
import { RelativeTimeAgo } from "../shared/RelativeTimeAgo";
import { IGame } from "@/lib/config/config_types";

interface IProps {
  game: IGame;
}

export const GameListItem: FC<IProps> = ({ game }) => {
  const calculatedGameTime = useMemo(
    () =>
      new Date(game.date).getTime() - new Date(game.guesses[0].date).getTime(),
    [game.date, game.guesses],
  );

  return (
    <ListItem>
      <ListItemIcon>
        <GamepadRounded />
      </ListItemIcon>

      <ListItemText
        primary={`Game ${game.id}`}
        primaryTypographyProps={{ fontSize: "1.2rem", fontWeight: "bold" }}
        secondary={
          <Stack direction="row" mt={0.5} spacing={1}>
            <Label color={game.won ? LabelColor.SUCCESS : LabelColor.ERROR}>
              {game.won ? "Won" : "Lost"}
            </Label>

            <Label>
              <ScheduleRounded fontSize="inherit" sx={{ mr: 0.5 }} />
              {calculatedGameTime / 1000}
            </Label>

            <Label
              color={game.hintsEnabled ? LabelColor.SUCCESS : LabelColor.ERROR}
            >
              {game.hintsEnabled ? "Hints" : "No hints"}
            </Label>

            <Label>
              {game.guesses.length} guess
              {game.guesses.length > 1 ? "es" : ""}
            </Label>

            <Label color={LabelColor.INFO}>
              <RelativeTimeAgo value={new Date(game.date).getTime() / 1000} />
            </Label>
          </Stack>
        }
      />
    </ListItem>
  );
};
