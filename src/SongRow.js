import React from "react";
import "./SongRow.css";
import { useDataLayerValue } from "./DataLayer";

function SongRow({ track, idx }) {
  const trackLength = convertToMinutes(track);
  const index = idx + 1;

  console.log(track);

  const [state, dispatch] = useDataLayerValue();

  const clickHandler = () => {
    dispatch({
      type: "SET_SONG_INFO",
      item: {
        index: index,
        name: track.name,
        artist: track.artists,
        imageSrc: track.album.images[0].url,
        preview_url: track.preview_url,
      },
    });

    // let num = document.getElementById("num");
    // let num2 = document.getElementsByClassName("songRow");
    // let name = document.getElementById("name");

    // // Wont work for double digit numbers
    // if (idx === num2[idx].innerText.charAt(0)) {
    //   console.log("same");
    // }
    // num.innerHTML =
    //   "<img width='14' height='14' src='https://open.scdn.co/cdn/images/equaliser-animated-green.73b73928.gif' alt=''/>";
    // name.style.color = "#1ed15e";
    // console.log(num2[1].innerText.charAt(0));
    // console.log(idx);
    //
  };

  return (
    <div className="songRow" onClick={clickHandler}>
      <p id="num" className="songRow__number">
        {index}
      </p>
      <img
        className="songRow__albumImg"
        src={track.album.images[0].url}
        alt=""
      />
      <div className="songRow__info">
        <div className="songRow__nameAndArtist">
          <h1 id="name">{track.name}</h1>
          <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
        </div>
        <p className="songRow__album">{track.album.name}</p>
        <p className="songRow__trackLength">{trackLength}</p>
      </div>
    </div>
  );
}

function convertToMinutes(_track) {
  let minutes = (_track.duration_ms / 1000 / 60).toFixed(2);
  let seconds = (minutes - Math.floor(minutes)).toFixed(2);
  seconds = (seconds * 60).toFixed(0).toString();

  let finalLength = 0;

  if (seconds.length === 1) {
    finalLength = `${Math.floor(minutes)}:0${seconds}`;
  } else {
    finalLength = `${Math.floor(minutes)}:${seconds}`;
  }

  return finalLength;
}

export const songSelected = (e) => {
  console.log(e.currentTarget.children[1].firstChild.children[0].innerText);
  return e.currentTarget.children[1].firstChild.children[0].innerText;
};

export default SongRow;
