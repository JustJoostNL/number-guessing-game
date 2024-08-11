import { useCallback, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export function useDebug() {
  const [debug, setDebug] = useState<boolean>(false);

  const handleToggleDebug = useCallback(() => {
    setDebug((prev) => !prev);
  }, []);

  useHotkeys("shift+d", handleToggleDebug);

  return debug;
}
