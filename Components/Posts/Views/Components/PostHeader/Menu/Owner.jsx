import React, { useContext } from "react";
import FixedMenu from "../../../../../Others/FixedMenu";
import Svg from "../../../../../Svg/Svg";
import styles from "../../../../../../Style/All.module.scss";
import { AlertContext } from "../../../../../../Context/AlertContext";
import client from "../../../../../../Services/client";
import { PostsListContext } from "../../../../../../Context/PostsContext";
import { deletePosts } from "../../../../../../Context/Reducer/Posts";
import { useTranslation } from "../../../../../../Context/Localization";

function Owner({ post_id, pined, setShowModal }) {

    const { t } = useTranslation();
    const { setAlert } = useContext(AlertContext);
    const { dispatch } = useContext(PostsListContext);

    const deletePost = async () => {
        const response = await client.post.delete(post_id);
        if(response.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}` });
        dispatch(deletePosts(post_id))
        setAlert({ display: true, type: "success", message: `${t(`success`)}` });
    }

    const pinPost = async () => {
        const response = await client.post.pin(post_id);
        if(response.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}` });
        setAlert({ display: true, type: "success", message: `${t(`success`)}` });
    }

    const unPinPost = async () => {
        const response = await client.post.unPin(post_id);
        if(response.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}` });
        setAlert({ display: true, type: "success", message: `${t(`success`)}` });
    }

    return (
        <FixedMenu oustideClick={setShowModal}>
            <span onClick={() => deletePost()} className={`${styles.red} ${styles.row} ${styles.justify_center} ${styles.full_width} ${styles.padding_10} ${styles.border_bottom} ${styles.pointer} ${styles.hover}`}><Svg className={styles.red} name="delete" size={22} /> {t("delete")}</span>
            { pined && pined === post_id && <span onClick={() => unPinPost()} className={`${styles.row} ${styles.justify_center} ${styles.full_width} ${styles.padding_10} ${styles.border_bottom} ${styles.pointer} ${styles.hover}`}><Svg name="pin" size={22} /> {t("unpin")}</span> }
            { !pined || pined !== post_id ? <span onClick={() => pinPost()} className={`${styles.row} ${styles.justify_center} ${styles.full_width} ${styles.padding_10} ${styles.border_bottom} ${styles.pointer} ${styles.hover}`}><Svg name="pin" size={22} /> {t("pin")}</span> : null }
            <span onClick={setShowModal} className={`${styles.row} ${styles.justify_center} ${styles.full_width} ${styles.padding_10} ${styles.pointer} ${styles.hover}`}>{t("cancel")}</span>
        </FixedMenu>
    )
}

export default Owner;