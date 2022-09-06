import React from 'react'

export const WebsocketContext = React.createContext();
export const UserContext = React.createContext();
export const LanguageContext = React.createContext();

export const WebsocketProvider = WebsocketContext.Provider;
export const UserProvider = UserContext.Provider;
export const LanguageProvider = LanguageContext.Provider;

export default WebsocketProvider