import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [account, setAccount] = useState("");
  const [meta, setMeta] = useState(false);

  const enableMeta = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    const truncatedAccnt1 = account.substring(0, 5);
    const truncatedAccnt2 = account.substring(0, 10);
    setAccount(truncatedAccnt2);
    setUserName(truncatedAccnt1);
    setMeta(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", { userName, socketID: socket.id });
    navigate("/chat");
  };
  return (
    <div>
      <form className="connect_container">
        {meta ? (
          <button className="connect-button">
            <img className="logo" src="./metamask.svg" alt="" /> {account}
          </button>
        ) : (
          <button className="connect-button" onClick={enableMeta}>
            <img className="logo" src="./metamask.svg" alt="" /> Connect Wallet
          </button>
        )}
      </form>
      <form className="home__container" onSubmit={handleSubmit}>
        <h2 className="home__header">Sign in to Meta Chat</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          minLength={6}
          name="username"
          id="username"
          className="username__input"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button className="home__cta enableEthereumButton">SIGN IN</button>
      </form>
    </div>
  );
};

export default Home;
