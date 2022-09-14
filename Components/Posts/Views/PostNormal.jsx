import React, { useContext } from "react";
import Text from "../../Text/Text";

import PostBottom from "./Components/PostBottom";
import PostHeader from "./Components/PostHeader";
import { SinglePostContext } from "../PostContext";

function PostNormal() {

    const { info } = useContext(SinglePostContext)
    
    return (
        <>
            <PostHeader info={info}/>
            <Text info={info} embeds={info?.embeds} text={info.content} />
            <PostBottom info={info} />
        </>
    );
}

export default PostNormal;