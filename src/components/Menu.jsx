import React from "react";

const Menu = ({ func_handleOpen, data }) => {
  return (
    <div className="menu-cont">
      <div className="close-cont">
        <div onClick={func_handleOpen} className="close">
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </div>
      </div>
      <div className="menu">
        <h1>Sidebar</h1>
        <div>
          <div>
            <i class="fa fa-plane" aria-hidden="true"></i> &nbsp;
            {data && data.data.planId}
          </div>
          <div>
            <h1 className="head-1">
              {" "}
              {data && data.data.source} - {data && data.data.destination}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
