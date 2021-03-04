export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  playlistName: "",
  songInfo: {
    name: "Yeah!",
    artist: [
      {
        name: "Usher",
      },
    ],
    imageSrc:
      "https://upload.wikimedia.org/wikipedia/en/7/74/Usher_-_Confessions_album_cover.jpg",
  },
  // Replace token with null after developing..This just allows us to not have to login everytime
  //   token:
  // "BQAXZHM7cQ-q-9N7o1BR8HC9wxBOPB8AatxBLHNtZofoAS4JxCG9vK5e2XYvUb2BVevqid7RI349RDE-j5heYDnqfzb-8UEYfvF8EB5jVsdj50IpMgmxZUMgWFy5hkbnyy1psUGPZD3uPf2BLDGZrdRGtHqP1Q",
};

// State is how it currently looks
// Action is how we manipulate what the DataLayer looks like (set the user, set the currently playing etc.)
const reducer = (state, action) => {
  //console.log(action);

  // Action -> type, [payload]

  switch (action.type) {
    case "SET_USER":
      return {
        ...state, // Keep whatever is in the current state. DO NOT OVERWRITE
        user: action.user,
      };

    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };

    case "SET_TOP_SONGS":
      return {
        ...state,
        topSongs: action.topSongs,
      };

    case "SET_PLAYLIST_NAME":
      return {
        ...state,
        playlistName: action.item,
      };

    case "SET_SONG_INFO":
      return {
        ...state,
        songInfo: action.item,
      };

    default:
      return state;
  }
};

export default reducer;
