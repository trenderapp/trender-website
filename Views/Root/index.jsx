import React from "react";
import dayjs from "dayjs";

import { cdnbaseurl } from "../../Services/constante";
import Seo from "../Seo";
import CreateLink from "../../Components/Text/Link";
import { useTranslation } from "../../Context/Localization";


function Presentation() {


    const { t } = useTranslation();

    return (
        <section className="presentation">
            <Seo title="Welcome"/>
            <header>
                <div className="header">
                    <div className="droite">
                        <CreateLink href="/" className="link" >
                            <img src={`${cdnbaseurl}/assets/logos/white.png`} alt="app-logo" />
                        </CreateLink>
                    </div>
                    <div className="gauche">
                        <div className="dropdown">
                            <CreateLink text={t("connect")} href="/login" />
                       </div>
                    </div>
                </div>
            </header>
            <section className="trender">
                <div className="hero">
                    <div>
                        <h1>Trender</h1>
                        <h3>Create the next Trend</h3>
                    </div>
                </div>
            </section>
            <footer>
                <div className="left">
                    <h3>Application</h3>
                    <CreateLink text="Télécharger" href="/" />
                    <CreateLink text="Premium" href="/" />
                    <CreateLink text="Status" href="/" />
                </div>
                <div className="middle">
                    <h3>Informations</h3>
                    <CreateLink text="Contact" href="/" />
                    <CreateLink text="API" href="/" />
                    <span>© {dayjs().year()} Trender</span>
                </div>
                <div className="right">
                    <h3>Légal</h3>
                    <CreateLink text="CGU" href="/" />
                    <CreateLink text="CGV" href="/" />
                    <CreateLink text="RGPD" href="/" />
                    <CreateLink text="Mentions Légal" href="/" />
                </div>
                
            </footer>
        </section>
    )
}

export default Presentation;