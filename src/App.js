import "./App.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import { sendMsgToGenAi } from "./gemini";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };

    setChats((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMsgToGenAi(input);
      const botMsg = { sender: "bot", text: res };
      setChats((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = { sender: "bot", text: "Błąd: nie udało się uzyskać odpowiedzi od AI." };
      setChats((prev) => [...prev, errorMsg]);
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img className="logo" src={gptLogo} alt="Logo" />
            <span className="brand">Jawor GPT</span>
          </div>
          <button className="midBtn" onClick={() => setChats([])}>
            <img src={addBtn} alt="new chat" className="addBtn" />
            Nowy Chat
          </button>
          <div className="upperSideBottom">
            <button className="query" onClick={() => setInput("Co to programowanie?")}>
              <img src={msgIcon} alt="query" />
              Co to programowanie?
            </button>
            <button className="query" onClick={() => setInput("Jak używać API?")}>
              <img src={msgIcon} alt="query" />
              Jak używać API?
            </button>
          </div>
        </div>
        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="home" className="listitemsImg" />
            Home
          </div>
          <div className="listItems">
            <img src={saved} alt="saved" className="listitemsImg" />
            Zapisane
          </div>
          <div className="listItems">
            <img src={rocket} alt="upgrade" className="listitemsImg" />
            Upgrade to Pro
          </div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          {chats.map((chat, index) => (
            <div
              key={index}
              className={`chat ${chat.sender === "bot" ? "bot" : ""}`}
            >
              <img
                className="chatimg"
                src={chat.sender === "bot" ? gptImgLogo : userIcon}
                alt={chat.sender}
              />
              <p className="txt">{chat.text}</p>
            </div>
          ))}

          {loading && (
            <div className="chat bot">
              <img className="chatimg" src={gptImgLogo} alt="loading" />
              <p className="txt">Piszę odpowiedź...</p>
            </div>
          )}
        </div>

        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Wyślij wiadomość..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="send" onClick={handleSend} disabled={loading}>
              <img src={sendBtn} alt="send" />
            </button>
          </div>
          <p>Nie wierz AI w 100%</p>
        </div>
      </div>
    </div>
  );
}

export default App;
