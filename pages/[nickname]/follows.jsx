import React from "react";
import DisplayFollows from "../../Views/Profile/Follows";

function Follows(props) {

  return (
    <DisplayFollows nickname={props.nickname} type="follows" />
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


export default Follows;