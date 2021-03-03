import React from "react";
import "./SongRow.css";

function SongRow({ track }) {
  const trackLength = convertToMinutes(track);
  //   const [name, setName] = useState("Test");

  return (
    <div className="songRow" onClick={(e) => songSelected(e)}>
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
  let trackLength = (_track.duration_ms / 1000 / 60).toFixed(2).toString();

  let formatted = `${trackLength[0]}:${trackLength[2]}${trackLength[3]}`;

  return formatted;
}

export const songSelected = (e) => {
  //   e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.8)";
  //   console.log(e.currentTarget.getAttribute("class"));
  //   console.log(e.currentTarget.parentElement);

  console.log(e.currentTarget.children[1].firstChild.children[0].innerText);
  return e.currentTarget.children[1].firstChild.children[0].innerText;
};

export default SongRow;
