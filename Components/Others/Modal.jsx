import React from "react";
import OnClickOutside from "react-outside-click-handler";
import Svg from "../Svg/Svg";

function Modal({ children, title, image, setpreview, save }) {
    return (
        <div className={`${image ? "preview-image" : ""} modal-section`}>
            <div className={`${image ? "preview-image" : ""} modal`}> 
                <OnClickOutside onOutsideClick={() => setpreview(false)}> 
                    <div className="modal-box">
                        <div className="modal-title">
                            <Svg name="circle-close" size={22} onClick={() => setpreview(false)} />
                            <h2>{title}</h2>
                            { save && <Svg name="save" size={22} onClick={save} />}
                        </div>
                        <div className="modal-content">
                            { children }
                        </div>
                    </div>    
                </OnClickOutside>
            </div>
        </div>
    )
}

export default Modal;