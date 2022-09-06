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
            <Text embeds={info?.embeds} text={info.description} />
            <PostBottom info={info} />
        </>
    );
}

export default PostNormal;