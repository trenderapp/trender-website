import React from "react";
import Svg from "../../../Svg/Svg";

import Text from "../../../Text/Text";

function PostPreview({ setWritePost, post }) {


    return (
        <div className="real-post-content">
            <div className="row real-post-header">
                <h2>Prévisualiser :</h2>
                <button className="svg-link" onClick={() => setWritePost(false)}><Svg name="circle-close" size={22} /></button>
            </div>
            <div>
                <Text text={post.description} />    
            </div>
        </div>
    );
}

export default PostPreview;