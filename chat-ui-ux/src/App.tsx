import { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

function App() {
  /*let messages = [
    { user: "receiver", msg: "Hello! How can I help you today?" },
    { user: "sender", msg: "Hi! I need some assistance with my account."},
    { user: "receiver", msg: "Sure! What would you like help with?"},
  ];*/

  const [textinput, setTextInput] = useState("");

  const [messages, setMessages] = useState([{ user: "", msg: "" }]);

  const ws = useRef<WebSocket | null>(null);

  const handleclick = () => {
    let newmsg = { user: "sender", msg: textinput };
    setMessages([...messages, newmsg]);

    if (ws.current && textinput) {
      ws.current.send(textinput);
      setTextInput("");
    }

    

  };

  useEffect(() => {
    ws.current = new WebSocket("ws:127.0.0.1:8080/websocket-endpoint");

    ws.current.onopen = () => {
      console.log("connected");
    };

    const handleReceiveMessage = (event: MessageEvent) => {
      let newmsg = { user: "receiver", msg: "" + event.data };
      setMessages((prevMessages) => [...prevMessages, newmsg]);
    };

    ws.current.onmessage = handleReceiveMessage;

    return () => {
      ws.current?.close();
      ws.current = null;
    };

    /* ws.current.onmessage = (event) => {
      
      console.log(messages);
      let newmsg = { user: "receiver", msg: ""+event.data };
      setMessages((prevMessages) => [...prevMessages,newmsg]);
    
    }; */
  }, []);

  return (
    <>
      <div className="container d-flex flex-column justify-content-between border rounded mt-5 p-3">
        <center>
          <h5 className="card-title">Welcome to chat box</h5>
        </center>
        <div className="chat-box">
          <div className="d-flex flex-column align-items-start mb-2">
            {messages.map((message) => (
              <div className={"message-bubble " + message.user}>
                {message.msg}
              </div>
            ))}
          </div>
        </div>

        <div className="input-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message"
            onChange={(e) => setTextInput(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleclick}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
