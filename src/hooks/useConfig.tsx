import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { IConfig } from "@/lib/config/config_types";
import { defaultConfig } from "@/lib/config/defaultConfig";
import { configEventEmitter, getConfig, setConfig } from "@/lib/config/config";

const ConfigContext = createContext<IConfig>(defaultConfig);

export function useConfig() {
  const currentConfig = useContext(ConfigContext);

  const _setConfig = useCallback((config: IConfig) => {
    setConfig(config);
  }, []);

  const updateConfig = useCallback(
    (config: Partial<IConfig>) => {
      setConfig({ ...currentConfig, ...config });
    },
    [currentConfig],
  );

  return {
    config: currentConfig,
    setConfig: _setConfig,
    updateConfig,
  };
}

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<IConfig>(defaultConfig);

  useEffect(() => {
    const configChangeHandler = (newConfig: IConfig) => {
      setConfig(newConfig);
    };

    configEventEmitter.on("config:change", configChangeHandler);

    return () => {
      configEventEmitter.off("config:change", configChangeHandler);
    };
  }, []);

  useEffect(() => {
    const newConfig = getConfig();
    setConfig({ ...defaultConfig, ...newConfig });
  }, []);

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}
