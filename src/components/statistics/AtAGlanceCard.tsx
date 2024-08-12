import { Card, CardHeader, CardContent } from "@mui/material";
import { FC, useMemo } from "react";
import { Stat } from "../shared/Stat";
import { useConfig } from "@/hooks/useConfig";

export const AtAGlanceCard: FC = () => {
  const { config } = useConfig();

  const winCount = useMemo(
    () => config.games.filter((g) => g.won).length,
    [config.games],
  );

  const playedGames = useMemo(() => config.games.length, [config.games]);

  const winRate = useMemo(
    () => (winCount / playedGames) * 100,
    [winCount, playedGames],
  );

  const averageGuesses = useMemo(
    () =>
      config.games.reduce((acc, game) => acc + game.guesses.length, 0) /
      playedGames,
    [config.games, playedGames],
  );

  const averageGameTime = useMemo(
    () =>
      config.games.reduce(
        (acc, game) =>
          acc +
          (new Date(game.date).getTime() -
            new Date(game.guesses[0].date).getTime()),
        0,
      ) /
      playedGames /
      1000,
    [config.games, playedGames],
  );

  const averageTimeBetweenGuesses = useMemo(
    () =>
      config.games.reduce((acc, game) => {
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
    [config.games, playedGames],
  );

  const totalGameTime = useMemo(
    () =>
      config.games.reduce(
        (acc, game) =>
          acc +
          (new Date(game.date).getTime() -
            new Date(game.guesses[0].date).getTime()),
        0,
      ) / 1000,
    [config.games],
  );

  const averageGamesPerDay = useMemo(
    () =>
      config.games.reduce((acc, game, index) => {
        if (index === 0) return 0;

        const previousGame = config.games[index - 1];
        const timeBetweenGames =
          new Date(game.date).getTime() - new Date(previousGame.date).getTime();

        return acc + timeBetweenGames;
      }, 0) /
      playedGames /
      1000 /
      60 /
      60 /
      24,
    [config.games, playedGames],
  );

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 400,
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
        <Stat title="Average guesses" value={averageGuesses.toFixed(2)} />
        <Stat title="Total game time" value={`${totalGameTime.toFixed(2)}s`} />
        <Stat
          title="Average game time"
          value={`${averageGameTime.toFixed(2)}s`}
        />
        <Stat
          title="Average guess interval"
          value={`${averageTimeBetweenGuesses.toFixed(2)}s`}
        />
        <Stat
          title="Average games per day"
          value={averageGamesPerDay.toFixed(2)}
        />
      </CardContent>
    </Card>
  );
};
