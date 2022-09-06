import React, { useContext, useEffect, useState } from "react";
import client, { user_token } from "../../Services/client";
import CreatePost from "../../Components/Posts/Creation/CreatePost";
import NotConnected from "../../Components/Posts/NotConnected";
import PageContainer from "../../Components/Home/PageContainer";
import { PostsListContext } from "../../Context/PostsContext";
import PostList from "../../Components/Posts/PostList";
import Loader from "../../Components/Others/Loader";
import styles from "../../Style/All.module.scss";
import { addPosts } from "../../Context/Reducer/Posts";
import { useTranslation } from "../../Context/Localization";
import { NoPostError } from "../../Errors";

function HomeIndex() {

    const { posts, dispatch } = useContext(PostsListContext);
    const { t } = useTranslation();
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {

            const response = await client.post.fetch();
            setLoading(false)
            if(response.error) return setError(response.error.code);
            dispatch(addPosts(response.data));
        }

        getData()
        
    }, [])

    const bottomHandler = async () => {
        if(!loader) return;
        const response = await client.post.fetch({ skip: posts.length });
        if(response.error) return setError(response.error.code);
        if(response.data < 1) return setLoader(false);
        dispatch(addPosts(response.data));
    }

    return (
        <PageContainer onBottom={bottomHandler} description="Display all post for your account" title="Home">
            { user_token && <CreatePost /> }
            <section>
                {
                    user_token ? loading ? <Loader /> : !error ? posts.length > 0 ? <PostList list={posts} loader={loader} /> : <NoPostError /> : <span>{t(`${error}`)}</span> : <NotConnected />
                }
            </section>
        </PageContainer>
    )
}

export default HomeIndex;