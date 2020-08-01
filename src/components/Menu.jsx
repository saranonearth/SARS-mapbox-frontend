import React, { useState } from "react";

const Menu = ({ func_handleOpen, data, setPoints }) => {
  const [state, setState] = useState({
    lat: "",
    long: "",
    trustValue: "",
    radius: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Menu", state);
    setPoints(state);
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="menu-cont">
      <div className="close-cont">
        <div onClick={func_handleOpen} className="close">
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </div>
      </div>
      <div className="menu">
        <h1 className="white">SARS</h1>

        <div className="menu-cont-2">
          <div className="d-1">
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="soc-long">Longitude</label>
                <br />
                <input
                  onChange={handleChange}
                  value={state.long}
                  className="input-i"
                  type="text"
                  name="long"
                />
              </div>
              <div className="form-field">
                <label htmlFor="soc-long">Latitude</label>
                <br />
                <input
                  onChange={handleChange}
                  value={state.lat}
                  className="input-i"
                  type="text"
                  name="lat"
                />
              </div>
              <div className="form-field">
                <label htmlFor="soc-long">Radius</label>
                <br />
                <input
                  onChange={handleChange}
                  className="input-i"
                  value={state.radius}
                  type="text"
                  name="radius"
                />
              </div>
              <div className="form-field">
                <label htmlFor="soc-long">Trust value</label>
                <br />
                <input
                  onChange={handleChange}
                  value={state.trustValue}
                  className="input-i"
                  type="text"
                  name="trustValue"
                />
              </div>
              <div className="search-holder">
                <button className="btn s-btn">Add point</button>
              </div>
            </form>
          </div>
          <div className="d-2">
            <div className="btn stretch">Update grid</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
