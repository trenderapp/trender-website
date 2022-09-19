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
import { WebSocketProvider } from "../Context";

function MyApp({ Component, pageProps }) {

  const [theme, setTheme] = useState("theme-dark-blue");
  const [alert, setAlert] = useState({
    display: false,
    type: "",
    message: ""
  })

  useEffect(() => {

    setTheme(localStorage.getItem("theme") ?? "theme-dark-blue");
    
  }, [])

  return (
    <ThemeContextProvider value={{ theme, setTheme }}>
      <AlertContextProvider value={{ alert, setAlert }}>
        <ClientProvider>
          <WebSocketProvider>
            <LanguageProvider>
              <Helmet bodyAttributes={{
                    class: theme
                }} />
                  <Alert />
                  <Component {...pageProps} />
            </LanguageProvider>
          </WebSocketProvider>
        </ClientProvider>
      </AlertContextProvider>
    </ThemeContextProvider>
  )
}

export default MyApp
