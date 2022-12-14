import React, { useContext } from "react";

import PostHeader from "./Components/PostHeader";
import PostBottom from "./Components/PostBottom";
import Text from "../../Text/Text";
import { SinglePostContext } from "../PostContext";
import { ImageCarroussel } from "../../Assets";

function PostImage() {

    const { info } = useContext(SinglePostContext)

    return (
        <>
            <PostHeader info={info} />
            <Text info={info} text={info.content} />
            <ImageCarroussel user_id={info.from.user_id} post_id={info.post_id} pictures={info.attachments} />
            { /*<ImagePlayer user_id={info.from.user_id} post_id={info.post_id} pictures={info.attachments} />*/ }
            <PostBottom info={info} />
        </>
    );
}

export default PostImage;