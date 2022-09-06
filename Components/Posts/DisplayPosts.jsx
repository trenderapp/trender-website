import React from "react";
import TrackVisibility from 'react-on-screen';
import PostNormal from "./Views/PostNormal";
import PostImage from "./Views/PostImage";
import PostVideo from "./Views/PostVideo";
import PostAudio from "./Views/PostAudio";
import { SinglePostContextProvider } from "./PostContext";
import styles from "./Posts.module.scss";
import Svg from "../Svg/Svg";
import { useTranslation } from "../../Context/Localization";

function DisplayPosts({ informations, pined }) {
    
    const { t } = useTranslation();
    
    return (
        <SinglePostContextProvider informations={informations}>        
            <div className={styles.post_box}>
                { pined && <div className={styles.pined} ><Svg name="pin" noColor size={12} /> <span>{t("pined")}</span></div> }
                {
                    !informations?.type || informations.type === 0 ? 
                    <PostNormal /> 
                    : informations.type === 1 ? 
                        <PostImage />
                        : informations.type === 2 ?
                            <PostVideo />
                            : informations.type === 3 ?
                                <PostAudio />
                                : <PostNormal />
                }
            </div>
        </SinglePostContextProvider>
    )
}

export default DisplayPosts;