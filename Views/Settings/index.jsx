import React, { useEffect, useState } from "react";

import Loader from "../../Components/Others/Loader";
import Navbar from "../Navbar/Navbar";
import Seo from "../Seo";
import styles from "../../Style/All.module.scss";

import Informations from "./Components/Informations";
import Menu from "./Components/Menu";
import Themes from "./Components/Themes";
import Block from "./Components/Block";
import Connexions from "./Components/Connexions";
import Security from "./Components/Security";
import Keyboard from "./Components/Keyboard";
import Legal from "./Components/Legal";
import Patchnote from "./Components/Patchnote";

function SettingsSections({ section = "all", user }) {

    const [page, setPage] = useState(<Loader />);

    const views = [
        {
            name: "all",
            page: <Informations />
        },
        {
            name: "themes",
            page: <Themes />
        },
        {
            name: "block",
            page: <Block full_height />
        },
        {
            name: "connexions",
            page: <Connexions />
        },
        {
            name: "security",
            page: <Security />
        },
        {
            name: "keyboard",
            page: <Keyboard />
        },
        {
            name: "update",
            page: <Legal />
        },
        {
            name: "patchnote",
            page: <Patchnote />
        }
    ];

    useEffect(() => {
        const view = views.find(v => v.name === section);
        view ? setPage(view.page) : setPage(<p>Nothing Here</p>);

    }, [section])

    return (
        <div>
            <Seo title="Settings" description="change your account settings" />
            <Navbar />
            <section className={`settings ${styles.full_screen_height} ${styles.margin_auto} ${styles.max_width}`}>
                <Menu />
                <div className="informations">
                    { user && page }
                </div>
            </section>
        </div>
    )
}

export default SettingsSections;