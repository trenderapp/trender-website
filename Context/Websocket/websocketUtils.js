import { useCallback, useEffect, useState } from 'react';
import { websocketurl } from '../../Services/constante';


export function useWebLocalsocket(onOpen, onMessage) {
  const [session, setSession] = useState(null);

  const updateOpenHandler = () => {
    if (!session) return;
    session.addEventListener('open', onOpen);
    return () => {
      session.removeEventListener('open', onOpen);
    };
  };

  const updateMessageHandler = () => {
    if (!session) return;
    session.addEventListener('message', onMessage);
    return () => {
      session.removeEventListener('message', onMessage);
    };
  };

  useEffect(updateOpenHandler, [session, onOpen]);
  useEffect(updateMessageHandler, [session, onMessage]);

  const connect = useCallback(() => {
      const ws = new WebSocket(websocketurl);
      setSession(ws);
    },[]);

  const sendMessage = (data) => {
    session.send(JSON.stringify(data));
  };

  const close = useCallback(() => {
    if (session.readyState === session.OPEN) session.close(1001);
  }, [session]);

  return [connect, sendMessage, close];
}