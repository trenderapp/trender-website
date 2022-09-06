import React from "react";
import { apibaseurl } from "../../Services/constante";
import client from "../../Services/client";
import ProfileHome from "../../Views/Profile/ProfileHome";
import { PostsListContextProvider } from "../../Context/PostsContext";

function Profile(props) {

    return (
        <PostsListContextProvider>
            <ProfileHome {...props} />
        </PostsListContextProvider>
    );
}

export const getServerSideProps = async ({ query }) => {
    let to_send = {};
    
    const nickname = query.nickname;

    const request = await fetch(`${apibaseurl}/seo/users/${nickname}`);
    const response = await request.json();

    if(response.error) {
        to_send.nickname = nickname;
        to_send.description = `Profile of ${nickname}`;
        to_send.image = null,
        to_send.user_id = null

    }else {
        const data = response;

        to_send.nickname = nickname;
        to_send.description = data.description ?? `Profile of ${nickname}`;
        to_send.image = `${client.user.avatar(data.user_id, data.avatar)}`
    }

    return {
      props: to_send
    }
}

export default Profile;