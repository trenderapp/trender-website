import React from "react";
import { PostsListContextProvider } from "../Context/PostsContext";

import HomeIndex from "../Views/Home";

function Home() {

    return (
        <PostsListContextProvider>
            <HomeIndex />
        </PostsListContextProvider>
    )
}

export default Home;