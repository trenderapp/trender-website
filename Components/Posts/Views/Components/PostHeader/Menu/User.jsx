import React, { useContext } from "react";
import FixedMenu from "../../../../../Others/FixedMenu";
import Svg from "../../../../../Svg/Svg";
import styles from "../../../../../../Style/All.module.scss";
import { SinglePostContext } from "../../../../PostContext";
import client from "../../../../../../Services/client";
import { AlertContext } from "../../../../../../Context/AlertContext";
import { useTranslation } from "../../../../../../Context/Localization";


function User({ setShowModal }) {
    
    const { t } = useTranslation();
    
    const { info } = useContext(SinglePostContext);
    const { setAlert } = useContext(AlertContext);

    const unfollow = async () => {
        const response = await client.user.follow.delete(info.from.user_id);
        if(response.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}` });
        setAlert({ display: true, type: "success", message: `${t(`success`)}` });
    }

    const block = async () => {
        const response = await client.user.block.create(info.from.user_id);
        if(response.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}` });
        setAlert({ display: true, type: "success", message: t("success") });
    }

    const report = async () => {
        const response = await client.post.report(info.post_id, 1);
        if(response.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}` });
        setAlert({ display: true, type: "success", message: t("success") });
    }

    return (
        <FixedMenu oustideClick={setShowModal}>
            <span onClick={() => report()} className={`${styles.row} ${styles.justify_center} ${styles.full_width} ${styles.padding_10} ${styles.border_bottom} ${styles.pointer} ${styles.hover}`}><Svg name="shield" size={22} /> Signaler</span>
            <span onClick={() => unfollow()} className={`${styles.row} ${styles.justify_center} ${styles.full_width} ${styles.padding_10} ${styles.border_bottom} ${styles.pointer} ${styles.hover}`}><Svg name="unfollow-user" size={22} /> Ne plus suivre</span>
            <span onClick={() => block()} className={`${styles.row} ${styles.justify_center} ${styles.full_width} ${styles.padding_10} ${styles.border_bottom} ${styles.pointer} ${styles.hover}`}><Svg name="ban" size={22} /> Bloquer</span>
            <span onClick={() => setShowModal(false)} className={`${styles.row} ${styles.justify_center} ${styles.full_width} ${styles.padding_10} ${styles.pointer} ${styles.hover}`}>{t("cancel")}</span>
        </FixedMenu>
    )
}

export default User;