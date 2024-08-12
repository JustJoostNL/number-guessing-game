import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { JSONTree } from "react-json-tree";
import Link from "next/link";
import { generateNumber, ISettingsPayload } from "@/lib/shared";
import { useDebug } from "@/hooks/useDebug";
import { ContentLayout } from "@/components/layouts/ContentLayout";

export default function GamePage() {
  const params = useSearchParams();
  const debug = useDebug();
  const [generatedNumber, setGeneratedNumber] = useState<number | null>(null);

  const decodedParams: ISettingsPayload | "error" | null = useMemo(() => {
    const s = params.get("s");

    if (!s) return null;

    try {
      const parsedData = JSON.parse(atob(s));
      return parsedData;
    } catch (err) {
      return "error";
    }
  }, [params]);

  useEffect(() => {
    if (
      !decodedParams ||
      decodedParams === "error" ||
      typeof generatedNumber === "number"
    ) {
      return;
    }

    const number = generateNumber(decodedParams.v[0], decodedParams.v[1], []);
    setGeneratedNumber(number);
  }, [decodedParams, generatedNumber]);

  if (decodedParams === "error") {
    return (
      <ContentLayout title="Play" titleVariant="h2">
        <Typography variant="body1" px={2}>
          Invalid settings, please start a game from the{" "}
          <Link href="/">home page</Link> (and try again).
        </Typography>
      </ContentLayout>
    );
  }

  if (!generatedNumber) {
    return (
      <ContentLayout title="Play" titleVariant="h2">
        <Typography variant="body1" px={2}>
          Generating a number...
        </Typography>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Play" titleVariant="h2">
      {debug && (
        <Box sx={{ width: "100%", overflow: "auto", mt: 2 }}>
          <JSONTree data={{ params: decodedParams, number: generatedNumber }} />
        </Box>
      )}
    </ContentLayout>
  );
}
