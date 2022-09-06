import React, { useState } from "react";
import Loader from "../../Components/Others/Loader";

function CommentModal() {
    const [comments, setComments] = useState({
        limit: 0,
        skip: 0,
        list: [] 
    });
    return (
        <div className="comment-modal">
            <div className="create-comment">
                <input placeholder="Créer un commentaire" />
            </div>
            <div className="comment-list">
                {
                    comments.list.length > 0 ? "" : <Loader />
                }
            </div>   
        </div>    
    )
}

export default CommentModal;