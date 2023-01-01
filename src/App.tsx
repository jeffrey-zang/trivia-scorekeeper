import React, { useState, useEffect } from "react";
import Team from "./Team";
import Timer from "./Timer";
import Help from "./Help";
import { useShortcutEventListener } from "./utils";

import { BsArrowDown } from "react-icons/bs";

function App() {
  const [theme, setTheme] = useState<string>("orphans");
  const [themeAmount, setThemeAmount] = useState<string>("4");
  const [showTheme, setShowTheme] = useState<boolean>(false);

  const eventListener = useShortcutEventListener("t", [showTheme], () => {
    setShowTheme(!showTheme);
  });

  useEffect(() => {
    document.addEventListener("keydown", eventListener);

    return () => {
      document.removeEventListener("keydown", eventListener);
    };
  }, [eventListener]);

  return (
    <div
      className="App"
    >
      <h1>Trivia Scoreboard</h1>

      <Timer />
      <div id="wrapper">
        <Team teamNumber={1} />
        <Team teamNumber={2} />
      </div>
      <div id="theme" style={{ display: showTheme ? "block" : "none" }}>
        <h1>
          <button
            onClick={(e) => {
              var amount = Number(themeAmount);
              let newamount = amount - 1;
              setThemeAmount(newamount.toString());
            }}
          >
            <BsArrowDown />
          </button>
          The next{" "}
          <input
            value={themeAmount}
            onChange={(e) => setThemeAmount(e.target.value)}
            className="themeinput"
          />
          <br />
          questions deal with
          <br />
          <input
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="themeinput"
          />
        </h1>
      </div>
      <Help />
    </div>
  );
}

export default App;
