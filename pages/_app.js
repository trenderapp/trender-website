import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";

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
import { LanguageProvider } from "../Context/Localization";
import ClientProvider from "../Context/Client/ClientProvider";
import { useClient } from "../Context";

function MyApp({ Component, pageProps }) {

  const [theme, setTheme] = useState("theme-dark-blue");
  const [alert, setAlert] = useState({
    display: false,
    type: "",
    message: ""
  })
  const { state } = useClient();

  useEffect(() => {

    setTheme(localStorage.getItem("theme") ?? "theme-dark-blue");
    

  }, [state])

  return (
    <ThemeContextProvider value={{ theme, setTheme }}>
      <AlertContextProvider value={{ alert, setAlert }}>
        <ClientProvider>
            <LanguageProvider>
              <Helmet bodyAttributes={{
                    class: theme
                }} />
                <div>
                  <Alert />
                  <Component {...pageProps} />
                </div>
            </LanguageProvider>
        </ClientProvider>
      </AlertContextProvider>
    </ThemeContextProvider>
  )
}

export default MyApp
