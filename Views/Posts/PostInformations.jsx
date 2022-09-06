import React, { useEffect, useContext, useState } from "react";
import PageContainer from "../../Components/Home/PageContainer";
import Loader from "../../Components/Others/Loader";
import DisplayPosts from "../../Components/Posts/DisplayPosts";
import PostList from "../../Components/Posts/PostList";
import { PostsListContext } from "../../Context/PostsContext";
import { addPosts, resetPost } from "../../Context/Reducer/Posts";
import client from "../../Services/client";

function PostInformations({ post_id, props}) {
    const [informations, setInformations] = useState({});
    const [loader, setLoader] = useState(true);
    const [loading, setLoading] = useState(true);
    const { posts, dispatch } = useContext(PostsListContext);

    useEffect(() => {
        dispatch()
        async function getData() {
            dispatch(resetPost())
            const request = await client.post.fetchOne(post_id);
            if(request.error || !request?.data) return;
            setInformations(request.data);
            setLoading(false);

            const response = await client.post.comments(post_id);
            if(response.error) return;
            if(response?.data) {  
                dispatch(addPosts(response.data));
                setLoader(false)
            }
        }

        getData();
    }, [post_id])

    const bottomHandler = async () => {
        if(!loader) return;
        const response = await client.post.comments(post_id, { skip: posts.length });
        if(response.error) return setError(response.error.code);
        if(response.data < 1) return setLoader(false);
        dispatch(addPosts(response.data));
    }

    return (
        <PageContainer onBottom={bottomHandler} title={props?.from?.nickname} description={props?.from?.description} image={props?.from?.avatar}>
            { loading ? <Loader /> : informations?.from ? <DisplayPosts informations={informations} /> : <Loader /> }
            { loader ? <Loader /> : posts.length > 0 ? <PostList loader={loader} list={posts} /> : <Loader /> }
        </PageContainer>
    )
}

export default PostInformations;