import { useEffect, useState } from "react";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { sendMessage } from "./chatService";
import type { ChatMessage, Role } from "../../../../shared/types/chat";

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  function addMessage(role: Omit<Role, "system">, content: string) {
    setMessages((prev) => [...prev, { id: uuidv4(), role, content }]);
  }

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    const userMessage = {
      id: uuidv4(),
      role: "user",
      content: input,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);

    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessage(
        updatedMessages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
      );
      addMessage("assistant", reply);
    } catch (error) {
      if (error instanceof Error) {
        addMessage("assistant", error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        style={{
          margin: "50px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
        }}
      >
        {messages.length > 0 && (
          <ul
            style={{ paddingLeft: 0, display: "flex", flexDirection: "column" }}
          >
            {messages.map((message) => (
              <React.Fragment key={message.id}>
                <li
                  style={{
                    listStyle: "none",
                    fontWeight: "bold",
                    padding: "10px",
                    alignSelf: message.role === "user" ? "start" : "end",
                  }}
                >
                  {message.role.toLocaleUpperCase()}
                </li>
                <li
                  style={{
                    listStyle: "none",
                    alignSelf: message.role === "user" ? "start" : "end",
                    textAlign: "left",
                    backgroundColor: "#222121",
                    borderRadius: "5px",
                    border:
                      message.role === "user"
                        ? "1px solid #024b8f"
                        : "1px solid #830404",
                    padding: "10px",
                    width: "80%",
                  }}
                >
                  {message.content}
                </li>
              </React.Fragment>
            ))}
          </ul>
        )}
        {loading && <p style={{ textAlign: "right" }}>Thinking...</p>}
        <form onSubmit={onSubmit} style={{ display: "flex", gap: "10px" }}>
          <input
            style={{ flexGrow: 1, padding: "5px" }}
            type="text"
            onChange={(event) => setInput(event.target.value)}
            value={input}
          />
          <input style={{ padding: "5px" }} type="submit" value="Send" />
        </form>
      </div>
    </>
  );
}

export default Chat;
