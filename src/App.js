import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [dis, setDis] = useState(true);
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
  const getCamera = () => {
    const constraint = {
      video: true,
      audio: false,
    };
    const video = document.getElementById("video");

    if (!!navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia(constraint)
        .then((stream) => {
          video.srcObject = stream;
          setDis(false);
        })
        .catch((e) => {
          alert("error with camera");
        });
    } else {
      alert("mediaDevices not supported in this browser");
    }
  };
  const takePic = () => {
    const canvas = document.getElementById("c");
    const video = document.getElementById("video");
    canvas.getContext("2d").drawImage(video, 0, 0, 300, 300);
    video.srcObject.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
    setDis(true);
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
      <br />
      <button onClick={getCamera}>Get camera access</button>
      <video id="video" autoPlay width="300" height="300">
        video stream NA
      </video>
      <input
        onClick={takePic}
        id="b"
        type="button"
        disabled={dis}
        value="Take picture"
      ></input>
      <canvas id="c" width="300" height="300"></canvas>
    </div>
  );
};

export default App;
