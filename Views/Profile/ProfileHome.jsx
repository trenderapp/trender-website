import React, { useContext, useEffect, useState } from "react";
import PageContainer from "../../Components/Home/PageContainer";
import Loader from "../../Components/Others/Loader";
import PostList from "../../Components/Posts/PostList";
import DisplayAccountInformations from "../../Components/Profile/DisplayAccountInformations";
import ErrorUser from "../../Components/Profile/ErrorUser";
import { PostsListContext } from "../../Context/PostsContext";
import client from "../../Services/client";
import { addPosts } from "../../Context/Reducer/Posts";
import styles from "../../Style/All.module.scss";
import DisplayPosts from "../../Components/Posts/DisplayPosts";
import { useTranslation } from "../../Context/Localization";

function ProfileHome({ nickname, description, image }) {

    const { posts, dispatch } = useContext(PostsListContext);
    const { t } = useTranslation();
    const [error, setError] = useState(false);
    const [informations, setInfo] = useState(null);
    const [loader, setLoader] = useState(true);
    const [loading, setLoading] = useState(true);
    const [pined, setPined] = useState(null)
    
    useEffect(() => {
        async function getData() {
            const request = await client.user.profile(nickname);
            if(request.error) return setInfo(request);
            
            setInfo(request.data);

            const response = await client.post.user.fetch(nickname);
            setLoading(false)
            if(response.error) return setError(response.error.code);
            dispatch(addPosts(response.data));
            
            if(response.data.length > 0) {
                if(!response.data[0]?.from?.pined_post) return;
                const pined_post = await client.post.getPinPost(response.data[0].from.pined_post);
                if(response.error) return setError(pined_post.error.code);
                setPined({
                    from: response.data[0].from,
                    ...pined_post.data
                })
            }
        }

        getData()
        
    }, [nickname])

    const bottomHandler = async () => {
        if(!loader) return;
        const response = await client.post.user.fetch(nickname, { skip: posts.length });
        if(response.error) return setError(response.error.code);
        if(response.data < 1) return setLoader(false);
        dispatch(addPosts(response.data));
    }

    return (
        <PageContainer onBottom={bottomHandler} title={nickname} description={description} image={image}>
            { informations?.user_info ? <DisplayAccountInformations informations={informations} /> : informations?.error ? <ErrorUser nickname={nickname} code={informations.error.code} /> : <Loader /> }
            { pined && <DisplayPosts pined full_width informations={pined} /> }
            { loading ? <Loader /> : !error ? posts.length > 0 ? <PostList list={posts} loader={loader} /> : <span className={`${styles.row} ${styles.text_center} ${styles.full_width}`}>{t(`empty`)}</span> : <span>{t(`${error}`)}</span> }

        </PageContainer>
    )
}

export default ProfileHome;