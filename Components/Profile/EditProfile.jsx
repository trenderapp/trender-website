import React, { useContext, useState } from "react";
import FixedMenu from "../Others/FixedMenu";
import profileStyles from "../../Style/Profile.module.scss"
import styles from "../../Style/All.module.scss"
import Banner from "../Members/Banner";
import Avatar from "../Members/Avatar";
import TextInput from "../Inputs/Text";
import TextAreaInput from "../Inputs/Textarea";
import Svg from "../Svg/Svg";
import { AlertContext } from "../../Context/AlertContext";
import client, { axiosInstance } from "../../Services/client";
import { SimpleColor } from "../../Services/Canvas";
import { UserContext } from "../../Context/AppContext";
import ProgressBar from "../Others/ProgressBar";
import { useTranslation } from "../../Context/Localization";

function EditProfile({ setEdit, user_info }) {

    const { t } = useTranslation()
    const [modif, setModif] = useState(user_info);
    const [sending, setSending] = useState({
        send: false,
        progress: 0
    })

    const { setUser } = useContext(UserContext);
    const { setAlert } = useContext(AlertContext);
    const [profilePictures, setProfilePicture] = useState({
        banner:  modif.banner ? client.user.banner(modif.user_id, modif.banner) : SimpleColor(),
        avatar: `${client.user.avatar(modif.user_id, modif.avatar) ?? "base_1.png"}`
    });

    const uploadbannerPicture = async () => {
        document.getElementById("uploadbannerpicture").click();
    }

    const uploadavatarPicture = async () => {
        document.getElementById("uploadavatarpicture").click();
    }

    const changePictures = async (e, type) => {

        if (e.target.files[0]) {
            if(type === "av") {
                setProfilePicture({...profilePictures,  avatar: URL.createObjectURL(e.target.files[0])});
            }else {
                setProfilePicture({...profilePictures,  banner: URL.createObjectURL(e.target.files[0])});
            }

            const file_name = e.target.files[0];
            if(type === "av") {
                setModif({ ...modif, avatar: file_name });
            }else {
                setModif({ ...modif, banner: file_name });
            }            
        }
    }


    const changeInfo = (e) => {
        e.preventDefault();
        setModif({ ...modif, [e.target.name]: e.target.value })
    }

    const sendInfo = async (e) => {
        e.preventDefault();
        if(sending.send) return setAlert({ display: true, type: "error", message: `${t(`sending_form`)}`});
        
        let data = {
            avatar: user_info.avatar === modif.avatar ? undefined : modif.avatar,
            banner: user_info.banner === modif.banner ? undefined : modif.banner,
            is_private: modif?.is_private,
            link: modif?.link,
            description: modif?.description,
            nickname: modif?.nickname,
            username: modif?.username
        }

        if(data?.nickname?.length > 30 || data?.nickname?.length < 3 || data?.username?.length > 30 || data?.username?.length < 3 || data?.description?.length > 120) return setAlert({ display: true, type: "error", message: `${t(`verify_fields`)}`});

        if(data?.avatar) {
            if(typeof window !== "undefined") {
                var formdata = new FormData();

                formdata.append("avatar", modif.avatar);
    
                var config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                    onUploadProgress: function(progressEvent) {
                        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total );
                        setSending({ send: true, progress: percentCompleted })
                    }
                }
    
                const request = await axiosInstance.post(`/upload?type=avatar`, formdata, config);
                const response = request.data;
                if(response?.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}` });
                data = { ...data, avatar: response.data };
                setSending({ send: false, progress: 0 });
            }
        }

        if(data?.banner) {
            if(typeof window !== "undefined") {
                var formdata = new FormData();

                formdata.append("banner", modif.banner);
    
                var config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                    },
                    onUploadProgress: function(progressEvent) {
                        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total );
                        setSending({ send: true, progress: percentCompleted })
                    }
                }
    
                const request = await axiosInstance.post(`/upload?type=banner`, formdata, config);
                const response = request.data;
                if(response?.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}` });
                data = { ...data, banner: response.data };
                setSending({ send: false, progress: 0 });
            }
        }

        const response = await client.user.edit(data);

        setSending({ send: false, progress: 0 });

        if(response?.error) return setAlert({ display: true, type: "error", message: `[${response.error.code}] ${t(`${response.error.code}`)}` });

        setUser(response.data);
        setAlert({ display: true, type: "success", message: t("success") });
    }

    return (
        <FixedMenu text_left width="700" oustideClick={() => setEdit(false)}>
            <div className={`${styles.row} ${styles.align_center} ${styles.space_between} ${styles.fixed_menu_title}`}>
                <div className={`${styles.row} ${styles.align_center} ${styles.space_between}`}>
                    <Svg className={styles.pointer} name="circle-close" size={24} onClick={() => setEdit(false)} />
                    <h2>{t("edit")}</h2>
                </div>
                <button className={`${styles.pointer}`} onClick={sendInfo}>{t('save')}</button>
            </div>
            { sending.send && <ProgressBar progress={sending.progress} /> }
            <div className={`${styles.full_width} ${styles.column} ${styles.space_between}`}>
                <Banner custom onClick={() => uploadbannerPicture()} user_id={user_info.user_id} banner={profilePictures.banner} accent_color={user_info.accent_color}/>
                <input onChange={(e) => changePictures(e, "bg")}  type="file" accept=".png, .jpg, .jpeg" id="uploadbannerpicture" max={1} />
            </div>
            <div className={profileStyles.profile_informations}>
                <div className={profileStyles.top}>
                    <Avatar custom onClick={() => uploadavatarPicture()} border size={85} user_id={user_info.user_id} avatar={profilePictures.avatar}/>
                    <input onChange={(e) => changePictures(e, "av")} type="file" accept=".png, .jpg, .jpeg" id="uploadavatarpicture"/>
                </div>
                <TextInput label={t("username")}>
                    <input onChange={changeInfo} type="text" name="username" value={modif.username} />
                </TextInput>
                <TextInput label={t("nickname")}>
                    <input onChange={changeInfo} type="text" name="nickname" value={modif.nickname} />
                </TextInput>
                <TextInput label={t("link")}>
                    <input onChange={changeInfo} type="text" name="link" value={modif?.link} />
                </TextInput>
                <TextAreaInput label={`${t("bio", { length: modif?.description?.length ?? 0 })} :`} value={modif?.description?.substring(0, 120)} name="description" onChange={changeInfo} />
                <div className={`${styles.row} input ${styles.gap_5} ${styles.align_center}`}>
                    { modif.is_private ? <Svg name="lock" size={22} onClick={() => setModif({ ...modif, is_private: !modif.is_private })} /> : <Svg name="unlock" size={22} onClick={() => setModif({ ...modif, is_private: !modif.is_private })}/> }
                    <span>{t("account", { type: modif.is_private ? t("private") : t("public") })}</span>
                </div>
            </div>
        </FixedMenu>
    )
}

export default EditProfile;