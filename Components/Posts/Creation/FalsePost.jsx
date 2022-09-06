import React from "react";

function FalsePost({ setWritePost }) {

    return (
        <div onClick={() => setWritePost(true)} className="false-post">
            <span>Créer un post :</span>
            <input placeholder="Commence ton histoire" disabled />
        </div>
    );
}

export default FalsePost;