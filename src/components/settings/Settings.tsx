import { FC, useCallback } from "react";
import { Stack, Card, CardHeader, List, ListItem, Button } from "@mui/material";
import { JSONTree } from "react-json-tree";
import {
  ListItemTextStyled,
  SettingsGroup,
  SettingsGroupProps,
} from "./SettingsGroup";
import { TextInputSetting } from "./TextInputSetting";
import { SettingsSwitch } from "./SettingsSwitch";
import { useConfig } from "@/hooks/useConfig";
import { useDebug } from "@/hooks/useDebug";
import { defaultConfig } from "@/lib/config/defaultConfig";

export const Settings: FC = () => {
  const { config, setConfig } = useConfig();
  const debug = useDebug();

  const handleResetConfig = useCallback(() => {
    if (
      confirm(
        "Are you sure you want to reset all settings to default? This will include your game history.",
      )
    ) {
      setConfig(defaultConfig);
    }
  }, [setConfig]);

  const settings: SettingsGroupProps[] = [
    {
      defaultOpen: true,
      title: "Game defaults",
      description:
        "Here you can set the default values of settings for your games",
      settings: [
        {
          title: "Default username",
          description:
            "The default username that will be used when starting a game",
          type: "setting",
          configKeys: ["defaultUsername"],
          input: (
            <TextInputSetting label="Username" configKey="defaultUsername" />
          ),
        },
      ],
    },
    {
      defaultOpen: false,
      title: "Other settings",
      description: "Some other settings that you can change",
      settings: [
        {
          title: "Use last game settings as default",
          description:
            "When enabled, the settings of the last game will be used as default for the next game(s)",
          type: "setting",
          configKeys: ["useLastGameSettingsAsDefault"],
          input: <SettingsSwitch configKey="useLastGameSettingsAsDefault" />,
        },
      ],
    },
  ];

  return (
    <Stack gap={3} mb={3}>
      {settings.map((setting, index) => (
        <SettingsGroup
          key={index}
          defaultOpen={setting.defaultOpen}
          title={setting.title}
          description={setting.description}
          settings={setting.settings}
        />
      ))}

      <Card variant="outlined" sx={{ borderColor: "error.main" }}>
        <CardHeader
          title="Danger area"
          titleTypographyProps={{ color: "error.main" }}
        />

        <List>
          <ListItem>
            <ListItemTextStyled
              primary="Restore default settings"
              secondary="This will reset all settings to their default value. You can't undo this"
            />

            <Button
              onClick={handleResetConfig}
              color="error"
              variant="contained"
            >
              Restore default settings
            </Button>
          </ListItem>
        </List>
      </Card>

      {debug && <JSONTree data={config} />}
    </Stack>
  );
};
