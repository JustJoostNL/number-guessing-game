import { Card, CardHeader, CardContent } from "@mui/material";
import { FC, useMemo } from "react";
import { Stat } from "../shared/Stat";
import { useConfig } from "@/hooks/useConfig";

export const AtAGlanceCard: FC = () => {
  const { config } = useConfig();

  const filteredGames = useMemo(
    () => config.games.filter((g) => g.guesses.length > 0),
    [config.games],
  );

  const winCount = useMemo(
    () => filteredGames.filter((g) => g.won).length,
    [filteredGames],
  );

  const playedGames = useMemo(
    () => filteredGames.length,
    [filteredGames.length],
  );

  const abandonedGames = useMemo(
    () => filteredGames.filter((g) => g.abandoned).length,
    [filteredGames],
  );

  const winRate = useMemo(
    () => (winCount / playedGames) * 100,
    [winCount, playedGames],
  );

  const averageGuesses = useMemo(
    () =>
      filteredGames.reduce((acc, game) => acc + game.guesses.length, 0) /
      playedGames,
    [filteredGames, playedGames],
  );

  const averageGameTime = useMemo(
    () =>
      filteredGames.reduce(
        (acc, game) =>
          acc +
          (new Date(game.date).getTime() -
            new Date(game.guesses[0].date).getTime()),
        0,
      ) /
      playedGames /
      1000,
    [filteredGames, playedGames],
  );

  const duplicateGuesses = useMemo(
    () =>
      filteredGames.reduce((acc, game) => {
        const guesses = game.guesses;
        const duplicates = guesses.reduce((acc, guess, index) => {
          if (index === 0) return acc;

          const previousGuesses = guesses.slice(0, index);
          return previousGuesses.some((g) => g.number === guess.number)
            ? acc + 1
            : acc;
        }, 0);

        return acc + duplicates;
      }, 0),
    [filteredGames],
  );

  const averageTimeBetweenGuesses = useMemo(
    () =>
      filteredGames.reduce((acc, game) => {
        const guesses = game.guesses;
        const timeBetweenGuesses = guesses.map((guess, index) => {
          if (index === 0) return 0;

          const previousGuess = guesses[index - 1];
          return (
            new Date(guess.date).getTime() -
            new Date(previousGuess.date).getTime()
          );
        });

        return (
          acc +
          timeBetweenGuesses.reduce((acc, time) => acc + time, 0) /
            timeBetweenGuesses.length
        );
      }, 0) /
      playedGames /
      1000,
    [filteredGames, playedGames],
  );

  const totalGameTime = useMemo(
    () =>
      filteredGames.reduce(
        (acc, game) =>
          acc +
          (new Date(game.date).getTime() -
            new Date(game.guesses[0].date).getTime()),
        0,
      ) / 1000,
    [filteredGames],
  );

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 400,
      }}
    >
      <CardHeader title="Stats" subheader="Your personalised stats" />

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
        <Stat title="Abandoned games" value={abandonedGames} />
        <Stat title="Average guesses" value={averageGuesses.toFixed(2)} />
        <Stat title="Duplicate guesses" value={duplicateGuesses} />
        <Stat title="Total game time" value={`${totalGameTime.toFixed(2)}s`} />
        <Stat
          title="Average game time"
          value={`${averageGameTime.toFixed(2)}s`}
        />
        <Stat
          title="Average guess interval"
          value={`${averageTimeBetweenGuesses.toFixed(2)}s`}
        />
      </CardContent>
    </Card>
  );
};
