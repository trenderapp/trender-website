import React, { useContext, useState } from "react";
import Image from "next/image";
import OutsideClickHandler from "react-outside-click-handler";

import { cdnbaseurl } from "../../Services/constante";
import { SimpleColor } from "../../Services/Canvas";
import { ThemeContext } from "../../Context/ThemeContext";
import { UserContext } from "../../Context/AppContext";

import styles from "../../Style/All.module.scss";
import NavbarDropDown from "./NavbarDropDown";
import Notifications from "../Notifications/Notifications";
import SearchModal from "../Utils/SearchModal";
import CreateLink from "../../Components/Text/Link";
import NavbarLink from "../../Components/Navbar/NavbarLink";
import NavbarDiv from "../../Components/Navbar/NavbarDiv";
import Svg from "../../Components/Svg/Svg";
import Avatar from "../../Components/Members/Avatar";
import client from "../../Services/client";
import { useTranslation } from "../../Context/Localization";


function Navbar({ showsearch }) {

    const { theme } = useContext(ThemeContext);
    const { user, setUser } = useContext(UserContext);
    const { t } = useTranslation();

    const [openDropdown, setOpenDropdown] = useState(false);
    const [notifications, displayNotifications] = useState(false);
    
    return (
    <header style={{ zIndex: 999 }} className={`${styles.fixed} ${styles.row} ${styles.full_screen_width} ${styles.blur_background}`}>
        { notifications && user && <Notifications setPreview={displayNotifications} /> }
        <div className={`${styles.padding_15} ${styles.margin_auto} ${styles.row} ${styles.space_between} ${styles.max_width} ${styles.header}`}>
            <NavbarDiv>
                <CreateLink href="/home" >
                    <Image src={`${cdnbaseurl}/assets/logos/${theme === "theme-white" ? "black" : "white"}.png`} width={103} height={29} alt="app-logo"/>
                </CreateLink>
            </NavbarDiv>
            <NavbarDiv>
                { !showsearch && <SearchModal /> }
            </NavbarDiv>
            <NavbarDiv>
                { /**<NavbarLink href="/messages" text={<Svg name="messages" size={30} />}/> */ }
                <NavbarLink href="/search" text={<Svg name="explore" size={30}/>}/>
                <span className={`${styles.hover} ${styles.pointer}`}><Svg name="notifications" size={30} onClick={() => displayNotifications(!notifications)} /></span>
                { user ? <Avatar pointer disconnected={!user} avatar={user.avatar} user_id={user.user_id} src={user ? client.user.avatar(user.user_id, user.avatar) : SimpleColor()} onClick={() => setOpenDropdown(!openDropdown)} /> : <CreateLink text={t("connect")} href="/login" />}
                <div>
                    {
                        openDropdown && <OutsideClickHandler onOutsideClick={() => setOpenDropdown(!openDropdown)}><NavbarDropDown setUser={setUser} user={user}  /></OutsideClickHandler>
                    }
                </div>
            </NavbarDiv>
            
        </div>
    </header>
);
}

export default Navbar;