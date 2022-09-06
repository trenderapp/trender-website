import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PostsRequestContextProvider } from "../../Context/PostsContext";
import MemberList from "../../Components/Members/List";
import Svg from "../../Components/Svg/Svg";
import Loader from "../../Components/Others/Loader";
import DisplayPosts from "../../Components/Posts/DisplayPosts";
import client from "../../Services/client";
import PageContainer from "../../Components/Home/PageContainer";

function SearchHome({ props }){

    const router = useRouter();

    const { q, type } = props;

    const [element, setElement] = useState("users");
    const [info, setInfo] = useState([])
    const [value, setValue] = useState(q);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        async function getData() {
            const request = type === "users" ? await client.user.search(q) : null
            if(!request) return setInfo([])
            if(request.error) return;
            
            setInfo(request.data);
        }
        
        if(q?.length > 0) getData();
    }, [q, type])

    const keyPress = (e) => {
        if(e.code === "Enter") router.push(`/search?q=${value}&type=${element}`)
    }

    const onBottomHandler = async () => {
        if(!loader) return;
        const request = await client.user.search(q, {
            skip: info.length
        })

        if(!request) return;
        if(request.error) return;
        if(request.data < 1) return setLoader(false);
        setInfo(info.concat(request.data));
    }

    return (
        <PageContainer onBottom={onBottomHandler}>
            <div className="selected-search">
                <div className="elements">
                    <span onClick={() => setElement("users")} className={element === "users" ? "selected" : undefined}>Utilisateurs</span>
                    <span onClick={() => setElement("posts")} className={element === "posts" ? "selected" : undefined}>Posts</span>
                    <span onClick={() => setElement("medias")} className={element === "medias" ? "selected" : undefined}>Medias</span>
                </div>
            </div>
            <div className="searchsection">
                <input onChange={(e) => setValue(e.target.value)} onKeyPress={(e) => keyPress(e)} value={value} type="search" placeholder="Rechercher"/>
                <button><Svg name="magnify" className="fa-primary" onClick={() => router.push(`/search?q=${value}&type=${element}`)} size={20} /></button>
            </div>
            <div>
                {
                    info.length > 0 ?
                        
                        type === "users" ?
                            <MemberList loader={loader} description full_width list={info} />
                            : <PostsRequestContextProvider value={[info, setInfo]}><DisplayPosts posts={info} /></PostsRequestContextProvider>
                    : <Loader />
                }
            </div>
        </PageContainer>
    )
}

export default SearchHome;