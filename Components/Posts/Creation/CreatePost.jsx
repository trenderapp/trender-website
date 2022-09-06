import React, { useContext, useState } from "react";
import styles from "../../../Style/All.module.scss";
import CreatePostStyle from "./CreatePost.module.scss";
import Button from "../../Buttons/Button";
import TextAreaInput from "../../Inputs/Textarea";
import Svg from "../../Svg/Svg";
import { AlertContext } from "../../../Context/AlertContext";
import ImagePlayer from "../Views/Components/Images/ImagePlayer";
import VideoPlayer from "../Views/Components/Videos/VideoPlayer";
import ProgressBar from "../../Others/ProgressBar";
import client, { axiosInstance } from "../../../Services/client";
import { useTranslation } from "../../../Context/Localization";

function CreatePost() {

    const { t } = useTranslation();
    const [sending, setSending] = useState({
        send: false,
        progress: 0
    })
    const { setAlert } = useContext(AlertContext);
    const [postInfo, setPost] = useState({
        description: ""
    })
    const [{ files, attachments }, setFiles] = useState({
        files: [],
        attachments: []
    })
    
    const sendInfo = async () => {
        if(!postInfo.description || postInfo.description.length > 500) return;
        if(sending.send) return setAlert({ display: true, type: "error", message: `${t(`sending_form`)}`});

        let data = { ...postInfo };
        
        if(attachments.length > 0) {
            if(typeof window !== "undefined") {
                var formdata = new FormData();

                attachments.forEach(a => formdata.append("posts", a))
        
                var config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                    onUploadProgress: function(progressEvent) {
                        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setSending({ send: true, progress: percentCompleted })
                    },
                    validateStatus: s => s < 501
                };
    
                const request = await axiosInstance.post("/upload?type=posts", formdata, config);
                const req_data = request.data;
                if(!req_data.data) {
                    setSending({ send: false, progress: 0 })
                    return setAlert({ display: true, type: "error", message: `[${req_data.error.code}] ${t(`${req_data.error.code}`)}` })
                }
                data = { ...data, ...req_data.data }
            }

        }

        const response = await client.post.create(data);

        if(!response.data) {
            setSending({ send: false, progress: 0 })
            return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}` })
        }

        setSending({ send: 0, progress: 0 })
        setAlert({ display: true, type: "success", message: t("success") });
    }

    const addFiles = async (e) => {
        if(typeof URL !== "undefined") {
            const _files = e.target.files;
            const file_type = e.target.files[0]?.type.split("/")[0];
            if(attachments.length > 0 && attachments[0].type.split("/")[0] !== file_type) return setAlert({ display: true, type: "error", message: t("6") });
            const arr = attachments.concat([..._files]);
            const new_names = arr.map(f => {           
                return {
                    type: f.type.split("/")[0],
                    url: URL.createObjectURL(f)
                }
            })
            
            const length = arr.length;

            if(file_type === "video" || file_type === "audio") {
                if(length > 1) return setAlert({ display: true, type: "error", message: t("bad_file") });   
                setFiles({ attachments: arr, files: new_names  })
            }else if(file_type === "image"){
                if(length > 8) return setAlert({ display: true, type: "error", message: t("bad_file") });
                setFiles({ attachments: arr, files: new_names })
            }else {
                return setAlert({ display: true, type: "error", message: t("bad_file") });
            }
        }
    }

    return (
        <div className={CreatePostStyle.create_post}>
            <TextAreaInput placeholder={t("create_story")} onChange={(e) => setPost({ ...postInfo, description: e.target.value })} max_length={500} label={t("create_post")} />
            { sending.progress > 0 && <ProgressBar progress={sending.progress} /> }
            <div style={{
                marginTop: "5px"
            }}>
            {
                files?.length > 0 ?         
                    files[0].type === "image" ? 
                        <div className={styles.full_container}><ImagePlayer attachments={attachments} deleteOnClick={setFiles} pictures={files} /></div>
                        : files.map((e, index) => 
                            e.type === "video" ? <div key={index} className={styles.full_container}><VideoPlayer deleteOnClick={setFiles} tracks={e.url} /></div>
                            : e.type === "audio" ? <div key={index} ><div className={CreatePostStyle.create_post_audio}><Svg name="circle-close" size={24} className={styles.svg_close} onClick={() => setFiles({ attachments: [], files: [] })} /><audio controls src={e.url}></audio></div></div> 
                            : <span>{e.url}</span>
                        ) : ""
             }
            </div>
            <div className={`${styles.row} ${styles.space_between} ${styles.bottom}`}>
                <div>
                    <Svg onClick={() => document.getElementById("files").click()} pointer hover name="all-media" size={24} margin />
                    <input style={{ display: "none" }} onChange={(e) => addFiles(e)} accept="image/jpeg, image/png, image/webp, image/gif, video/mp4, video/quicktime, video/webm" id="files" type="file" multiple />
                </div>
                <Button disabled={!postInfo.description.length > 0 || postInfo.description.length > 500} onClick={() => sendInfo()} label={t("publish")} />
            </div>
        </div>
    )
}

export default CreatePost;