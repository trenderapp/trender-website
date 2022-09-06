import React from "react";
import Svg from "../../../../../Components/Svg/Svg";

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
}) => (
  
  <div className="audio-controls">
    {isPlaying ? (
      <button type="button" className="svg-link" onClick={() => onPlayPauseClick(false)} aria-label="Pause">
        <Svg name="pause" size={33} />
      </button>
    ) : (
      <button type="button" className="svg-link" onClick={() => onPlayPauseClick(true)} aria-label="Play">
        <Svg name="play" size={33} />
      </button>
    )}
  </div>
);

export default AudioControls;