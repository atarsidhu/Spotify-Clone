import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { useDataLayerValue } from "./DataLayer";

function Header({ spotify }) {
  const [{ user }, dispatch] = useDataLayerValue();
  const types = ["artist,track,album,playlist"];

  const inputHandler = (e) => {
    spotify
      .search(e.target.value, types)
      .then((response) => {
        dispatch({
          type: "SET_SEARCH",
          searchInfo: response,
        });
      })
      .catch((err) =>
        dispatch({
          type: "SET_SEARCH",
          searchInfo: "none",
        })
      );
  };

  return (
    <div className="header">
      <div className="header__left">
        <SearchIcon />
        <input
          id="search"
          type="text"
          placeholder="Search for Artists or Songs"
          onKeyUp={inputHandler}
        />
      </div>
      <div className="header__right">
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
}

export default Header;
