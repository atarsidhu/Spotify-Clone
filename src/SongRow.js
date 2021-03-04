import React from "react";
import "./SongRow.css";
import { useDataLayerValue } from "./DataLayer";

let songRow_number = 0;

function SongRow({ track, idx }) {
  const trackLength = convertToMinutes(track);

  const [state, dispatch] = useDataLayerValue();

  const addToDataLayer = () => {
    // track.artists.forEach(item => {

    // })
    dispatch({
      type: "SET_SONG_INFO",
      item: {
        name: track.name,
        artist: track.artists,
        imageSrc: track.album.images[0].url,
      },
    });
  };

  return (
    // <div className="songRow" onClick={(e) => songSelected(e)}>
    <div className="songRow" onClick={addToDataLayer}>
      <p className="songRow__number">{idx + 1}</p>
      <img
        className="songRow__albumImg"
        src={track.album.images[0].url}
        alt=""
      />
      <div className="songRow__info">
        <div className="songRow__nameAndArtist">
          <h1>{track.name}</h1>
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
