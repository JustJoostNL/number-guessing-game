import React from "react";
import { Container } from "@mui/material";
import { JSONTree } from "react-json-tree";
import { StartGameCard } from "@/components/settings/StartGameCard";
import { useConfig } from "@/hooks/useConfig";
import { useDebug } from "@/hooks/useDebug";

export default function Index() {
  const { config } = useConfig();
  const debug = useDebug();

  return (
    <React.Fragment>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <StartGameCard />
      </Container>

      {debug && <JSONTree data={config} />}
    </React.Fragment>
  );
}
