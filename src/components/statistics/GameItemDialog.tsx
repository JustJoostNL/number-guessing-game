import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { FC, useCallback } from "react";
import { Label, LabelColor } from "../shared/Label";
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

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>Game {game.id}</DialogTitle>

      <DialogContent>
        <Label color={game.won ? LabelColor.SUCCESS : LabelColor.ERROR}>
          {game.won ? "Won" : "Lost"}
        </Label>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button color="error" onClick={handleDeleteGame}>
          Delete game
        </Button>

        <Button color="primary" variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
