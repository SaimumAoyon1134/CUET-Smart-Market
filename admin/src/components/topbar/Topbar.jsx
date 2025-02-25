import React from "react";
import "./topbar.css"
import { NotificationsNone, Language,Settings } from "@mui/icons-material";


export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">CUET SMART MARKET</span>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div> */}
        
        
          <img src="https://cdn.dribbble.com/users/6481365/screenshots/15907287/media/49902be5f09602c3214b9cde2c4f672f.jpg" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
