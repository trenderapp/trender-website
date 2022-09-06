import React from "react";
import Loader from "../Others/Loader";
import styles from "../../Style/All.module.scss";
import DisplayPosts from "./DisplayPosts";

function PostList({ list, full_width, loader }) {

    return (
        <div style={{
            width: "100%"
        }} className={styles.column}>
            {
                list.map((informations, index) => informations && <DisplayPosts full_width={full_width} informations={informations} key={index} />)
            }
            {
                loader && list.length > 25 && <Loader />
            }
        </div>
    )
}

export default PostList;