import { JSONTree } from "react-json-tree";
import { Box } from "@mui/material";
import { ContentLayout } from "@/components/layouts/ContentLayout";
import { useConfig } from "@/hooks/useConfig";
import { GameListCard } from "@/components/statistics/GameListCard";
import { AtAGlanceCard } from "@/components/statistics/AtAGlanceCard";
import { useDebug } from "@/hooks/useDebug";

export default function StatsPage() {
  const { config } = useConfig();
  const debug = useDebug();

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
        {debug && <JSONTree data={config} />}
      </Box>
    </ContentLayout>
  );
}
