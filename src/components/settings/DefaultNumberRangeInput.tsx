import { FC, useCallback } from "react";
import { Slider } from "@mui/material";
import { useConfig } from "@/hooks/useConfig";

const minDistance = 2;
const min = 1;
const max = 100;

export const DefaultNumberRangeInput: FC = () => {
  const { config, updateConfig } = useConfig();

  const handleChange = useCallback(
    (value: number[]) => {
      updateConfig({
        defaultNumberRange: value as [number, number],
      });
    },
    [updateConfig],
  );

  const handleSliderChange = useCallback(
    (_ev: Event, newValue: number | number[], activeThumb: number) => {
      if (!Array.isArray(newValue)) {
        return;
      }

      if (newValue[1] - newValue[0] < minDistance) {
        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], max - minDistance);
          handleChange([clamped, clamped + minDistance]);
        } else {
          const clamped = Math.max(newValue[1], minDistance);
          handleChange([clamped - minDistance, clamped]);
        }
      } else {
        handleChange(newValue as number[]);
      }
    },
    [handleChange],
  );

  return (
    <Slider
      value={config.defaultNumberRange}
      onChange={handleSliderChange}
      min={min}
      max={max}
      step={1}
      valueLabelDisplay="on"
      valueLabelFormat={(value) => value.toString()}
    />
  );
};
