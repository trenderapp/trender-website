import React, { useContext } from "react";

import PostBottom from "./Components/PostBottom";
import PostHeader from "./Components/PostHeader";
import VideoPlayer from "./Components/Videos/VideoPlayer";
import Text from "../../Text/Text";

import { SinglePostContext } from "../PostContext";
import { useClient } from "../../../Context";

function PostVideo() {

    const { info } = useContext(SinglePostContext)
    const { client } = useClient();

    return (
        <>
            <PostHeader info={info} />
            <Text info={info} text={info.content} />
            <VideoPlayer tracks={`${client.post.file(info.from.user_id, info.post_id, info.attachments[0]?.name)}`} />
            <PostBottom info={info} />
        </>
    );
}

export default PostVideo;