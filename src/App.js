import { decode as b64Decode } from "base-64";
import "bootstrap/dist/css/bootstrap.css";
import { useRef, useState } from "react";
import Button from "./components/Button";
import imageload from "./loading.gif";

export default function App() {
  const [pd, setPD] = useState(true);
  const [wm, setWM] = useState(true);
  const [pj, setPJ] = useState(true);
  const [tl, setTL] = useState(true);
  const [userIn, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [ci, setCI] = useState(false);

  //setResponse("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");

  const handleChat = async (e, b) => {
    e.preventDefault();
    setLoading(true);
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: b64Decode(
        "c2stRTdDb2RHbm5oWUpZanpSSnNCOTBUM0JsYmtGSkliN1JaOW15aGg4SFp0ZlBUMFZi"
      )
    });

    const openai = new OpenAIApi(configuration);
    //async () => {
    const output = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: e.target.value + " " + userIn,
      temperature: 0,
      max_tokens: 900
    });
    //console.log(output.data.choices[0].text);
    setResponse(
      (response === "" ? userIn : response) +
        "\n\n" +
        output.data.choices[0].text
    );
    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center">
        <h1 className="display-5">AI Pocket Helper</h1>
      </div>
      <img
        src={imageload}
        className={"img-fluid rounded " + (loading ? "" : "d-none")}
        alt="Loading Image"
      />
      <div className={loading ? "d-none " : ""}>
        <div>{userIn}</div>
        <div>
          <textarea
            className="form-control"
            cols="80"
            rows="15"
            value={response}
            disabled
          />
        </div>
        <br />
        <input
          className="form-control"
          placeholder="Write what you want"
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
        <div className="row mt-3">
          <button
            className="btn"
            onClick={() => {
              setWM(wm ? false : true);
            }}
          >
            {wm ? "Open Writing Tools" : "Close Writing Tools"}
          </button>

          <div className={"d-grid col-6 gap-2 " + (wm ? "d-none" : "")}>
            <Button
              color="success"
              action={handleChat}
              value="Explain"
              btnName="Explain"
            />
            <Button
              color="warning"
              action={handleChat}
              value="Act as a human search engine and tell in details Who is "
              btnName="Who is"
            />

            <Button
              color="info"
              action={handleChat}
              value="Create a new article about "
              btnName="News article"
            />
          </div>
          <div className={"d-grid col-6 gap-2 " + (wm ? "d-none" : "")}>
            <button
              className="btn btn-primary"
              onClick={handleChat}
              value="act as a university student and write a detailed paper with APA citetion include in-text citetion and references  on "
            >
              Essay
            </button>
            <button
              className="btn btn-danger"
              onClick={handleChat}
              value="Generate a detailed List with key points about "
            >
              Get a list
            </button>

            <button
              className="btn btn-success"
              onClick={handleChat}
              value="Define what is "
            >
              Define
            </button>
          </div>
        </div>

        <div className="row mt-2">
          {
            //Product based tools
          }
          <button
            className="btn"
            onClick={(e) => {
              setPD(pd ? false : true);
            }}
          >
            {pd ? "Open Product Development" : "Close Product Development"}
          </button>

          <div className={"d-grid col-6 " + (pd ? "d-none" : "")}>
            <button
              className="btn btn-danger"
              onClick={handleChat}
              value="Act as a product development specialist and Generate a product description "
            >
              Product Description
            </button>
          </div>

          <div className={" d-grid col-6 " + (pd ? "d-none" : "")}>
            <button
              className="btn btn-warning"
              onClick={handleChat}
              value="Act as a branding specialist and Generate catchy Product titles for "
            >
              Product Title
            </button>
          </div>

          {
            //Project Description
          }
          <>
            <button className="btn" onClick={() => setPJ(pj ? false : true)}>
              {pj ? "Open Project Development" : "Close Project Development"}
            </button>
            <div className={" d-grid col-6 mt-2 " + (pj ? "d-none" : "")}>
              <button
                className="btn btn-warning"
                onClick={handleChat}
                value="Act as a project development specialist and Generate a project description with mission, vision, value and description "
              >
                Project Description
              </button>
            </div>

            <div className={" d-grid col-6 mt-2 " + (pj ? "d-none" : "")}>
              <button
                className="btn btn-info"
                onClick={handleChat}
                value="Act as a project development specialist and Generate a project Outline with  project title, project objective, project timeline for "
              >
                Project Outline
              </button>
            </div>
          </>
          {
            //Language Translation
          }
          <button className="btn" onClick={() => setTL(tl ? false : true)}>
            {tl ? "Open Translating Tool" : "Close Translating Tool"}
          </button>
          <div className={" d-grid col-6 mt-2 " + (tl ? "d-none" : "")}>
            <button
              className="btn btn-primary"
              onClick={handleChat}
              value="Translate to Persian "
            >
              To Persian
            </button>
          </div>

          <div className={" d-grid col-6 mt-2 " + (tl ? "d-none" : "")}>
            <button
              className="btn btn-danger"
              onClick={handleChat}
              value="Translate to Swahili "
            >
              To swahili
            </button>
          </div>

          {
            //Clear
          }

          <div className=" d-grid gap-2 mt-2">
            <button
              className={"btn btn-secondary ms-1 " + (ci ? "" : "d-none")}
              onClick={handleChat}
              value=""
            >
              Custom Input
            </button>

            <button
              className="btn btn-outline-success ms-1 ps-5 pe-5"
              onClick={() => {
                setResponse("");
                setUserInput("");
              }}
              onDoubleClick={() => {
                setCI(ci ? false : true);
              }}
            >
              Clean
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
