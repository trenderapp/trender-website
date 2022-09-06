import React from "react";
import Modal from "../../../../Components/Others/Modal";

function ImageView({ src, setpreview }){

    return (
        <Modal image title="Image Preview" setpreview={setpreview}>
            <div className="modal-content-section">
                <img src={src} alt={src} />
            </div>
        </Modal>
    )
}

export default ImageView;
