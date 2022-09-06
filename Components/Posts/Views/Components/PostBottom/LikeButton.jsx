import React from "react";
import { useContext } from "react";
import Svg from "../../../../Svg/Svg";
import { SinglePostContext } from "../../../PostContext";
import { AlertContext } from "../../../../../Context/AlertContext";
import client from "../../../../../Services/client";
import { useTranslation } from "../../../../../Context/Localization";
// import styles from "./PostBottom.module.scss";

function LikeButton() {

    const { t } = useTranslation();
    const { info, setInfo } = useContext(SinglePostContext)
    const { setAlert } = useContext(AlertContext);

    const createLike = async () => {
        const response = await client.post.like(info.post_id);
        if(response.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}` });
        setInfo({ ...info, likes: { total: info?.likes?.total > 0 ? info?.likes?.total + 1 : 1 }, liked: true})
    }

    const deleteLike = async () => {
        const response = await client.post.unlike(info.post_id);
        if(response.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}` });
        setInfo({ ...info, likes: { total: info?.likes?.total > 0 ? info?.likes?.total - 1 : 0 }, liked: undefined})
    }
    
    return <Svg onClick={() => info?.liked ? deleteLike() : createLike()} size={22} margin name={`${info?.liked ? "heart-solid" : "heart"}`} />
    /*return (
        <div className={styles.container}>
            <label class={styles.like}>
                <input type="checkbox"/>
                <div class={styles.hearth}/>
            </label>
        </div>
    )*/
}

export default LikeButton;