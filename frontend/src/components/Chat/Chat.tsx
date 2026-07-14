import { useState } from "react";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { sendMessage } from "./chatService";

type Role = "user" | "assistant";
type ChatMessage = { id: string; role: Role; content: string };

function Chat() {
  const [input, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    function _setMessages(role: Role, content: string) {
      setMessages((prev) => [...prev, { id: uuidv4(), role, content }]);
    }

    _setMessages("user", input);

    setMessage("");

    setLoading(true);

    try {
      const reply = await sendMessage(input);
      _setMessages("assistant", reply);
    } catch (error) {
      _setMessages("assistant", "Response " + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Local AI Assistant</h1>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={(event) => setMessage(event.target.value)}
          value={input}
        />
        <input type="submit" value="Send" />
      </form>
      {messages.length < 1 && <p>(No messages yet)</p>}
      {messages.length > 0 && (
        <ul>
          {messages.map((message) => (
            <React.Fragment key={message.id}>
              <li style={{ listStyle: "none", fontWeight: "bold" }}>
                {message.role}:
              </li>
              <li style={{ listStyle: "none" }}>{message.content}</li>
            </React.Fragment>
          ))}
        </ul>
      )}
      {loading && <p>Loading answer...</p>}
    </>
  );
}

export default Chat;
