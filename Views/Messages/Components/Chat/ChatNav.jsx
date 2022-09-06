import React from "react";
import Link from "next/link";

import { userPath } from "../../../../Services/constante";
import Svg from "../../../../Components/Svg/Svg";

function ChatNav({ info }) {
    return (
        <div className="chatbox-nav">
            <div className="trender-nav-droite">
                <img src={userPath(info.room_id, info.avatar, "rooms")} className="not-mobile pdp-33" alt={userPath(info.room_id, info.avatar, "rooms")} />
                <Link href="/messages">
                    <a><Svg name="chevron-left" className="not-web" /></a>
                </Link>
                <p>{info.room_name}</p>
            </div>
            <div className="trender-nav-gauche">
                <span><Svg name="circle-info" className="not-web" /></span>
            </div>
        </div>
    )
}

export default ChatNav;