import React, { useEffect } from "react";
import "./Body.css";
import { useDataLayerValue } from "./DataLayer";
import Header from "./Header";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./SongRow";
import Search from "./Search";

function Body({ spotify }) {
  const [{ topSongs, searchInfo }] = useDataLayerValue();

  let currentPlaylist = topSongs;
  console.log(searchInfo);

  return (
    <div className="body">
      <Header spotify={spotify} />

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
            <div className="body__icons">
              <div className="white-background">
                <PlayCircleFilledIcon className="body__play" />
              </div>
              <FavoriteBorderIcon fontSize="large" />
              <MoreHorizIcon />
            </div>
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
        <Search />
      )}
    </div>
  );
}

export default Body;
