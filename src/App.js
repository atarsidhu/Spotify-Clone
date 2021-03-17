import React, { useEffect } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

// Set initial playlist to Top Songs Global
let playlistID = "37i9dQZEVXbNG2KDcFcKOF";

function App() {
  const [{ token, playlists, playlistName }, dispatch] = useDataLayerValue();

  // Assign playlistID
  if (typeof playlists.items !== "undefined") {
    playlists.items.forEach((item) => {
      if (item.name === playlistName) {
        playlistID = item.id;
      } else if (playlistName === "Home") {
        playlistID = "37i9dQZEVXbNG2KDcFcKOF";
      }
    });
  }

  useEffect(() => {
    // Get token from URL
    const hash = getTokenFromUrl();

    // Remove the token from URL
    window.location.hash = "";

    const _token = hash.access_token;
    let userId = "";

    // Store token in state
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      // Giving token to spotify api to allow communication
      spotify.setAccessToken(_token);

      // Getting the user account
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      // Get user playlists
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });
    }

    // Get top global songs from Spotify
    spotify.getPlaylist(playlistID).then((response) => {
      dispatch({
        type: "SET_TOP_SONGS",
        topSongs: response,
      });
    });
  }, [playlistID]);

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
