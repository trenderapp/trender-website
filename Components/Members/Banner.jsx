import React from "react";
import Image from "next/image";
import { isMobile } from 'react-device-detect';

import stylesMember from "./Members.module.scss"
import styles from "../../Style/All.module.scss"
import client from "../../Services/client";
import { cdnbaseurl } from "../../Services/constante";

function Banner({ user_id, custom, banner, accent_color, onClick = undefined, pointer = undefined }) {

    console.log(custom, banner, accent_color);
    return banner ? 
        <Image onClick={onClick} 
            className={`${styles.background} ${pointer ? styles.pointer : ""}`} 
            draggable="false" 
            unoptimized 
            placeholder="blur" 
            blurDataURL={`${cdnbaseurl}/assets/backgrounds/placeholder_eric.png`} 
            priority 
            quality={100} 
            width="100%" 
            height={`${isMobile ? 100 : 200}px`} 
            src={custom ? banner : client.user.banner(user_id, banner)} 
            alt="User Banner" 
            objectFit="cover" />

        : <div 
            className={stylesMember.banner}
            style={{
                height: `${isMobile ? 100 : 200}px`,
                backgroundColor: accent_color
            }}
        />

}

export default Banner;