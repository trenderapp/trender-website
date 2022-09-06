import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import ImageStyles from "./Images.module.scss";
import Image from "next/image";
import { Svg } from "../Svg";
import { SimpleColor } from "../../Services/Canvas";
import client from "../../Services/client";
import BigImage from "./BigImage";

const ImageCarroussel = ({ pictures, post_id, user_id }) => {

    const [displayImg, setDisplay] = useState(false)

    const [img, setImg] = useState({
        src: pictures[0],
        position: 0
    });

    useEffect(() => {
        setImg({ ...img, src: pictures[0] })
    }, [pictures])

    var moveRight = () => {
        if (img.position >= pictures.length - 1) {
            setImg({ src: pictures[0], position: 0 })
            return;
        }
        setImg({ src: pictures[img.position + 1], position: img.position + 1 })
    }

    var moveLeft = () => {
        if(img.position < 1) {
            setImg({ src: pictures[pictures.length - 1], position: pictures.length - 1 })
            return;
        }
        setImg({ src: pictures[img.position - 1], position: img.position - 1 })
    }

  return (
    <section className={ImageStyles.container}>
        <div className={ImageStyles.layout}>
            <div className={ImageStyles.image_layout}>
                { pictures.length > 1 &&  <div onClick={() => moveLeft()} className={ImageStyles.icon}><Svg name="chevron-left" size={25} /></div> }
                <div onClick={() => setDisplay(true)} className={ImageStyles.image_container}>
                    <Image objectFit="cover" layout="fill" draggable="false" unoptimized placeholder="blur" blurDataURL={SimpleColor()} priority quality={100} src={img?.src?.name ? `${client.post.file(user_id, post_id, img?.src?.name)}` : img.src.url} alt={`${img.src.name}`} />
                </div>
                { pictures.length > 1 &&  <div onClick={() => moveRight()} className={`${ImageStyles.icon} ${ImageStyles.rotate}`}><Svg name="chevron-left" size={25} /></div> }
            </div>
            { pictures.length > 1 && <div className={ImageStyles.dots}>{pictures.map((e, index) => <span key={index} onClick={() => setImg({ src: pictures[index], position: index })} className={`${ImageStyles.dot} ${img.position === index && ImageStyles.active}`}></span>)}</div> }
        </div>
        { displayImg && <BigImage currentIndex={img.position} outsideClick={setDisplay} images={pictures.map(p => client.post.file(user_id, post_id, p?.name))} /> }
    </section>
  );
};

export default ImageCarroussel;
