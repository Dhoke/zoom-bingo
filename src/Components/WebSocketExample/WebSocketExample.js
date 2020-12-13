import React, {useState, useEffect} from 'react'
import socketIOClient from "socket.io-client"

const ENDPOINT = "http://127.0.0.1:4001"

const WebSocketExample = () => {

    const [response, setResponse] = useState("")

    useEffect(() => {
        console.log("I am running!")
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
          setResponse(data);
        })
        return () => socket.disconnect()
      }, []);

    return (
        <div>
            It's <time dateTime={response}>{response}</time>
         </div>
    )
}

export default WebSocketExample