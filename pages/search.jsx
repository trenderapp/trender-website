import React from "react";

import SearchHome from "../Views/Search";

function Explore(props) {

    return (
        <SearchHome props={props} />
    )
}

export const getServerSideProps = async ({ query }) => {
    return {
      props: query ?? { q: "", type: "" }
    }
}


export default Explore;