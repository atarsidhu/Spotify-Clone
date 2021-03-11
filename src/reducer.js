export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  playlistName: "",
  songInfo: {
    index: 3,
    name: "Blinding Lights",
    artist: [
      {
        name: "The Weeknd",
      },
    ],
    imageSrc:
      "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
    preview_url:
      "https://p.scdn.co/mp3-preview/2f860d8f53b4f34dbef1053890845a8a162fba82?cid=ff29a3deded14c41b6b98c8a0a60fe2c",
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
        ...state,
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

    case "SET_SEARCH":
      return {
        ...state,
        searchInfo: action.searchInfo,
      };

    case "SET_SELECTED_ARTIST_TRACKS":
      return {
        ...state,
        selectedArtistTracks: action.selectedArtistTracks,
      };

    case "SET_SELECTED_ALBUM_TRACKS":
      return {
        ...state,
        selectedAlbumTracks: action.selectedAlbumTracks,
        selectedAlbumImage: action.selectedAlbumImage,
      };

    default:
      return state;
  }
};

export default reducer;
