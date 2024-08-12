import { JSONTree } from "react-json-tree";
import { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { ContentLayout } from "@/components/layouts/ContentLayout";
import { useConfig } from "@/hooks/useConfig";
import { useDebug } from "@/hooks/useDebug";
import { Stat } from "@/components/shared/Stat";

export default function StatsPage() {
  const { config } = useConfig();
  const debug = useDebug();

  const winCount = useMemo(
    () => config.games.filter((g) => g.won).length,
    [config.games],
  );

  const playedGames = useMemo(() => config.games.length, [config.games]);

  const winRate = useMemo(
    () => (winCount / playedGames) * 100,
    [winCount, playedGames],
  );

  return (
    <ContentLayout title="Stats" titleVariant="h2">
      <Card
        sx={{
          width: "100%",
          maxWidth: 400,
          margin: "auto",
        }}
      >
        <CardHeader title="Stats" subheader="Your game statistics" />

        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          <Stat title="Played games" value={playedGames} />
          <Stat title="Wins" value={winCount} />
          <Stat title="Win rate" value={`${winRate.toFixed(2)}%`} />
        </CardContent>
      </Card>
      {debug && <JSONTree data={config} />}
    </ContentLayout>
  );
}
