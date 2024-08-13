import { Switch } from "@mui/material";
import { ChangeEvent, FC, useCallback } from "react";
import { useConfig } from "@/hooks/useConfig";
import { IConfig } from "@/lib/config/config_types";

interface IProps {
  configKey: keyof IConfig;
}

export const SettingsSwitch: FC<IProps> = ({ configKey }) => {
  const { config, updateConfig } = useConfig();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateConfig({
        [configKey]: event.target.checked,
      });
    },
    [configKey, updateConfig],
  );

  return (
    <Switch checked={Boolean(config[configKey])} onChange={handleChange} />
  );
};
