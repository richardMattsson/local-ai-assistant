export async function chat(model: string, messages: LlmMessage[]) {
  const response = await fetch("http://localhost:1234/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
    }),
  });
  const json = await response.json();
  return json.choices[0].message.content;
}
