import React from "react";
import Image from "next/image";
import { isMobile } from 'react-device-detect';

import styles from "../../Style/All.module.scss"
import { SimpleColor } from "../../Services/Canvas";
import client from "../../Services/client";

function Avatar({ user_id, custom, avatar, disconnected = null, size = 33, onClick = undefined, pointer = undefined, border, error }) {
    return <Image onClick={onClick} className={`${styles.rounded} ${pointer && styles.pointer} ${border && styles.border_color_primary}`} draggable="false" width={`${isMobile && size > 33 ? 50 : size}px`} height={`${isMobile && size > 33 ? 50 : size}px`} src={disconnected || error ? SimpleColor() : custom ? avatar : client.user.avatar(user_id, avatar)} alt="User Avatar" objectFit="cover" />

}

export default Avatar;