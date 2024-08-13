import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { JSONTree } from "react-json-tree";
import { ContentLayout } from "@/components/layouts/ContentLayout";
import { Label, LabelColor } from "@/components/shared/Label";
import { Stat } from "@/components/shared/Stat";
import { useDebug } from "@/hooks/useDebug";
import { IGame } from "@/lib/config/config_types";
import { safeValue } from "@/lib/shared";

export default function SharePage() {
  const params = useSearchParams();
  const debug = useDebug();

  const sharedGame: IGame | null = useMemo(() => {
    const data = params.get("d");

    if (!data) return null;

    try {
      return JSON.parse(atob(data));
    } catch (err) {
      return null;
    }
  }, [params]);

  if (!sharedGame) {
    return (
      <ContentLayout title="Shared Game" titleVariant="h2">
        <Typography variant="body1" px={2}>
          Invalid shared game data.
        </Typography>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Shared Game" titleVariant="h2">
      <Card sx={{ width: "fit-content", maxWidth: "50%", margin: "auto" }}>
        <CardHeader
          title={
            <React.Fragment>
              {sharedGame?.name ?? `Game ${sharedGame?.id}`}
              <Label
                color={sharedGame?.won ? LabelColor.SUCCESS : LabelColor.ERROR}
                ml={1}
              >
                {sharedGame?.won ? "Won" : "Lost"}
              </Label>
            </React.Fragment>
          }
          subheader={
            safeValue(sharedGame.description) +
            " " +
            new Date(sharedGame?.date).toLocaleString()
          }
        />

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Stack
            direction="row"
            mt={1}
            spacing={4}
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
          >
            <Stat title="Game ID" value={sharedGame.id} />
            <Stat title="Username" value={sharedGame.username} />
            <Stat title="Guesses" value={sharedGame.guesses.length} />
            <Stat title="Max Guesses" value={sharedGame.maxGuesses} />
            <Stat
              title="Number Range"
              value={`${sharedGame.numberRange[0]} - ${sharedGame.numberRange[1]}`}
            />
            <Stat
              title="Hints"
              value={sharedGame.hintsEnabled ? "Enabled" : "Disabled"}
            />
            <Stat
              title="Prevent Duplicate Guesses"
              value={sharedGame.preventDuplicateGuesses ? "Yes" : "No"}
            />
            <Stat
              title="Date / Time"
              value={new Date(sharedGame.date).toLocaleString()}
            />
            <Stat title="Number" value={`${sharedGame.number}`} />
            <Stat title="Difficulty" value={sharedGame.difficulty} />

            <Stat
              title="Abandoned"
              value={sharedGame.abandoned ? "Yes" : "No"}
            />
          </Stack>

          <Typography variant="h4" sx={{ mb: 1, mt: 3 }}>
            Guesses
          </Typography>

          {sharedGame.guesses.map((guess, index) => (
            <Stack
              key={index}
              direction="row"
              mt={1}
              spacing={4}
              flexWrap="wrap"
              alignItems="center"
              justifyContent="center"
            >
              <Stat title="Guess" value={guess.number} />
              <Stat
                title="Date / Time"
                value={new Date(guess.date).toLocaleString()}
              />
            </Stack>
          ))}
        </CardContent>
      </Card>

      {debug && <JSONTree data={sharedGame} />}
    </ContentLayout>
  );
}
