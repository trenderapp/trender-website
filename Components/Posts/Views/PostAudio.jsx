import React, { useContext } from "react";

import PostBottom from "./Components/PostBottom";
import PostHeader from "./Components/PostHeader";
import AudioPlayer from "./Components/Music/AudioPlayer"
import Text from "../../Text/Text";
import { SinglePostContext } from "../PostContext";

function PostAudio() {
    
    const { info } = useContext(SinglePostContext)

    return (
        <>
            <PostHeader info={info} />
            <div className="post-content-audio">
                <Text text={info.description} />
                { /** <AudioPlayer tracks={{ audioSrc: `${client.post.file(info.from.user_id, info.post_id, info.attachments[0].name)}` }} audioSrc={`${client.post.file(info.from.user_id, info.post_id, info.attachments[0].name)}`} /> */ }
            </div>
            <PostBottom info={info} />
        </>
    );
}

export default PostAudio;