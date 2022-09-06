import React, { useState } from "react";
import FalsePost from "./FalsePost";
import CreatePost from "./CreatePost";
import PostsContextProvider from "../../../Context/PostsContext";

function CreationIndex() {

    const [ writePost, setWritePost ] = useState(false);
    const [postInfo, modifyPostInfo] = useState({
        description: "",
        attachments: []
    });

    return (
        <div className="create-post">
        <PostsContextProvider value={[postInfo, modifyPostInfo]}>
            { writePost && user?.token ? <CreatePost user={user} setWritePost={setWritePost} /> : <FalsePost setWritePost={setWritePost} /> }               
        </PostsContextProvider>
        </div>
    )
}

export default CreationIndex;