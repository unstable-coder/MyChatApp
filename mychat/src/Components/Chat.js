import React, { useEffect, useState , useRef} from "react";
import { user } from "./Join";
import "./chat.css";
import socketIO, { Socket } from "socket.io-client";
import Message from "./Message";
let ENDPOINT = "http://localhost:4500";
let socket;
const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);
  const chatboxRef = useRef(null);

  const scrollToBottom = () => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  };

  const sendMessage = () => {
    const message = document.getElementById("sendchat").value;
    socket.emit("message", { message, id });
    document.getElementById("sendchat").value = "";
  };

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      setid(socket.id);
    });
    console.log(socket);
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("userjoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendmessage", (data) => {
      setMessages([...messages, data]);
    });
    scrollToBottom();
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatpage">
      <div className="chatcontainer">
        <div className="header">
          <h1>MYCHAT</h1>
          <a href="/">
            <button>Leave</button>
          </a>
        </div>
        <div className="chatbox" ref={chatboxRef}>
          {messages.map((item, i) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </div>
        <div className="inputBox">
          <input
            onKeyDown={(e) => (e.key === "Enter" ? sendMessage() : null)}
            type="text"
            placeholder="send message"
            id="sendchat"
          ></input>
          <button onClick={sendMessage} className="chatbtn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
