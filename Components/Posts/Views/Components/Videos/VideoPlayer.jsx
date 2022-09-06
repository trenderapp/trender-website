import React from "react";
import Svg from "../../../../Svg/Svg";
import VideoStyle from "./Video.module.scss";

const VideoPlayer = ({ tracks, deleteOnClick }) => {

  const DeleteItem = (e) => {
    e.preventDefault();
    deleteOnClick({ attachments: [] , files: [] })
  }
  
  return (
    <div className={VideoStyle.video_player}>
        <div className={VideoStyle.video_container}>
            { deleteOnClick && <Svg name="circle-close" size={24} onClick={DeleteItem} className={VideoStyle.close} /> }
            <video controls src={tracks}></video>
        </div>
    </div>
  );
};

export default VideoPlayer;
