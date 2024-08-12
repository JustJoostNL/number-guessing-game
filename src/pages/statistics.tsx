import { JSONTree } from "react-json-tree";
import { Box, Typography } from "@mui/material";
import { ContentLayout } from "@/components/layouts/ContentLayout";
import { useConfig } from "@/hooks/useConfig";
import { GameListCard } from "@/components/statistics/GameListCard";
import { AtAGlanceCard } from "@/components/statistics/AtAGlanceCard";
import { useDebug } from "@/hooks/useDebug";

export default function StatsPage() {
  const { config } = useConfig();
  const debug = useDebug();

  if (config.games.length === 0) {
    return (
      <ContentLayout title="Stats" titleVariant="h2">
        <Typography variant="body2" color="text.secondary" px={2}>
          No games played yet.
        </Typography>
        {debug && <JSONTree data={config} />}
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Stats" titleVariant="h2">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 4,
            maxWidth: "1200px",
            width: "100%",
          }}
        >
          <AtAGlanceCard />
          <GameListCard />
        </Box>
      </Box>
      {debug && <JSONTree data={config} />}
    </ContentLayout>
  );
}
