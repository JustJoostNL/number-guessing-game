import { Card, CardContent, CardHeader, List } from "@mui/material";
import { FC } from "react";
import { GameListItem } from "./GameListItem";
import { useConfig } from "@/hooks/useConfig";

export const GameListCard: FC = () => {
  const { config } = useConfig();
  return (
    <Card
      sx={{
        width: 600,
      }}
    >
      <CardHeader title="Game List" subheader="List of games played" />

      <CardContent>
        <List
          sx={{
            maxHeight: 200,
            overflow: "scroll",
          }}
        >
          {config.games.map((game) => (
            <GameListItem key={game.id} game={game} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
