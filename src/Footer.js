import React, { useEffect } from "react";
import "./Footer.css";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import { Grid, Slider } from "@material-ui/core";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import { useDataLayerValue } from "./DataLayer";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function Footer() {
  const [{ songInfo, topSongs }] = useDataLayerValue();
  let listOfSongs = topSongs;

  const playButton = document.getElementById("play");
  const pauseButton = document.getElementById("pause");
  const audioPlayer = document.getElementById("player");
  let songImg = document.getElementById("songImg");
  let songName = document.getElementById("songName");
  let songArtist = document.getElementById("songArtist");
  const iconNext = document.getElementById("iconNext");
  const iconPrev = document.getElementById("iconPrev");
  const iconShuffle = document.getElementById("iconShuffle");
  const iconRepeat = document.getElementById("iconRepeat");

  let currentSongIndex = songInfo.index - 1;

  useEffect(() => {
    const audioPlayer = document.getElementById("player");
    audioPlayer.load();
    playSong();
  }, [songInfo.name]);

  function playSong() {
    const audioPlayer = document.getElementById("player");
    const playButton = document.getElementById("play");
    const pauseButton = document.getElementById("pause");
    audioPlayer.play();
    playButton.style.display = "none";
    pauseButton.style.display = "block";
  }

  function pauseSong() {
    audioPlayer.pause();
    pauseButton.style.display = "none";
    playButton.style.display = "block";
  }

  function nextSong() {
    // If the song isnt the last song in the playlist
    if (currentSongIndex < listOfSongs.tracks.items.length - 1) {
      // Get random song
      if (isShuffleOn()) {
        let prevValue = currentSongIndex;
        currentSongIndex = randomNumber(listOfSongs.tracks.items.length - 2);

        // Ensure the same song is not played
        if (prevValue === currentSongIndex) {
          while (prevValue === currentSongIndex - 1) {
            currentSongIndex = randomNumber(
              listOfSongs.tracks.items.length - 2
            );
            console.log("new: " + currentSongIndex);
          }
        }
      }

      const currentTrack = listOfSongs.tracks.items[++currentSongIndex];

      audioPlayer.src = currentTrack.track.preview_url;
      audioPlayer.load();
      playSong();

      songImg.src = currentTrack.track.album.images[0].url;
      songName.innerHTML = currentTrack.track.name;
      songArtist.innerHTML = currentTrack.track.artists
        .map((artist) => artist.name)
        .join(", ");

      if (currentSongIndex > 0) {
        iconPrev.style.color = "white";
      }

      if (!isShuffleOn()) {
        if (currentSongIndex == listOfSongs.tracks.items.length - 1) {
          iconNext.style.color = "grey";
        }
      }
    }
  }

  function prevSong() {
    // If the song isnt the first song in the playlist
    if (currentSongIndex != 0) {
      const currentTrack = listOfSongs.tracks.items[--currentSongIndex];

      audioPlayer.src = currentTrack.track.preview_url;
      audioPlayer.load();
      playSong();

      songImg.src = currentTrack.track.album.images[0].url;
      songName.innerHTML = currentTrack.track.name;
      songArtist.innerHTML = currentTrack.track.artists
        .map((artist) => artist.name)
        .join(", ");

      if (currentSongIndex == 0) {
        iconPrev.style.color = "grey";
      }

      if (currentSongIndex < listOfSongs.tracks.items.length - 1) {
        iconNext.style.color = "white";
      }
    }
  }

  function shuffleSongs() {
    if (!iconShuffle.classList.contains("footer__green")) {
      iconShuffle.classList.add("footer__green");
    } else {
      iconShuffle.classList.remove("footer__green");
      iconShuffle.classList.add("footer__icon");
    }
  }

  function repeatSongs() {
    if (!iconRepeat.classList.contains("footer__green")) {
      iconRepeat.classList.add("footer__green");
    } else {
      iconRepeat.classList.remove("footer__green");
      iconRepeat.classList.add("footer__icon");
    }
  }

  function isShuffleOn() {
    if (iconShuffle.classList.contains("footer__green")) {
      return true;
    }

    return false;
  }

  function randomNumber(max) {
    currentSongIndex = Math.floor(Math.random() * (max - 1) + 1);

    return currentSongIndex;
  }

  return (
    <div className="footer">
      <div className="footer__left">
        <img
          id="songImg"
          className="footer__albumLogo"
          src={songInfo.imageSrc}
          alt=""
        />
        <div className="footer__songInfo">
          <h4 id="songName">{songInfo.name}</h4>
          <p id="songArtist">
            {songInfo.artist.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>
      <div className="footer__center">
        <ShuffleIcon
          id="iconShuffle"
          onClick={shuffleSongs}
          className="footer__icon"
        />
        <SkipPreviousIcon
          id="iconPrev"
          className="footer__icon"
          onClick={prevSong}
        />
        <div id="play">
          {/* <Popup
          trigger={}
          position="top left"
        >
          {(close) => (
            <div>
              This song cannot be played.
              <a className="close" onClick={close}>
                &times;
              </a>
            </div>
          )}
        </Popup> */}
          <PlayCircleFilledIcon
            fontSize="large"
            className="footer__icon playIcon"
            onClick={playSong}
          />
        </div>
        <div id="pause">
          <PauseCircleFilledIcon
            fontSize="large"
            className="footer__icon pauseIcon"
            onClick={pauseSong}
          />
        </div>
        <SkipNextIcon
          id="iconNext"
          className="footer__icon"
          onClick={nextSong}
        />
        <RepeatIcon
          id="iconRepeat"
          className="footer__green"
          onClick={repeatSongs}
        />
        {/* <div className="player"> */}
        <audio id="player" className="audio" src={songInfo.preview_url}>
          {/* <source src={songInfo.preview_url} type="audio/mpeg" /> */}
        </audio>
        {/* </div> */}
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs>
            <Slider />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
