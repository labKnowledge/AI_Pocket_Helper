import "./styles.css";
import { useRef, useState } from "react";

export default function App() {
  const [userIn, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  //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
  //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

  //setResponse(responsed);
  //setResponse(await openai.listEngines());

  const handleChat = (e) => {
    e.preventDefault();

    const OpenAI = require("openai-api");
    const openai = new OpenAI(
      "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"
    );

    (async () => {
      const gptResponse = await openai.complete({
        engine: "davinci",
        prompt: userIn,
        maxTokens: 30,
        temperature: 0.3,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        // bestOf: 1,
        // n: 1,
        stream: false
        // stop: ["\n", "testing"]
      });

      setResponse(gptResponse.data.choices[0].text);
      console.log(gptResponse.data.choices[0].text);
    })();
  };

  return (
    <div className="App">
      <div>Home </div>
      <div>
        {" "}
        <input
          placeholder="Write Message"
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />{" "}
      </div>
      <div>
        <p>{response}</p>
      </div>
      <button onClick={handleChat}>Chat</button>
    </div>
  );
}
