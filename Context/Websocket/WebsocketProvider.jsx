import { useEffect, useReducer } from "react";
import useClient from "../Client/useClient";
import { useConnectionCallback, useMessageCallback } from "./eventHandlers";
import { initialWebSocketState, reducer } from "./reducer";
import { useWebLocalsocket } from "./websocketUtils";
import WebSocketContext from "./webSocketContext";

const WebSocketContextProvider = ({ children }) => {
    const client = useClient()
    const [state, dispatch] = useReducer(reducer, initialWebSocketState);

    const onOpen = useConnectionCallback();
    const onMessage = useMessageCallback(dispatch);
    const [connect, sendMessage] = useWebLocalsocket(onOpen,onMessage);

    useEffect(() => {
        if(client.state === "loged") {
            connect()
        }
    }, [client.state])

    useEffect(() => {
        if(state.code === 0) return sendMessage({
            code: 1,
            token: client.token
        })
    }, [state])

    return <WebSocketContext.Provider value={{state, sendMessage, dispatch}}>{children}</WebSocketContext.Provider>
}

export default WebSocketContextProvider;