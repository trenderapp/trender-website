import React from "react";
import Icon from "../../../Components/Assets/RoundedIcon";
import Loader from "../../../Components/Others/Loader";
import styles from "../../../Style/All.module.scss"

import { cdnbaseurl } from "../../../Services/constante";

function FakeChatBox(){
    return (
        <div className="chatbox fake">
            <div className="chatbox-nav">
                <div className="trender-nav-droite">
                    <Icon size={33} className={styles.not_mobile} src={`${cdnbaseurl}/assets/icons/circles/trender_255.png`} />
                    <p>Trender</p>
                </div>
            </div>
            <div className="chat-section">
                <Loader />
            </div>
        </div>
    )
}

export default FakeChatBox;