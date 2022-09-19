import React, { useRef } from "react";
import styles from "../../Style/All.module.scss";
import Navbar from "../../Views/Navbar/Navbar";
import Seo from "../../Views/Seo";
import HomeStyles from "./Home.module.scss";

function PageContainer({ children, description, image, title, showsearch, onBottom, scrollTop }) {

  const refPage = useRef();

    const handleScroll = async (e) => {
      const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      
      if (bottom && onBottom) return onBottom();
    }

    const onTop = () => {
      if(typeof window !== "undefined") {
        refPage.current.scrollTo({
          top: 0,
          behavior: 'smooth' // for smoothly scrolling
        });
      }
    }

    return (
        <div ref={refPage} onScroll={handleScroll} className={HomeStyles.container}>
            <Seo description={description} image={image} title={title} />
            <Navbar showsearch={showsearch} />
            <section className={`${styles.scroll} ${styles.margin_auto} ${styles.max_width}`}>
              { children }
              {
              scrollTop &&             
              
                <button style={{
                  position: "fixed",
                  bottom: "20px",
                  right: '30px',
                  zIndex: 99,
                  border: "none",
                  outline: "none",
                  backgroundColor: "red",
                  color: "white",
                  cursor: "pointer",
                  padding: "15px",
                  borderRadius: "10px",
                  fontSize: "18px",
                }} onClick={() => onTop()} title="Go to top">Top</button>
              }
            </section>
        </div>
    )
}

export default PageContainer;