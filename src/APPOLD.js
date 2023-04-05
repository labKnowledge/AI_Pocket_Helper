import "./styles.css";
import { useRef, useState } from "react";
import axios from "axios";

export default function App() {
  const [userIn, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  //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

  //setResponse(responsed);
  //setResponse(await openai.listEngines());

  const handleChat = (e) => {
    e.preventDefault();

    /***
     * 'curl https://api.openai.com/v1/completions -H "Content-Type: application/json" -H "Authorization: Bearer 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" -d ' +
          '{ "model": "text-davinci-003","prompt": ' +
          userIn +
          ',"max_tokens": 7,"temperature": 0}'
     */
    //send a request to the server with the prompt
    axios
      .post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt: { userIn },
          temperature: 0,
          max_tokens: 60,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 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"
          }
        }
      )
      .then((res) => {
        console.log(res);
        setResponse("Change: " + res.data); //res.data);
      })
      .catch((err) => {
        setResponse("Change: " + err);
        console.log(err);
      });
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
