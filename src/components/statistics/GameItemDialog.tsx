import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useCallback } from "react";
import { enqueueSnackbar } from "notistack";
import { Label, LabelColor } from "../shared/Label";
import { Stat } from "../shared/Stat";
import { IGame } from "@/lib/config/config_types";
import { useConfig } from "@/hooks/useConfig";

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  game: IGame;
}

export const GameItemDialog: FC<IProps> = ({ open, setOpen, game }) => {
  const { config, updateConfig } = useConfig();

  const handleDeleteGame = useCallback(() => {
    if (window.confirm(`Are you sure you want to delete game ${game.id}?`)) {
      const updatedGames = config.games.filter((g) => g.id !== game.id);
      updateConfig({ games: updatedGames });
      setOpen(false);
    }
  }, [config.games, game.id, setOpen, updateConfig]);

  const handleChangeGameMeta = useCallback(
    (newValue: string, meta: "name" | "description") => {
      const value = newValue === "" ? undefined : newValue;

      updateConfig({
        games: config.games.map((g) =>
          g.id === game.id ? { ...g, [meta]: value } : g,
        ),
      });
    },
    [config.games, game.id, updateConfig],
  );

  const handleShare = useCallback(() => {
    const gameData = btoa(JSON.stringify(game));
    const url = `${window.location.origin}/share?d=${gameData}`;

    navigator.clipboard.writeText(url);
    enqueueSnackbar("Game URL copied to clipboard", { variant: "success" });
  }, [game]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>
        Game {game.id}
        <Label color={game.won ? LabelColor.SUCCESS : LabelColor.ERROR} ml={1}>
          {game.won ? "Won" : "Lost"}
        </Label>
      </DialogTitle>

      <DialogContent>
        <Typography variant="h6">Game Details</Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0 }}>
          You can edit the name and description of the game here.
        </Typography>

        <TextField
          label="Name"
          fullWidth
          value={game.name}
          onChange={(e) => handleChangeGameMeta(e.target.value, "name")}
          sx={{ mt: 2 }}
        />

        <TextField
          label="Description"
          fullWidth
          value={game.description}
          onChange={(e) => handleChangeGameMeta(e.target.value, "description")}
          sx={{ mt: 2 }}
        />

        <Typography variant="h6" sx={{ mt: 2 }}>
          Game Statistics
        </Typography>

        <Stack
          direction="row"
          mt={1}
          spacing={2}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
        >
          <Stat title="Game ID" value={game.id} />
          <Stat title="Guesses" value={game.guesses.length} />
          <Stat
            title="Number Range"
            value={`${game.numberRange[0]} - ${game.numberRange[1]}`}
          />
          <Stat
            title="Hints"
            value={game.hintsEnabled ? "Enabled" : "Disabled"}
          />
          <Stat title="Difficulty" value={game.difficulty} />
          <Stat
            title="Date / Time"
            value={new Date(game.date).toLocaleString()}
          />
          <Stat title="Number" value={`${game.number}`} />
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button color="error" onClick={handleDeleteGame}>
          Delete game
        </Button>

        <Button variant="outlined" onClick={handleShare}>
          Share game
        </Button>

        <Button color="primary" variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
