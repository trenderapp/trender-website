import React, { useState } from "react";
import { isMobile } from "react-device-detect";

import styles from "../../../../../Style/All.module.scss";
import CreateLink from "../../../../Text/Link";
import MemberInformations from "../../../../Members/Informations";
import Svg from "../../../../Svg/Svg";
import Owner from "./Menu/Owner";
import User from "./Menu/User";
import { useClient } from "../../../../../Context";

function PostHeader({ chat, info }){

    const [showModal, setShowModal] = useState(false);
    const { user, token } = useClient()

    return (
        <div className={`${styles.row} ${styles.space_between} ${styles.full_width}`}>
            <CreateLink noHover href={`/${info.from.nickname}`}>
                <MemberInformations full_width={isMobile} date={chat ? info.from.created_at : info.created_at} info={info.from} />
            </CreateLink>
            <div>
                { token && <Svg onClick={() => setShowModal(!showModal)} className={`${styles.pointer} ${styles.hover}`} name="ellipsis" size={22} /> }
                { showModal && info.from.user_id === user?.user_id && <Owner pined={info.from.pined_post} post_id={info.post_id} setShowModal={() => setShowModal(!showModal)} /> }
                { showModal && info.from.user_id !== user?.user_id && <User post_id={info.post_id} setShowModal={() => setShowModal(!showModal)} /> }
            </div>
        </div>
    )
}

export default PostHeader;