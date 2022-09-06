import React, { useContext } from "react";
import styles from "../../../../../Style/All.module.scss"

import { posturl } from "../../../../../Services/constante";
import Svg from "../../../../Svg/Svg";
import { AlertContext } from "../../../../../Context/AlertContext";
import LikeButton from "./LikeButton";

function PostBottom({ info }){

    const { setAlert } = useContext(AlertContext);
    const copyToClipboard = async () => {
        if(typeof navigator !== "undefined") {
            await navigator.clipboard.writeText(`${posturl}/${info.post_id}`)
            setAlert({ display: true, type: "success", message: "Copié dans le Presse-papiers" })
        } 
    }

    const displayPost = () => {
        if(typeof window !== "undefined") {
            const newURL = `/trends/${info.post_id}`
            window.history.replaceState({ ...window.history.state, as: newURL, url: newURL }, '', newURL)
        }
    }
    
    return (
        <div className={`${styles.row} ${styles.space_evenly}`} style={{ marginTop: 15 }}>
            <button onClick={() => displayPost()} className={`${styles.row} svg-link`}>
                <Svg margin name="comment" size={22} />
                <span>{info?.comments?.total ?? 0}</span>
            </button>
            <button className={`${styles.row} svg-link`}>
                <LikeButton />
                <span>{info?.likes?.total ?? 0}</span>
            </button>
            <button onClick={() => copyToClipboard()} className={`${styles.row} svg-link`}>
                <Svg margin name="share" size={22} />
            </button>
        </div>
    )
}

export default PostBottom;