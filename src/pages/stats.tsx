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

  const winRate = useMemo(
    () => (config.winCount / config.playedGames) * 100,
    [config.playedGames, config.winCount],
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
          <Stat title="Played games" value={config.playedGames} />
          <Stat title="Wins" value={config.winCount} />
          <Stat title="Win rate" value={`${winRate.toFixed(2)}%`} />
        </CardContent>
      </Card>
      {debug && <JSONTree data={config} />}
    </ContentLayout>
  );
}
