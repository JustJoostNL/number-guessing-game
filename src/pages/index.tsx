import React from "react";
import { Container } from "@mui/material";
import { StartGameCard } from "@/components/settings/StartGameCard";

export default function Index() {
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
    </React.Fragment>
  );
}
