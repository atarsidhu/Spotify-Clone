import React, { useEffect } from "react";
import "./Body.css";
import { useDataLayerValue } from "./DataLayer";
import Header from "./Header";
import SongRow from "./SongRow";
import Search from "./Search";

function Body({ spotify }) {
  const [{ topSongs, searchInfo }, dispatch] = useDataLayerValue();

  let currentPlaylist = topSongs;

  // If user clicks playlist while in Search component, show clicked playlist
  useEffect(() => {
    dispatch({
      type: "SET_SEARCH",
      searchInfo: "none",
    });
  }, [currentPlaylist]);

  return (
    <div className="body">
      <Header spotify={spotify} />

      {/* If user is searching, show Search component. Else, show home */}
      {typeof searchInfo === "undefined" || searchInfo === "none" ? (
        <div>
          <div className="body__info">
            <img src={currentPlaylist?.images[0].url} alt="" />
            <div className="body__infoText">
              <strong>PLAYLIST</strong>
              <h2>{currentPlaylist?.name}</h2>
              <p>{currentPlaylist?.description}</p>
            </div>
          </div>

          <div className="body__songs">
            <div className="body__rowTitles">
              <p className="body__number">#</p>
              <p className="body__rowName">TITLE</p>
              <p className="body__rowAlbum">ALBUM</p>
              <p className="body__rowLength">LENGTH</p>
            </div>
            <div className="hr">
              <hr className="body__rowHr" />
            </div>
            {currentPlaylist?.tracks.items.map((item, index) => (
              <SongRow key={index} track={item.track} idx={index} />
            ))}
          </div>
        </div>
      ) : (
        <Search spotify={spotify} />
      )}
    </div>
  );
}

export default Body;
