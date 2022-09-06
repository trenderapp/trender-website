import React from "react";
import PostNormal from "../Views/PostNormal";
import PostImage from "../Views/PostImage";
import PostVideo from "../Views/PostVideo";
import PostAudio from "../Views/PostAudio";

function DisplayPosts({ posts }) {
    return (
        <div>
            {             
                posts.map((p, index) => 
                    p.type === "normal" ?
                    <PostNormal key={index} index={index} info={p} /> 
                    : p.type === "image" ? 
                        <PostImage key={index} index={index} info={p} />
                        : p.type === "video" ?
                            <PostVideo key={index} index={index} info={p} />   
                            : p.type === "audio" ?
                                <PostAudio key={index} index={index} info={p} /> 
                                : ""
                )
            }
        </div>
    )
}

export default DisplayPosts;