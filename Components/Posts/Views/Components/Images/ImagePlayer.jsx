import React, { useEffect, useState } from "react";

import Svg from "../../../../../Components/Svg/Svg";
import ImageView from "../ImageView";
import ImageStyles from "./Images.module.scss";
import Image from "next/image";
import { SimpleColor } from "../../../../../Services/Canvas";
import client from "../../../../../Services/client";

const ImagePlayer = ({ pictures, deleteOnClick, attachments, post_id, user_id }) => {

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
    
    const DeleteItem = (e) => {
        e.preventDefault();
        pictures.splice(img.position, 1)
        attachments.splice(img.position, 1)
        deleteOnClick({ attachments: attachments, files: pictures })
        setImg({ src: pictures[0], position: 0 })
    }

  return (
    <section className={ImageStyles.container}>
        <div className={ImageStyles.layout}>
            <div className={ImageStyles.progress}>
                { deleteOnClick && <div className={ImageStyles.close} onClick={DeleteItem}><Svg name="circle-close" size={25} /></div> }
            </div>
            <div className={ImageStyles.image_layout}>
                { pictures.length > 1 &&  <div onClick={() => moveLeft()} className={ImageStyles.icon}><Svg name="chevron-left" size={25} /></div> }
                <div className={ImageStyles.image_container}><Image objectFit="cover" layout="fill" draggable="false" unoptimized placeholder="blur" blurDataURL={SimpleColor()} priority quality={100} src={img?.src?.name ? `${client.post.file(user_id, post_id, img?.src?.name)}` : img.src.url} alt={`${img.src.name}`} /></div>
                { pictures.length > 1 &&  <div onClick={() => moveRight()} className={`${ImageStyles.icon} ${ImageStyles.rotate}`}><Svg name="chevron-left" size={25} /></div> }
            </div>
            { pictures.length > 1 && <div className={ImageStyles.dots}>{pictures.map((e, index) => <span key={index} onClick={() => setImg({ src: pictures[index], position: index })} className={`${ImageStyles.dot} ${img.position === index && ImageStyles.active}`}></span>)}</div> }
        </div>
        { /**<Image layout="fill" className={ImageStyles.img} src={img.src?.path ? `${cdnbaseurl}${img.src.path}` : img.src.url} alt={`${img.src.name}`} /> */ }

    {
        /**
         *         { deleteOnClick && <Svg name="circle-close" size={22} className={ImageStyles.close} onClick={DeleteItem} /> }
        { pictures.length > 1 && <button className={ImageStyles.left_btn} onClick={() => moveLeft()}><Svg name="chevron-left" size={22} /></button> }
        <img draggable="true" className={ImageStyles.img} onClick={() => setDisplay(true)} src={img.src?.path ? `${cdnbaseurl}${img.src.path}` : img.src.url} alt={`${img.src.filename}`} />
        { displayImg && <ImageView src={img.src?.path ? `${cdnbaseurl}${img.src.path}` : img.src.url} setpreview={setDisplay} /> }
        { pictures.length > 1 && <button className={ImageStyles.right_btn} onClick={() => moveRight()}><Svg name="chevron-left" size={22} /></button> }
         */
    }
    </section>
  );
};

export default ImagePlayer;
