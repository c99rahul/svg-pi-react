import { FC } from "react";
import "./ProgressBar.css";

/**
 * A circular SVG Loading animation component.
 *
 * @component
 * @since 06/07/22
 * @updated 29/12/23
 *
 * @param {Object} props - The properties of the component.
 * @param {number} props.size - The size of the loading animation.
 * @param {number} props.progress - The progress percentage of the loading animation.
 * @param {number} props.trackWidth - The width of the track in the loading animation.
 * @param {string} props.trackColor - The color of the track in the loading animation.
 * @param {number} props.indicatorWidth - The width of the loading indicator.
 * @param {string} props.indicatorColor - The color of the loading indicator.
 * @param {"butt" | "round" | "square"} props.indicatorCap - The style of the loading indicator's end cap.
 * @param {string} props.label - The label text displayed during the loading animation.
 * @param {string} props.labelColor - The color of the label text.
 * @param {boolean} props.spinnerMode - A flag indicating whether the spinner mode is enabled.
 * @param {number} props.spinnerSpeed - The speed of the spinner animation.
 * @returns {JSX.Element} The rendered ProgressBar component.
 */

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
  trackColor = `#ddd`,
  indicatorWidth = 10,
  indicatorColor = `#07c`,
  indicatorCap = `round`,
  label = `Loading...`,
  labelColor = `#333`,
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
          style={{ animationDuration: animationDuration }}
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
