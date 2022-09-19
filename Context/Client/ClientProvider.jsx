import * as React from 'react';
import Client from 'trender-client';
import ClientContext from './ClientContext';
import { useRouter } from "next/router";
import { apibaseurl, websocketurl } from '../../Services/constante';

function ClientProvider({ children }) {
    
    const [value, setValue] = React.useState({
        client: new Client({
            token: "",
            apiurl: apibaseurl
        }),
        token: null,
        user: null,
        state: "loading"
    });
    const history = useRouter();
    React.useEffect(() => {
        async function splash() {
            const info = localStorage.getItem("user_info");

            if(!info) {
                setValue({
                    ...value,
                    state: "logout"
                });
                return;
            }
      
            const user_token = JSON.parse(info)?.token;
      
            if(!user_token) {
                setValue({
                    ...value,
                    state: "logout"
                });
                return;
            }

            const client = new Client({
                token: user_token,
                apiurl: apibaseurl
            });
            const user = await client.informations();

            if(user.error) {
                setValue({
                    ...value,
                    state: "logout"
                });
                localStorage.clear();
                return history.push("/login");
            };

            setValue({
                client: client,
                token: user_token,
                user: user.data,
                state: "loged"
            });
            
            return;
          }

          splash()
    }, [])

    return (
        <ClientContext.Provider value={{ ...value, setValue }}>
            {children}
        </ClientContext.Provider>
    );
}

export default ClientProvider;