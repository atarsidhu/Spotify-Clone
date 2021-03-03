import React, { useEffect } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi();

function App() {
  // const [{ user, token }, dispatch] = useDataLayerValue();
  const [{ token }, dispatch] = useDataLayerValue();

  // Run code based on a given condition
  useEffect(() => {
    // Get token from URL
    const hash = getTokenFromUrl();

    // Remove the token from URL
    window.location.hash = "";

    const _token = hash.access_token;

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

      spotify.getPlaylist("37i9dQZEVXcMxFfoBlQtm7").then((response) => {
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        });
      });
    }
  }, []);

  return (
    <div className="app">
      {/* If we have a token (if we successfully logged in), show Player. Else show login */}
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
