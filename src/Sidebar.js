import React, { useLayoutEffect, useState } from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import { useDataLayerValue } from "./DataLayer";
import { slide as Menu } from "react-burger-menu";

function Sidebar() {
  // Getting playlist from DataLayer
  const [{ playlists }] = useDataLayerValue();
  const [screenSize, setScreenSize] = useState([0, 0]);

  function useMediaQuery() {
    useLayoutEffect(() => {
      function updateScreenSize() {
        setScreenSize([window.innerWidth, window.innerHeight]);
      }

      window.addEventListener("resize", updateScreenSize);
      updateScreenSize();

      return () => window.removeEventListener("resize", updateScreenSize);
    }, []);

    return screenSize;
  }

  let [width] = useMediaQuery();

  return (
    <div className="main">
      {width < 480 ? (
        <div className="hamburger">
          <Menu>
            <SidebarOption Icon={HomeIcon} title="Home" />
            <br />
            <strong className="sidebar__title">PLAYLISTS</strong>
            <hr />

            {playlists?.items?.map((playlist) => (
              <SidebarOption key={playlist.name} title={playlist.name} />
            ))}
          </Menu>
        </div>
      ) : (
        <div className="sidebar">
          <img
            className="sidebar__logo"
            src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
            alt="Spotify Logo"
          />
          <SidebarOption Icon={HomeIcon} title="Home" />

          <br />
          <strong className="sidebar__title">PLAYLISTS</strong>
          <hr />

          {playlists?.items?.map((playlist) => (
            <SidebarOption key={playlist.name} title={playlist.name} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
