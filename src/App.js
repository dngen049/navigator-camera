import React from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const checkPermission = () => {
    console.log("clicked");
    const constraint = {
      video: { width: 1280, height: 720 },
      audio: false,
    };
    if (!!navigator.permissions) {
      navigator.permissions.query({ name: "camera" }).then((result) => {
        if (result.state === "granted") {
          alert("Permission granted");
        }
        if (result.state === "prompt") {
          if (!!navigator.getUserMedia) {
            navigator.getUserMedia(
              constraint,
              () => {
                alert("Success");
              },
              (e) => {
                alert("error", e);
              }
            );
          } else {
            alert("getUserMedia not supported in this browser");
          }
        }
        if (result.state === "denied") {
          alert("Permissions denied");
        }
      });
    } else {
      alert("navigator.permissions not supported in this browser");
    }
  };
  return (
    <div className="App">
      Welcome to my deploy
      <br />
      <input type="file" accept="image/*"></input>
      <br />
      <button onClick={checkPermission}>
        Check if permission is supported
      </button>
    </div>
  );
};

export default App;
