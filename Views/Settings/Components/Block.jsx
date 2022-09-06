import React, { useContext, useEffect, useState } from "react";

import client from "../../../Services/client";
import Avatar from "../../../Components/Members/Avatar";
import styles from "../../../Style/All.module.scss";
import stylesSettings from "../../../Style/Settings.module.scss";
import Svg from "../../../Components/Svg/Svg";
import { AlertContext } from "../../../Context/AlertContext";

function Block({ full_height }) {

    const [info, setInfo] = useState([])
    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        async function getData() {
            const request = await client.user.block.fetch();
            if(request.error) return;

            setInfo(request.data)

        }

        getData()
    }, [])

    const unblockUser = async (target_id) => {
        const response = await client.user.block.delete(target_id);
        if(response.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}` });
        setInfo(info.filter((u) => u.user_id !== target_id))
    }

    return (
        <div style={{
            height: full_height && "100%"
        }} id="block">
            <h3>Comptes bloqués</h3>
            <div style={{
                height: full_height ? "90%" : "250px"
            }} className={`${stylesSettings.account_blocked}`}>
                {
                    info.length > 0 && info.map((user, index) => 
                        <div key={index} style={{
                            width: "100%"
                        }} className={`${styles.row} ${styles.space_between}`}>
                            <div className={`${styles.row} ${styles.full_width}`}>
                                <Avatar className={styles.full_width} size={48} user_id={user.user_id} avatar={user.avatar} />
                                <div className={`${styles.column} ${styles.full_width}`} >
                                    <div className={`${styles.row}`}>
                                        <span style={{ maxWidth: "100%" }} className={`${styles.ellipsis}`}>{user.username}</span>
                                    </div>
                                    <div>    
                                        <span className={`${styles.nickname} ${styles.ellipsis}`}>@{user.nickname}</span>
                                    </div>
                                </div>
                            </div>
                            <Svg className={`${styles.pointer} ${styles.hover}`} onClick={() => unblockUser(user.user_id)} size={22} name="circle-close" />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Block;