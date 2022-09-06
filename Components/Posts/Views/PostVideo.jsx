import React, { useContext } from "react";

import PostBottom from "./Components/PostBottom";
import PostHeader from "./Components/PostHeader";
import VideoPlayer from "./Components/Videos/VideoPlayer";
import Text from "../../Text/Text";

import client from "../../../Services/client";
import { SinglePostContext } from "../PostContext";

function PostVideo() {

    const { info } = useContext(SinglePostContext)

    return (
        <>
            <PostHeader info={info} />
            <Text text={info.description} />
            <VideoPlayer tracks={`${client.post.file(info.from.user_id, info.post_id, info.attachments[0]?.name)}`} />
            <PostBottom info={info} />
        </>
    );
}

export default PostVideo;