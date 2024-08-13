import { TextField } from "@mui/material";
import { ChangeEvent, FC, useCallback } from "react";
import { useConfig } from "@/hooks/useConfig";
import { IConfig } from "@/lib/config/config_types";

interface IProps {
  label: string;
  configKey: keyof IConfig;
}

export const TextInputSetting: FC<IProps> = ({ label, configKey }) => {
  const { config, updateConfig } = useConfig();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateConfig({
        [configKey]: event.target.value,
      });
    },
    [configKey, updateConfig],
  );

  return (
    <TextField
      label={label}
      value={config[configKey] ?? ""}
      onChange={handleChange}
    />
  );
};
