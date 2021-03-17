import { Avatar } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDataLayerValue } from "./DataLayer";
import "./Search.css";
import SongRow from "./SongRow";

let whatWasClicked = "";

function Search({ spotify }) {
  const [
    { searchInfo, selectedArtistTracks, selectedAlbumTracks },
    dispatch,
  ] = useDataLayerValue();

  let songHeading = document.getElementById("song__heading");

  // When user changes search, reset everything
  useEffect(() => {
    dispatch({
      type: "SET_SELECTED_ARTIST_TRACKS",
      selectedArtistTracks: "",
    });

    dispatch({
      type: "SET_SELECTED_ALBUM_TRACKS",
      selectedAlbumTracks: "",
    });

    whatWasClicked = "";

    if (songHeading !== null) {
      songHeading.innerText = "Songs";
    }
  }, [searchInfo]);

  // Set the top tracks for the selected artist
  function artistClick(artistId) {
    whatWasClicked = "artist";

    spotify.getArtist(artistId).then((artist) => {
      songHeading.innerText = `Top Songs By ${artist.name}`;
    });

    spotify.getArtistTopTracks(artistId, "US").then((tracks) => {
      dispatch({
        type: "SET_SELECTED_ARTIST_TRACKS",
        selectedArtistTracks: tracks,
      });
    });
  }

  // Set the tracks for the selected album
  function albumClick(albumId, albumImg) {
    whatWasClicked = "album";

    spotify.getAlbumTracks(albumId).then((album) => {
      dispatch({
        type: "SET_SELECTED_ALBUM_TRACKS",
        selectedAlbumTracks: album,
        selectedAlbumImage: albumImg,
      });

      spotify.getAlbum(albumId).then((album) => {
        songHeading.innerText = album.name;
      });
    });
  }

  return (
    <div className="search">
      <div className="search__left">
        <div className="artist">
          <h1>Artists</h1>
          <div className="artist__info">
            {searchInfo?.artists?.items?.slice(0, 10).map((item) => (
              <div
                className="artist__each"
                onClick={() => artistClick(item.id)}
              >
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
          <h1 id="album__heading">Albums</h1>
          <div className="artist__info">
            {searchInfo?.albums?.items?.slice(0, 10).map((item) => (
              <div
                className="artist__each"
                onClick={() => albumClick(item?.id, item?.images[0]?.url)}
              >
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
      </div>

      <div className="search__right">
        <div className="songs">
          <h1 id="song__heading" className="song__title">
            Songs
          </h1>
          <div className="song__tracks">
            {/* If selectedArtistTracks OR selectedAlbumTracks is empty, 
          load general searchInfo else load artistTracks or albumTracks */}
            {(typeof selectedArtistTracks === "undefined" ||
              selectedArtistTracks === "") &&
            (typeof selectedAlbumTracks === "undefined" ||
              selectedAlbumTracks === "")
              ? searchInfo?.tracks?.items?.map((item, index) => (
                  <SongRow key={index} track={item} idx={index} />
                ))
              : whatWasClicked === "artist"
              ? selectedArtistTracks?.tracks?.map((item, index) => (
                  <SongRow key={index} track={item} idx={index} />
                ))
              : selectedAlbumTracks?.items?.map((item, index) => (
                  <SongRow key={index} track={item} idx={index} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
