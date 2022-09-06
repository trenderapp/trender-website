import React, { useContext, useState } from "react";
import axios from "axios";

import { apibaseurl } from "../../../../Services/constante";
import { PostsContext } from "../../../../Context/PostsContext";
import Svg from "../../../Svg/Svg";
import { AlertContext } from "../../../../Context/AlertContext";
import VideoPlayer from "../../Views/Components/Videos/VideoPlayer";
import ImagePlayer from "../../Views/Components/Images/ImagePlayer";

function PostCreator({ user, setWritePost }) {


    const { setAlert } = useContext(AlertContext);

    const [postInfo, modifyPostInfo] = useContext(PostsContext);
    const [sending, setSending] = useState({
        send: false,
        progress: 0
    })

    const sendPost = async () => {

        if(sending.send) return;
        
        var size = 0;
        if(postInfo.attachments) {
            postInfo.attachments.forEach((f) => {
                size += f.size
            })
        }
        if(size > 49000000) return setAlert({ display: true, type: "error", message: "La taille total ne doit pas excéder 50Mo" });
        if(postInfo.description.trim().length < 1 || postInfo.description.trim().length > 1000) return setAlert({ display: true, type: "error", message: "Envoyer entre 1 et 1000 caractères dans la description" });

        if(typeof window !== "undefined") {
            var formdata = new FormData();

            postInfo.attachments.forEach(a => {
                formdata.append("attachments", a);
            })
            formdata.append('description', postInfo.description)

            var config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'trendertokenapi': `${user ? user.token : null}`,
                },
                onUploadProgress: function(progressEvent) {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total );
                    setSending({ send: true, progress: percentCompleted })
                }
            };

            setSending({ ...sending, send: true })
            axios.post(`${apibaseurl}/posts`, formdata, config)
                .then(request => {
                    if(!request.status) return setAlert({ display: true, type: "error", message: "[59] Une erreur est survenu :(" });
                    if(request.status !== 201) return setAlert({ display: true, type: "error", message: "[60] Une erreur est survenu :(" });
                    
                    modifyPostInfo({ description: "" });
                    setAlert({ display: true, type: "success", message: "Post bien envoyé" });
                })
                .catch(() => {
                    setAlert({ display: true, type: "error", message: "[66] Une erreur est survenu :(" });
                    setSending({ ...sending, send: false, progress: 0 })
                })
        }
    }

    const modifyPost = async (e) => {
        e.preventDefault();
        modifyPostInfo({ ...postInfo, [e.target.name]: e.target.value });
    }

    const addFiles = async (e) => {
        const files = e.target.files;
        const file_type = e.target.files[0]?.type.split("/")[0];
        if(postInfo.attachments.length > 0 && postInfo.attachments[0].type.split("/")[0] !== file_type) return setAlert({ display: true, type: "error", message: "Mauvais type de fichier" });
        const arr = postInfo.attachments.concat([...files]);
        const new_names = arr.map(f => {           
            return {
                type: f.type.split("/")[0],
                url: URL.createObjectURL(f)
            }
        })

        const length = arr.length;

        if(file_type === "video" || file_type === "audio" && length < 2) {
            if(length > 1) return setAlert({ display: true, type: "error", message: "Choisir jusque 8 images, 1 audio ou 1 vidéo" });   
            modifyPostInfo({ ...postInfo, attachments: arr, files: new_names  })
        }else if(file_type === "image"){
            if(length > 8) return setAlert({ display: true, type: "error", message: "Choisir jusque 8 images, 1 audio ou 1 vidéo" });
            modifyPostInfo({ ...postInfo, attachments:  arr, files: new_names })
        }else {
            return setAlert({ display: true, type: "error", message: "Choisir jusque 8 images, 1 audio ou 1 vidéo" });
        }
    }

    const DeleteItem = (e) => {
        e.preventDefault();
        modifyPostInfo({ ...postInfo, attachments: [] , files: [] })
    }

    return (
        <div className="real-post-content">
            {sending.send &&
                <div className="progress-container">
                    <div className="progress" style={{ width: `${sending.progress}%` }} />
                </div>
            }
            <div className="row real-post-header">
                <h2>Créer un post :</h2>
                <button className="svg-link" onClick={() => setWritePost(false)}><Svg name="circle-close" size={28} /></button>
            </div>
            <div>
                <textarea name="description" value={postInfo.description} onChange={modifyPost}/>
                {
                    postInfo.files?.length > 0 ?         
                        postInfo.files[0].type === "image" ? 
                            <div className="post-content-image"><ImagePlayer postInfo={postInfo} deleteOnClick={modifyPostInfo} pictures={postInfo.files} /></div>
                        : postInfo.files.map((e, index) => 
                            e.type === "video" ? <div key={index} className="post-content-video"><VideoPlayer postInfo={postInfo} deleteOnClick={modifyPostInfo} tracks={e.url} /></div>
                            : e.type === "audio" ? <div key={index} className="post-content-audio"><div className="create-post-audio"><Svg name="circle-close" size={24} className="close fa-primary" onClick={DeleteItem} /><audio controls src={e.url}></audio></div></div> 
                            : <span>{e.url}</span>
                        )
                    
                        : ""
                }
            </div>
            <div className="row real-post-bottom-div">
                <div className="real-post-bottom">
                    <button className="svg-link" onClick={() => document.getElementById("files").click()}><Svg name="all-media" size={22} /><input onChange={(e) => addFiles(e)} accept="image/jpeg, image/png, image/webp, image/gif, video/mp4, video/quicktime, video/webm, audio/mp3, audio/wav" id="files" type="file" multiple /></button>
                </div>
                <div className="row real-post-bottom">
                    <span className={postInfo.description.length < 500 ? "green" : postInfo.description.length < 800 ? "yellow" : "red"}>{postInfo.description.length}/1000</span>
                    <button className="svg-link" onClick={() => sendPost()}><Svg name="paper-plane" size={22} /></button>
                </div>
            </div>
        </div>
    );
}

export default PostCreator;