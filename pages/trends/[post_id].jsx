import { useRouter } from "next/router";
import React from "react";
import { PostsListContextProvider } from "../../Context/PostsContext";

import { apibaseurl } from "../../Services/constante";

import PostInformations from "../../Views/Posts/PostInformations";

function Posts(props) {

  const router = useRouter();

  return (
    <PostsListContextProvider>
      <PostInformations props={props} post_id={router.query?.post_id ?? props?.post_id} />
    </PostsListContextProvider>
  );
}

export const getServerSideProps = async ({ query }) => {
    let to_send = { 
        nickname: "",
        description: "",
        avatar: ""
    };
    
    const post_id = query.post_id;

    if(post_id === "[object Object]") return {
      props: to_send
    };

    async function getData() {

        const request = await fetch(`${apibaseurl}/seo/posts/${post_id}`);
        const response = await request.json();

        to_send = response;
    }

    await getData();

    return {
      props: {
        ...to_send,
      }
    }
}

export default Posts;