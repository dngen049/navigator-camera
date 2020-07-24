import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const constraint = {
    video: { width: 1280, height: 720 },
    audio: false,
  };
  navigator.permissions.query({ name: "camera" }).then((result) => {
    if (result.state === "granted") {
      alert("Permission granted");
    }
    if (result.state === "prompt") {
      navigator.getUserMedia(
        constraint,
        () => {
          alert("Success");
        },
        (e) => {
          alert("error", e);
        }
      );
    }
    if (result.state === "denied") {
      alert("Permissions denied");
    }
  });
  return <div className="App">Welcome to my deploy</div>;
}

export default App;
