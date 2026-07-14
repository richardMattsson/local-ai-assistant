export const sendMessage = async (message: string): Promise<string> => {
  const response = await fetch("http://localhost:3001/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message }),
  });

  if (!response.ok) {
    throw new Error(
      "Something went wrong getting a response. Status: " + response.status,
    );
  }

  const { reply } = await response.json();
  return reply;
};
