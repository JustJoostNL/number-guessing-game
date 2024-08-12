import { Card, CardContent, CardHeader, List } from "@mui/material";
import { FC, useMemo } from "react";
import { GameListItem } from "./GameListItem";
import { useConfig } from "@/hooks/useConfig";

export const GameListCard: FC = () => {
  const { config } = useConfig();

  const sortedGames = useMemo(
    () =>
      config.games.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [config.games],
  );

  return (
    <Card sx={{ width: "fit-content" }}>
      <CardHeader title="Game List" subheader="List of games played" />

      <CardContent>
        <List
          sx={{
            height: 500,
            overflow: "scroll",
          }}
        >
          {sortedGames.map((game) => (
            <GameListItem key={game.id} game={game} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
