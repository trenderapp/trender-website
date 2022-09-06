import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import { UserProvider } from "../Context/AppContext";

import "../Style/error.scss";
import "../Style/style.scss";
import "../Style/loader.scss";
import "../Style/alert.scss";
import "../Style/hljs/hljs.scss";
import "../Style/presentation.scss";
import "../Style/global.scss";
import "../Style/variables.scss";

import { AlertContextProvider } from "../Context/AlertContext";
import ThemeContextProvider from "../Context/ThemeContext";
import Alert from "../Components/Others/Alert/Alert";
import client, { user_token } from "../Services/client";
import { LanguageProvider } from "../Context/Localization";

function MyApp({ Component, pageProps }) {

  const [theme, setTheme] = useState("theme-dark-blue");
  const [alert, setAlert] = useState({
    display: false,
    type: "",
    message: ""
  })
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    async function getUserInformations() {
      
      if(user_token) {
        const informations = await client.informations();
        if(informations.error) return;
        return setUser(informations.data)
      }
    }

    getUserInformations();
    setTheme(localStorage.getItem("theme") ?? "theme-dark-blue");
    

  }, [])

  return (
    <ThemeContextProvider value={{ theme, setTheme }}>
      <AlertContextProvider value={{ alert, setAlert }}>
        <UserProvider value={{user, setUser}}>
          <LanguageProvider>
            <Helmet bodyAttributes={{
                  class: theme
              }} />
              <div>
                <Alert />
                <Component {...pageProps} />
              </div>
          </LanguageProvider>
        </UserProvider>
      </AlertContextProvider>
    </ThemeContextProvider>
  )
}

export default MyApp
