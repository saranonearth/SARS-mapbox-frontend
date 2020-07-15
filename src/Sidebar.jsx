import React, { useState } from "react";
import Menu from "./Menu";

const Sidebar = () => {
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
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </div>
      ) : (
        <Menu func_handleOpen={handleOpen} />
      )}
    </div>
  );
};

export default Sidebar;
