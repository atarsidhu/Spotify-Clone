import { Avatar } from "@material-ui/core";
import React from "react";
import { useDataLayerValue } from "./DataLayer";
import "./Search.css";
import SongRow from "./SongRow";

function Search() {
  const [{ searchInfo }] = useDataLayerValue();

  return (
    <div className="search">
      <div className="search__left">
        <div className="artist">
          <h1>Artists</h1>
          <div className="artist__info">
            {searchInfo?.artists?.items?.slice(0, 10).map((item) => (
              <div className="artist__each">
                <div className="artist__img">
                  {item?.images[0]?.url ? (
                    <img
                      src={item?.images[0]?.url}
                      alt=""
                      className="artistImg"
                    />
                  ) : (
                    <Avatar className="artistImg" />
                  )}
                </div>
                <div className="artist__name">
                  <h4>{item?.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="album">
          <h1>Albums</h1>
          <div className="artist__info">
            {searchInfo?.albums?.items?.slice(0, 10).map((item) => (
              <div className="artist__each">
                <div className="artist__img">
                  {item?.images[0]?.url ? (
                    <img
                      src={item?.images[0]?.url}
                      alt=""
                      className="albumImg"
                    />
                  ) : (
                    <Avatar className="artistImg" />
                  )}
                </div>
                <div className="album__name">
                  <h4 className="albumName">{item?.name}</h4>
                  <p className="album__artist">
                    {item?.artists?.map((el) => el.name).join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="playlist">
          <h1>Playlists</h1>
          <div className="artist__info">
            {searchInfo?.playlists?.items?.slice(0, 10).map((item) => (
              <div className="artist__each">
                <div className="artist__img">
                  {item?.images[0]?.url ? (
                    <img
                      src={item?.images[0]?.url}
                      alt=""
                      className="albumImg"
                    />
                  ) : (
                    <Avatar className="albumImg" />
                  )}
                </div>
                <div className="album__name">
                  <h4 className="albumName">{item?.name}</h4>
                  <p className="album__artist">
                    {item?.artists?.map((el) => el.name).join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="search__right">
        <div className="songs">
          <h1 className="song__title">Songs</h1>
          {searchInfo?.tracks?.items?.map((item, index) => (
            <SongRow key={index} track={item} idx={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
