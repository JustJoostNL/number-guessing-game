import deepEqual from "deep-equal";
import EventEmitter from "eventemitter3";
import { IConfig } from "./config_types";
import { defaultConfig } from "./defaultConfig";

export const configEventEmitter = new EventEmitter();

export function removeDefaultConfig(config: IConfig): Partial<IConfig> {
  return Object.fromEntries(
    Object.entries(config).filter(
      ([key, value]) => !deepEqual(defaultConfig[key as keyof IConfig], value),
    ),
  );
}

export function readConfig(): IConfig {
  try {
    const configJSON = localStorage.getItem("config");
    if (!configJSON) return defaultConfig;

    return JSON.parse(configJSON);
  } catch (err) {
    return defaultConfig;
  }
}

export function hasConfig(): boolean {
  return localStorage.getItem("config") !== null;
}

export function getConfig(): IConfig {
  if (!hasConfig()) return defaultConfig;

  const config = readConfig();
  return { ...defaultConfig, ...config };
}

export function setConfig(config: IConfig) {
  const configJSON = JSON.stringify(removeDefaultConfig(config));

  configEventEmitter.emit("config:change", config);
  localStorage.setItem("config", configJSON);
}

export function patchConfig(configPatch: Partial<IConfig>) {
  const config = getConfig();
  const newConfig = { ...config, ...configPatch };
  setConfig(newConfig);
}
