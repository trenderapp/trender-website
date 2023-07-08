import React, { useState } from "react";
import dayjs from "dayjs";

import { cdnbaseurl } from "../../Services/constante";
import Seo from "../Seo";
import CreateLink from "../../Components/Text/Link";
import { AnimatedIconBox, AnimatedTwoDivBox } from "../../Components/Animations";
import { detect } from "detect-browser";
import { useTranslation } from "../../Context/Localization";
import { ChangeLanguages } from "../../Components/Menu";
import { NavbarDiv } from "../../Components/Navbar";
import { useEffect } from "react";


function Presentation() {

    const { t } = useTranslation("presentation");
    const [plateform, setPlateform] = useState(null);

    useEffect(() => {
        
        if(typeof navigator !== "undefined" && typeof window !== "undefined") {
            const browser = detect();

            if (browser) {
                const { os } = browser;
                
                if(os === "Android OS" || os === "android") {
                    setPlateform("https://play.google.com/store/apps/details?id=com.trenderapp.social")
                } else if(os === "iOS") {
                    setPlateform("https://apps.apple.com/app/trender-social-network/id6443865410")
                }
            }
        }
    }, [])

    return (
        <div className="presentation">
            <Seo />
            <header>
                <CreateLink noHover href="/" >
                    <img src={`${cdnbaseurl}/assets/logos/white.png`} alt="app-logo" />
                </CreateLink>
                <NavbarDiv>
                    <ChangeLanguages size={32} />
                    {  plateform && (
                        <div className="connect">
                            <CreateLink noHover text={t("download")} href={plateform} /> 
                        </div>
                        ) 
                    }
                </NavbarDiv>
            </header>
            <AnimatedTwoDivBox 
                title_1={"Trender, Create the Next Trend and Become a Recognized Creator"} 
                text_1={"Trender is a free social network designed to help creators become recognized. You can easily create the next big trend and join a community of like-minded creators."} 
                text_2={
                    <>
                        <AnimatedIconBox link={"https://play.google.com/store/apps/details?id=com.trenderapp.social"} text="Android" icon={"play-store"} />
                        <AnimatedIconBox link={"https://apps.apple.com/app/trender-social-network/id6443865410"} text="IOS" icon={"apple-icon"} />
                    </>
               }
                />
            {
                /*
            <AnimatedBoxImage reverse title={t("create_your_own_trender_title")} text={t("create_your_own_trender_description")} image={{
                src: `${cdnbaseurl}/assets/backgrounds/placeholder_eric.png`,
                alt: "juste un truc qui doit etre la"
            }} />
            <AnimatedBoxImage title={t("connect_to_the_blockchain_title")} text={t("connect_to_the_blockchain_description")} image={{
                src: `${cdnbaseurl}/assets/backgrounds/placeholder_eric.png`,
                alt: "juste un truc qui doit etre la"
            }} />
            <AnimatedBoxImage reverse title={t("use_it_everywhere_title")} text={t("use_it_everywhere_description")} image={{
                src: `${cdnbaseurl}/assets/backgrounds/placeholder_eric.png`,
                alt: "juste un truc qui doit etre la"
            }} />*/
            }

            <footer>
                <div className="left">
                    <h3>Application</h3> 
                    <AnimatedIconBox link={"https://play.google.com/store/apps/details?id=com.trenderapp.social"} text="Android" icon={"play-store"} />
                    <AnimatedIconBox link={"https://apps.apple.com/app/trender-social-network/id6443865410"} text="IOS" icon={"apple-icon"} />
                </div>
                <div className="middle">
                    <h3>Informations</h3>
                    <CreateLink text="Contact" href="mailto:support@trenderapp.com" />
                    <CreateLink text="API" href="https://doc.trenderapp.com" />
                    <span>© {dayjs().year()} Trender</span>
                </div>
                <div className="right">
                    <h3>Legals</h3>
                    <CreateLink text="Terms of Sales" href="https://cdn.trenderapp.com/assets/legal/TOS.pdf" />
                    <CreateLink text="Terms of Services" href="https://cdn.trenderapp.com/assets/legal/T&S.pdf" />
                    <CreateLink text="Legal Mentions" href="https://cdn.trenderapp.com/assets/legal/T&S.pdf" />
                </div>
            </footer>
        </div>
    )
}

export default Presentation;