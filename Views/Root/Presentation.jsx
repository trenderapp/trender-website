import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import { cdnbaseurl } from "../../Services/constante";
import Seo from "../Seo";
import CreateLink from "../../Components/Text/Link";
import { AnimatedBoxImage } from "../../Components/Animations";
import AnimatedTextTitle from "../../Components/Animations/AnimatedTextBox";
import { useTranslation } from "../../Context/Localization";
import { ChangeLanguages } from "../../Components/Menu";
import { NavbarDiv } from "../../Components/Navbar";


function Presentation() {

    const [connect, setConnect] = useState(false);

    useEffect(() => {
        if(JSON.parse(localStorage.getItem("user_info"))) return setConnect(true)
    }, [])

    const { t } = useTranslation("presentation");

    return (
        <div className="presentation">
            <Seo title="Trender | A new place to share" />
            <header>
                <CreateLink noHover href="/" >
                    <img src={`${cdnbaseurl}/assets/logos/white.png`} alt="app-logo" />
                </CreateLink>
                <NavbarDiv>
                    <ChangeLanguages />
                    <div className="connect">
                        {  connect ? <CreateLink noHover text={t("home")} href="/home" /> : <CreateLink noHover text={t("connect")} href="/login" /> }
                    </div>
                </NavbarDiv>
            </header>
            <AnimatedBoxImage title={t("protect_your_data_title")} text={t("protect_your_data_description")} image={{
                src: `${cdnbaseurl}/assets/backgrounds/placeholder_eric.png`,
                alt: "juste un truc qui doit etre la"
            }} />
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
            }} />
            <AnimatedTextTitle title={t("ready_to_start")} button={{ href: "/register", text: t("register") }} />
            <footer>
                <div className="left">
                    <h3>Application</h3>
                    <CreateLink text="Télécharger" href="/" />
                    <CreateLink text="Premium" href="/" />
                    <CreateLink text="Status" href="/" />
                </div>
                <div className="middle">
                    <h3>Informations</h3>
                    <CreateLink text="Contact" href="mailto:support@trenderapp.com" />
                    <CreateLink text="API" href="/" />
                    <span>© {dayjs().year()} Trender</span>
                </div>
                <div className="right">
                    <h3>Légal</h3>
                    <CreateLink text="CGU" href="https://cdn.trenderapp.com/assets/legal/T&S.pdf" />
                    <CreateLink text="Mentions Légal" href="/" />
                </div>
            </footer>
        </div>
    )
}

export default Presentation;