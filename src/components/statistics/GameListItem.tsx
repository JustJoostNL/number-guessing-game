import { GamepadRounded, ScheduleRounded } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { FC, useCallback, useMemo, useState } from "react";
import { Label, LabelColor } from "../shared/Label";
import { RelativeTimeAgo } from "../shared/RelativeTimeAgo";
import { GameItemDialog } from "./GameItemDialog";
import { IGame } from "@/lib/config/config_types";

interface IProps {
  game: IGame;
}

export const GameListItem: FC<IProps> = ({ game }) => {
  const [open, setOpen] = useState(false);

  const calculatedGameTime = useMemo(
    () =>
      new Date(game.date).getTime() - new Date(game.guesses[0]?.date).getTime(),
    [game.date, game.guesses],
  );

  const handleGameItemPress = useCallback(() => {
    setOpen(true);
  }, []);

  if (!calculatedGameTime) return null; // if not available, it's likely a abandoned game with too less data

  return (
    <ListItem>
      <GameItemDialog game={game} open={open} setOpen={setOpen} />
      <ListItemButton onClick={handleGameItemPress}>
        <ListItemIcon>
          <GamepadRounded />
        </ListItemIcon>

        <ListItemText
          primary={game.name ?? `Game ${game.id}`}
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
                color={
                  game.hintsEnabled ? LabelColor.SUCCESS : LabelColor.ERROR
                }
              >
                {game.hintsEnabled ? "Hints" : "No hints"}
              </Label>

              <Label>
                {game.guesses.length} guess
                {game.guesses.length > 1 ? "es" : ""}
              </Label>

              <Label color={LabelColor.WARNING}>
                {game.numberRange[0]} - {game.numberRange[1]}
              </Label>

              <Label color={LabelColor.INFO}>
                <RelativeTimeAgo value={new Date(game.date).getTime() / 1000} />
              </Label>
            </Stack>
          }
        />
      </ListItemButton>
    </ListItem>
  );
};
