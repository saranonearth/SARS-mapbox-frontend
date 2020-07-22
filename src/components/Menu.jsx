import React from "react";

const Menu = ({ func_handleOpen }) => {
  return (
    <div className="menu-cont">
      <div className="close-cont">
        <div onClick={func_handleOpen} className="close">
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </div>
      </div>
      <div className="menu">
        <h1>Sidebar</h1>
      </div>
    </div>
  );
};

export default Menu;
