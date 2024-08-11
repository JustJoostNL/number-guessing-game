import { Slider } from "@mui/material";
import { FC, useCallback } from "react";

interface IProps {
  value: number | number[];
  onChange: (value: number | number[]) => void;
  min: number;
  max: number;
  minDistance: number;
}

export const NumberRangeSlider: FC<IProps> = ({
  value,
  onChange,
  min,
  max,
  minDistance,
}) => {
  const handleChange = useCallback(
    (_ev: Event, newValue: number | number[], activeThumb: number) => {
      if (!Array.isArray(newValue)) {
        return;
      }

      if (newValue[1] - newValue[0] < minDistance) {
        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], 100 - minDistance);
          onChange([clamped, clamped + minDistance]);
        } else {
          const clamped = Math.max(newValue[1], minDistance);
          onChange([clamped - minDistance, clamped]);
        }
      } else {
        onChange(newValue as number[]);
      }
    },
    [minDistance, onChange],
  );

  return (
    <Slider
      value={value}
      onChange={handleChange}
      min={min}
      max={max}
      step={1}
      valueLabelDisplay="on"
      valueLabelFormat={(value) => value.toString()}
    />
  );
};
