import React, { useState, useEffect } from "react";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import "./App.css";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const loadingDuration = 3000; // 3 seconds

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (progress >= 100) return;
      setProgress((prevProgress) => prevProgress + 1);
    }, loadingDuration / 100);

    if (progress === 100) {
      setLoading(false);
    }

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [progress, loading]);

  useEffect(() => {
    document.title = "SVG Pi implemented in React";
  }, []);

  return (
    <div className="app-container">
      {loading ? (
        <ProgressBar
          progress={progress}
          trackWidth={5}
          indicatorWidth={4}
          indicatorColor="#1abc9c"
        />
      ) : (
        <div className="app-content">
          <p>
            This content appears when <strong>SVG Pi</strong> reaches 100%. Reload to see it in
            action again.
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
