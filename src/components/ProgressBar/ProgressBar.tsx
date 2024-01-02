import { FC } from "react";
import "./ProgressBar.css";

interface ProgressBarProps {
  size?: number;
  progress?: number;
  trackWidth?: number;
  trackColor?: string;
  indicatorWidth?: number;
  indicatorColor?: string;
  indicatorCap?: "butt" | "round" | "square";
  label?: string;
  labelColor?: string;
  spinnerMode?: boolean;
  spinnerSpeed?: number;
}

const ProgressBar: FC<ProgressBarProps> = ({
  size = 150,
  progress = 0,
  trackWidth = 10,
  trackColor = "#ddd",
  indicatorWidth = 10,
  indicatorColor = "#07c",
  indicatorCap = "round",
  label = "Loading...",
  labelColor = "#333",
  spinnerMode = false,
  spinnerSpeed = 1,
}) => {
  const center = size / 2;
  const radius = center - Math.max(trackWidth, indicatorWidth);
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray * ((100 - progress) / 100);
  const animationDuration = `${spinnerSpeed * 1000}ms`;

  const hideLabel = size < 100 || !label.length || spinnerMode;
  const indicatorClasses = `svg-pi-indicator ${
    spinnerMode ? "svg-pi-indicator--spinner" : ""
  }`;

  return (
    <div
      className="svg-pi-wrapper"
      style={{ width: size, height: size }}
    >
      <svg
        className="svg-pi"
        style={{ width: size, height: size }}
      >
        <circle
          className="svg-pi-track"
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke={trackColor}
          strokeWidth={trackWidth}
        />
        <circle
          className={indicatorClasses}
          style={{ animationDuration }}
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke={indicatorColor}
          strokeWidth={indicatorWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap={indicatorCap}
        />
      </svg>

      {!hideLabel && (
        <div
          className="svg-pi-label"
          style={{ color: labelColor }}
        >
          <span className="svg-pi-label__loading">{label}</span>
          {!spinnerMode && (
            <span className="svg-pi-label__progress">{`${Math.min(
              progress,
              100
            )}%`}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
