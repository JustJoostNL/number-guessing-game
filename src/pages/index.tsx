import React from "react";
import { JSONTree } from "react-json-tree";
import { Box } from "@mui/material";
import { StartGameCard } from "@/components/settings/StartGameCard";
import { useConfig } from "@/hooks/useConfig";
import { useDebug } from "@/hooks/useDebug";
import { ContentLayout } from "@/components/layouts/ContentLayout";

export default function Index() {
  const { config } = useConfig();
  const debug = useDebug();

  return (
    <ContentLayout title="Home" titleVariant="h2">
      <Box
        sx={{
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StartGameCard />
      </Box>

      {debug && <JSONTree data={config} />}
    </ContentLayout>
  );
}
