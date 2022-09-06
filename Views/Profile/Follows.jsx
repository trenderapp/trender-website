import React, { useEffect, useState } from "react";

import styles from "../../Style/All.module.scss";
import MemberList from "../../Components/Members/List";
import client from "../../Services/client";
import PageContainer from "../../Components/Home/PageContainer";
import { useTranslation } from "../../Context/Localization";

function DisplayFollows({ nickname, type }) {

    const { t } = useTranslation();
    const [info, setInfo] = useState([]);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        async function getData() {

            const response = type === "followers" ? await client.user.follow.followers(nickname) : await client.user.follow.follows(nickname)
            if(response.error) return setError(response.error.code);
            setInfo(response.data);
        }

        getData()
    }, [nickname])

    const bottomHandler = async () => {
        if(!loader) return;
        const response = type === "followers" ? await client.user.follow.followers(nickname, { skip: info.length }) : await client.user.follow.follows(nickname, { skip: info.length })
        if(response.error) return setError(response.error.code);
        if(response.data < 1) return setLoader(false);
        setInfo(info.concat(response.data));
    }

    return (
        <PageContainer onBottom={bottomHandler} title={`${type === "follows" ? "Follows" : "Followers"} of ${nickname}`}>
            { !error ? info.length > 0 ? <MemberList description list={info} loader={loader} /> : <span className={`${styles.row} ${styles.text_center} ${styles.full_width}`}>{t(`empty`)}</span> : <span>{t(`${error}`)}</span> }
        </PageContainer>
    )
}

export default DisplayFollows;