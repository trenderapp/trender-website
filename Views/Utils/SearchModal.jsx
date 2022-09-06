import React, { useEffect, useState } from "react";
import { apibaseurl } from "../../Services/constante";
import MemberList from "../../Components/Members/List";
import styles from "../../Style/All.module.scss";
import client from "../../Services/client";
import { specialcharnickname_regex } from "../../Services/regex";

function SearchModal() {
    const [value, setValue] = useState("");
    const [modal, setModal] = useState(false);
    const [info, setInfo] = useState([]);
    
    useEffect(() => {
        async function getData() {
            var search = specialcharnickname_regex.test(value) ? value.replace(specialcharnickname_regex, "") : value;
            if(search.length < 1) return;
            const response = await client.user.search(search)
            setInfo(response.data);
        }
        
        if(value.length > 0) {
            setModal(true)
            getData()
        }else {
            setModal(false)
        }
        
    }, [value])

    return (
        <div className="search-modal">
            <input value={value} onChange={(e) => setValue(e.target.value)} className="research" type="text" placeholder="Rechercher" name="research" />
            { modal ?
                <div style={{
                    maxHeight: "50vh"
                }} onClick={() => setValue("")} className={`${styles.scroll} modal-users`}>
                    <div style={{
                        width: "100%"
                    }} className="modal-users-content">
                    {
                        
                        info.length > 0 && <MemberList list={info} />
                    }
                    </div>
                </div>
                : null 
            }
        </div>
    )
}

export default SearchModal;