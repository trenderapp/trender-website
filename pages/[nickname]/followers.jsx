import React from "react";
import DisplayFollows from "../../Views/Profile/Follows";

function Followers(props) {

  return (
    <DisplayFollows nickname={props.nickname} type="followers" />
  )
}

export const getServerSideProps = async ({ query }) => {
    
    const nickname = query.nickname;

    return {
      props: {
        nickname: nickname
      }
    }
}


export default Followers;