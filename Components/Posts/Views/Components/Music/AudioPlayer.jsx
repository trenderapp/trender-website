import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls";
import dayjs from "dayjs";
import use_duration from "dayjs/plugin/duration"

import Svg from "../../../../../Components/Svg/Svg";

const AudioPlayer = ({ tracks }) => {
  // State

  dayjs.extend(use_duration);

  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);


  // Destructure for conciseness
  var { audioSrc } = tracks;

  // Refs
  if(typeof window != "undefined") {
    var audio = new Audio(tracks)
  }
  var audioRef = useRef(audio);
  
  var intervalRef = useRef();
  var isReady = useRef(false);

  if (typeof window != "undefined") {

    // Destructure for conciseness
    var { duration, volume } = audioRef.current;

    /*const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";*/

    var startTimer = () => {
      // Clear any timers already running
      clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        if (audioRef.current.ended) {
          return;
        } else {
          setTrackProgress(audioRef.current.currentTime);
        }
      }, [1000]);
    };

    var onScrub = (value) => {
      // Clear any timers already running
      clearInterval(intervalRef.current);
      audioRef.current.currentTime = value;
      setTrackProgress(audioRef.current.currentTime);
    };

    var onScrubEnd = () => {
      // If not already playing, start
      if (!isPlaying) {
        setIsPlaying(true);
      }
      startTimer();
    };
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks

  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
    // eslint-disable-next-line
  }, []);

  const changeVolume = (e) => {
    audioRef.current.volume = e/10000;
  }

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="audio-player">
      <div className="track-info">
        <AudioControls isPlaying={isPlaying} onPlayPauseClick={setIsPlaying} />
        <div className="range__slider">
        <div className="audio_control">
          <span>{dayjs.duration(trackProgress ?? 0, 'seconds').format("mm:ss")} / {dayjs.duration(duration > 0.1 ? duration : 0.1, 'seconds').format("mm:ss")}</span>
          <div className="volume">
            { volume > 0 ? <Svg name="sound" onClick={() => audioRef.current.volume = 0} size={22} /> : <Svg name="sound-mute" onClick={() => audioRef.current.volume = 1} size={22} /> }
            <input type="range" min="0" max="10000" value={volume*10000} step="1" onChange={(e) => changeVolume(e.target.value)} />
          </div>
        </div>
        <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration ? duration : `${duration}`}
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onKeyUp={onScrubEnd}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
