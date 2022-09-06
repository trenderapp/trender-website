import React, { useContext, useEffect, useState } from "react";

import styles from "../../../Style/All.module.scss";
import client from "../../../Services/client";
import { AlertContext } from "../../../Context/AlertContext";
import MemberInformations from "../../../Components/Members/Informations";
import CreateLink from "../../../Components/Text/Link";
import { useTranslation } from "../../../Context/Localization";

function NotificationsFollows({ user }) {

    const { t } = useTranslation();
    const [informations, setInfo] = useState([]);
    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        async function getData() {
            const response = await client.user.follow.unacceptedList();
            if(response.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}`});
            setInfo(response.data);
        }

        getData()
    }, [])

    const accept_follow = async (index) => {
        var new_array = [...informations];
        if(new_array[index].accepted) return;

        const response = await client.user.follow.accept(new_array[index].follow_id);
        if(response.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}`});

        new_array[index].accepted = true;
        setInfo(new_array);
    }
    return (
        <div className="follows">
            {
                informations.length > 0 ?
                    informations.map((follow, index) => 
                        <div key={index} className="follow-box">
                            <CreateLink className={`${styles.full_width}`} href={`/${follow.nickname}`}>
                                <MemberInformations info={follow} />
                            </CreateLink>
                            <div className="follow-accept" >
                                <button onClick={() => accept_follow(index)}>{follow.accepted ? t("accepted") : t("waiting") }</button>
                            </div>
                        </div>   
                    ) : <h3>Aucun abonnement en attente</h3>
            }
        </div>
    )
}

export default NotificationsFollows;