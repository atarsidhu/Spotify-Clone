import React from "react";
import { useDataLayerValue } from "./DataLayer";
import "./SidebarOption.css";

function SidebarOption({ title, Icon }) {
  const [state, dispatch] = useDataLayerValue();

  const addToDataLayer = () => {
    dispatch({
      type: "SET_PLAYLIST_NAME",
      item: title,
    });
  };

  return (
    <div className="sidebarOption" onClick={addToDataLayer}>
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
}

export default SidebarOption;
