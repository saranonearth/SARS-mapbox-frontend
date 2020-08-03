import React, { useState } from "react";
import Menu from "./Menu";

const Sidebar = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(false);
  };
  return (
    <div>
      {!open ? (
        <div
          onClick={() => {
            setOpen(true);
          }}
          className="openicon"
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </div>
      ) : (
        <Menu
          modelimages={props.modelimages}
          changeColorOnClick={props.changeColorOnClick}
          removePoint={props.removePoint}
          points={props.points}
          searchPatternPopup={props.searchPatternPopup}
          updateGrid={props.updateGrid}
          setPoints={props.setPoints}
          data={props.data}
          func_handleOpen={handleOpen}
        />
      )}
    </div>
  );
};

export default Sidebar;
