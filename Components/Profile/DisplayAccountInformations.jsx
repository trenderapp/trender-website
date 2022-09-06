import React, { useContext, useState } from "react";
import Avatar from "../Members/Avatar";
import profileStyles from "../../Style/Profile.module.scss"
import styles from "../../Style/All.module.scss"
import Banner from "../Members/Banner";
import { isMobile } from 'react-device-detect';
import Svg from "../Svg/Svg";
import client from "../../Services/client";
import CreateLink from "../Text/Link";
import Text from "../Text/Text";
import dayjs from "dayjs";
import UserFlags from "trender-client/Permissions/Flags";
import EditProfile from "./EditProfile";
import { UserContext } from "../../Context/AppContext";
import { AlertContext } from "../../Context/AlertContext";
import FixedMenu from "../Others/FixedMenu";
import UserBadges from "../Members/Badges";
import { useTranslation } from "../../Context/Localization";

function DisplayAccountInformations({ informations }) {

    const { t, currentLanguage } = useTranslation();
    const [edit, setEdit] = useState(false);
    const { user  } = useContext(UserContext);
    const [following, setFollowing] = useState(informations?.following ? true : false);
    const { setAlert } = useContext(AlertContext);
    const [extraOptions, setExtraOptions] = useState(false);

    const follow = async () => {
        const response = await client.user.follow.create(informations.user_info.user_id);
        if(response.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}` });
        setFollowing(true)
    }

    const unfollow = async () => {
        const response = await client.user.follow.delete(informations.user_info.user_id);
        if(response.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}` });
        setFollowing(false)
    }

    const block = async () => {
        const response = await client.user.block.create(informations.user_info.user_id);
        if(response.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}` });
        setAlert({ display: true, type: "success", message: t("success") });
    }

    const report = async () => {
        const response = await client.user.report(informations.user_info.user_id, 1);
        if(response.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}` });
        setAlert({ display: true, type: "success", message: t("success") });
    }

    return (
        <div className={profileStyles.profile_section}>
            {        
                edit && <EditProfile setEdit={setEdit} user_info={informations.user_info} />
            }
            {
                extraOptions && 
                <FixedMenu oustideClick={() => setExtraOptions(false)}>
                        <span onClick={() => report()} className={`${styles.row} ${styles.justify_center} ${styles.full_width} ${styles.padding_10} ${styles.border_bottom} ${styles.pointer} ${styles.hover}`}><Svg name="shield" size={22} /> {t("report")}</span>
                        <span onClick={() => block()} className={`${styles.row} ${styles.justify_center} ${styles.full_width} ${styles.padding_10} ${styles.border_bottom} ${styles.pointer} ${styles.hover}`}><Svg name="ban" size={22} /> {t("block")}</span>
                        <span onClick={() => setExtraOptions(false)} className={`${styles.row} ${styles.justify_center} ${styles.full_width} ${styles.padding_10} ${styles.pointer} ${styles.hover}`}>{t("cancel")}</span>
                </FixedMenu>
            }
            <div className={`${styles.full_width} ${styles.column} ${styles.space_between}`}>
                <Banner user_id={informations.user_info.user_id} banner={informations.user_info.banner} accent_color={informations.user_info.accent_color}/>
            </div>
            <div className={profileStyles.profile_informations}>
                <div className={profileStyles.top}>
                    <Avatar border size={85} user_id={informations.user_info.user_id} avatar={informations.user_info.avatar}/>
                    <div style={{ marginTop: isMobile ? 50 : 40, gap: 15 }} className={`${styles.row} ${styles.align_center}`}>
                        { informations.user_info.user_id !== user?.user_id && <Svg onClick={() => setExtraOptions(true)} className={`${styles.pointer} ${styles.hover}`} name="ellipsis" size={25} />}
                        { informations.user_info.user_id === user?.user_id && <button onClick={() => setEdit(true)}>{t("edit")}</button> }
                        { informations.user_info.user_id !== user?.user_id && following && <button onClick={() => unfollow()}>{t("unfollow")}</button> }
                        { informations.user_info.user_id !== user?.user_id && !following && <button onClick={() => follow()}>{t("follow")}</button> }
                    </div>
                </div>
                <div className={profileStyles.middle}>
                    <span style={{ maxWidth: "100%" }} className={`${styles.ellipsis} ${profileStyles.username}`}>
                        { informations.user_info.is_private && <Svg name="lock" size={20} /> }
                        {informations.user_info.username}
                        { client.user.flags(informations.user_info.flags).has(UserFlags.VERIFIED_USER) && <Svg name="verified" size={20} /> }
                    </span>
                    <span className={`${profileStyles.nickname} ${styles.row} ${styles.align_center} ${styles.gap_5}`}>
                        @{informations.user_info.nickname}
                        { /* client.user.flags(informations.user_info.flags).toArray().map((e) => <UserBadges url={client.user.badge(e)} />) */ }
                        { client.user.flags(informations.user_info.flags).has(UserFlags.TRENDER_EMPLOYEE) && <UserBadges url={client.user.badge("TRENDER_EMPLOYEE")} /> }
                    </span>
                </div>
                <div className={profileStyles.description}>
                    <Text text={informations.user_info.description} />
                    { informations.user_info.link && <span><Svg noColor name="link" size={18} /> <CreateLink href={informations.user_info.link} text={informations.user_info.link} /></span> }
                    { informations.user_info.created_at && <span>{t("joined")} : <span className={profileStyles.date}>{dayjs(informations.user_info.created_at).locale(currentLanguage).format("MMMM YYYY")}</span></span> }
                </div>
                <div className={profileStyles.bottom}>
                    <CreateLink href={informations.user_info.nickname ? `${informations.user_info.nickname}/follows` : `/${informations.user_info.nickname}`} ><span><span className="number">{informations.subscriptions?.total ?? 0}</span> {t("subscriptions")}</span> </CreateLink>
                    <CreateLink href={informations.user_info.nickname ? `${informations.user_info.nickname}/followers` : `/${informations.user_info.nickname}`} ><span><span className="number">{informations.subscribers?.total ?? 0}</span> {t("subscribers")}</span> </CreateLink>
                </div>
            </div>
        </div>
    )
}

export default DisplayAccountInformations;