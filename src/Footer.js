import React, { useEffect, useRef } from "react";
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
import VolumeMuteIcon from "@material-ui/icons/VolumeMute";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import { useDataLayerValue } from "./DataLayer";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

let intervalId = 0;
let sliderId = 0;

function Footer() {
  const [{ songInfo, topSongs }] = useDataLayerValue();
  let listOfSongs = topSongs;

  const playButton = document.getElementById("play");
  const pauseButton = document.getElementById("pause");
  const nextButton = document.getElementById("iconNext");
  const prevButton = document.getElementById("iconPrev");
  const audioPlayer = document.getElementById("player");
  let songImg = document.getElementById("songImg");
  let songName = document.getElementById("songName");
  let songArtist = document.getElementById("songArtist");
  const iconNext = document.getElementById("iconNext");
  const iconPrev = document.getElementById("iconPrev");
  const iconShuffle = document.getElementById("iconShuffle");
  const iconRepeat = document.getElementById("iconRepeat");
  let volumeRocker = document.getElementsByClassName("MuiSlider-thumb");
  let sliderColor = document.getElementsByClassName("MuiSlider-track");
  let rail = document.getElementsByClassName("MuiSlider-root");
  let volumeLevel = 0;
  let slider = document.getElementById("bar");
  let seconds = 0;
  let milliseconds = 0;
  let songTimer = document.getElementById("start");
  let volumeDownIcon = document.getElementById("volumeDown");
  let volumeUpIcon = document.getElementById("volumeUp");
  let volumeMuteIcon = document.getElementById("volumeMute");
  let tooltip = document.getElementById("tooltipText");
  let volume = document.getElementsByClassName("volume");

  for (let i = 0; i < volume.length; i++) {
    volume[i].addEventListener("click", () => {
      let sl = document.getElementsByClassName("volume-slider");
      console.log(sl[0]);
      sl[0].style.setProperty("display", "block", "important");
    });
  }

  if (typeof rail[0] !== "undefined") {
    sliderColor[0].style = "width: 50%";
    volumeRocker[0].style = "left: 50%";
    rail[0].addEventListener("click", () => {
      volumeLevel = volumeRocker[0].ariaValueNow / 100;
      audioPlayer.volume = volumeLevel;

      if (volumeLevel === 0) {
        volumeDownIcon.style.display = "none";
        volumeUpIcon.style.display = "none";
        volumeMuteIcon.style.display = "block";
      } else if (volumeLevel > 0 && volumeLevel < 0.5) {
        volumeDownIcon.style.display = "block";
        volumeUpIcon.style.display = "none";
        volumeMuteIcon.style.display = "none";
      } else {
        volumeDownIcon.style.display = "none";
        volumeUpIcon.style.display = "block";
        volumeMuteIcon.style.display = "none";
      }
    });
  }

  let currentSongIndex = songInfo.index - 1;

  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      if (songInfo.preview_url === null) {
        previewUnavailable();
      } else {
        audioPlayer.load();
        stopTimer();
        songTimer.innerText = `0:00`;
        playSong();
        toggleButtons(true);
      }
    } else {
      didMountRef.current = true;
    }
  }, [songInfo.name]);

  function previewUnavailable() {
    resetProgressBarValues();
    audioPlayer.pause();
    tooltip.style.transition = "all 2s";
    tooltip.style.opacity = 1;
    // playButton.onclick = null;
    toggleButtons(false);
  }

  function toggleButtons(enable) {
    if (enable) {
      playButton.style.color = "white";
      nextButton.style.color = "white";
      prevButton.style.color = "white";
    } else {
      playButton.style.color = "gray";
      nextButton.style.color = "gray";
      prevButton.style.color = "gray";
    }
  }

  function incrementSeconds() {
    if (seconds < 30) {
      seconds += 1;

      if (seconds > 9) {
        songTimer.innerText = `0:${seconds}`;
      } else {
        songTimer.innerText = `0:0${seconds}`;
      }
    } else {
      resetProgressBarValues();
    }
  }

  function resetProgressBarValues() {
    stopTimer();
    seconds = 0;
    milliseconds = 0;
    songTimer.innerText = "0:00";
    slider.style.width = "0%";
    playButton.style.display = "block";
    pauseButton.style.display = "none";
  }

  function sliderWidth() {
    if (milliseconds < 30000) {
      milliseconds += 50;
      slider.style.width = milliseconds / 300 + "%";
    }
  }

  function startTimer() {
    intervalId = setInterval(incrementSeconds, 1000);
    sliderId = setInterval(sliderWidth, 50);
  }

  function stopTimer() {
    clearInterval(intervalId);
    clearInterval(sliderId);
  }

  function playSong() {
    // tooltip.style.display = "none";
    tooltip.style.opacity = 0;
    audioPlayer.play();
    playButton.style.display = "none";
    pauseButton.style.display = "block";
    startTimer();
  }

  function pauseSong() {
    audioPlayer.pause();
    pauseButton.style.display = "none";
    playButton.style.display = "block";

    stopTimer();
  }

  function nextSong() {
    resetProgressBarValues();

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
          }
        }
      }

      const currentTrack = listOfSongs.tracks.items[++currentSongIndex];

      songImg.src = currentTrack.track.album.images[0].url;
      songName.innerHTML = currentTrack.track.name;
      songArtist.innerHTML = currentTrack.track.artists
        .map((artist) => artist.name)
        .join(", ");

      if (currentTrack.track.preview_url === null) {
        previewUnavailable();
      } else {
        toggleButtons(true);
        audioPlayer.src = currentTrack.track.preview_url;
        audioPlayer.load();
        playSong();

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
  }

  function prevSong() {
    resetProgressBarValues();

    // If the song isnt the first song in the playlist
    if (currentSongIndex != 0) {
      const currentTrack = listOfSongs.tracks.items[--currentSongIndex];

      songImg.src = currentTrack.track.album.images[0].url;
      songName.innerHTML = currentTrack.track.name;
      songArtist.innerHTML = currentTrack.track.artists
        .map((artist) => artist.name)
        .join(", ");

      if (currentTrack.track.preview_url === null) {
        previewUnavailable();
      } else {
        toggleButtons(true);
        audioPlayer.src = currentTrack.track.preview_url;
        audioPlayer.load();
        playSong();

        if (currentSongIndex == 0) {
          iconPrev.style.color = "grey";
        }

        if (currentSongIndex < listOfSongs.tracks.items.length - 1) {
          iconNext.style.color = "white";
        }
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
        <div className="center__top">
          <ShuffleIcon
            id="iconShuffle"
            onClick={shuffleSongs}
            className="footer__icon extra__icon"
          />
          {songInfo.preview_url === null ? (
            <SkipPreviousIcon id="iconPrev" />
          ) : (
            <SkipPreviousIcon
              id="iconPrev"
              className="footer__icon"
              onClick={prevSong}
            />
          )}

          <div id="play">
            <div id="tooltip">
              <div id="tooltipText">This song is unavailable</div>
            </div>
            {songInfo.preview_url === null ? (
              <PlayCircleFilledIcon fontSize="large" />
            ) : (
              <PlayCircleFilledIcon
                fontSize="large"
                className="footer__icon"
                onClick={playSong}
              />
            )}
          </div>
          <div id="pause">
            <PauseCircleFilledIcon
              fontSize="large"
              className="footer__icon"
              onClick={pauseSong}
            />
          </div>
          {songInfo.preview_url === null ? (
            <SkipNextIcon id="iconNext" />
          ) : (
            <SkipNextIcon
              id="iconNext"
              className="footer__icon"
              onClick={nextSong}
            />
          )}

          <RepeatIcon
            id="iconRepeat"
            className="footer__green extra__icon"
            onClick={repeatSongs}
          />
          <audio
            id="player"
            className="audio"
            src={songInfo.preview_url}
          ></audio>
        </div>
        <div className="center__bottom">
          <p id="start">0:00</p>
          <div id="bottom__slider">
            <div id="bar"></div>
          </div>
          <p>0:30</p>
        </div>
      </div>
      <div className="footer__right">
        <Grid container spacing={2}>
          <Grid item>
            <VolumeDownIcon id="volumeDown" className="volume" />
            <VolumeMuteIcon id="volumeMute" className="volume" />
            <VolumeUpIcon id="volumeUp" className="volume" />
          </Grid>
          <Grid item xs>
            <Slider
              aria-labelledby="continuous-slider"
              className="volume-slider"
              orientation="vertical"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
