import * as React from 'react';
import { initialWebSocketState } from './reducer';

const webSocketContext = React.createContext({
    state: initialWebSocketState,
    dispatch: () => {},
    sendMessage: () => {}
});

webSocketContext.displayName = 'webSocketContext';

export default webSocketContext;