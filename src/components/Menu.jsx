import React, { useState } from "react";
import Coordinate from "coordinates-converter";
const Menu = ({
  func_handleOpen,
  data,
  setPoints,
  updateGrid,
  points,
  removePoint,
  changeColorOnClick,
}) => {
  console.log("POINTS FROM MENU", points);
  const [state, setState] = useState({
    lat: "",
    long: "",
    trustValue: "",
    radius: "",
    iTime: "",
    latD: "N",
    longD: "E",
    latMMMMM: "",
    longMMMMM: "",
    latDD: "",
    longDD: "",
  });

  const [panel, setPanel] = useState("form");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("MENU", state);
    const { latD, latDD, latMMMMM, longD, longMMMMM, longDD } = state;

    const coordWithSpaces2 = new Coordinate(
      `${latDD} ${latMMMMM} ${latD} ${longDD} ${longMMMMM} ${longD}`
    );

    let latlong = coordWithSpaces2.toDd();

    console.log(latlong);

    let newSendState = {
      trustValue: state.trustValue,
      iTime: state.iTime,
      radius: state.radius,
      long: latlong[1],
      lat: latlong[0],
    };

    console.log("NEW MENU STATE", newSendState);
    setPoints(newSendState);

    setState({
      lat: "",
      long: "",
      trustValue: "",
      radius: "",
      iTime: "",
      latD: "N",
      longD: "E",
      latMMMMM: "",
      longMMMMM: "",
      latDD: "",
      longDD: "",
    });
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
        <div className="options">
          <div onClick={() => setPanel("form")} className="form-btn">
            Add points
          </div>
          <div onClick={() => setPanel("pointslist")} className="see-points">
            Points
          </div>
        </div>
        {panel === "form" ? (
          <div className="menu-cont-2">
            <div className="d-1">
              <form onSubmit={handleSubmit}>
                <div className="coord">
                  <div className="form-field">
                    <label htmlFor="">Longitude</label>
                    <br />
                    <input
                      placeholder="DD"
                      onChange={handleChange}
                      value={state.longDD}
                      className="input-i k"
                      type="text"
                      name="longDD"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <br />
                    <input
                      className="input-i k"
                      value={state.longMMMMM}
                      onChange={handleChange}
                      type="text"
                      placeholder="MM SS"
                      name="longMMMMM"
                      required
                    />
                  </div>
                  <div className="form-field cen-v">
                    <div>
                      <select
                        value={state.longD}
                        onChange={handleChange}
                        className="select-css min"
                        name="longD"
                      >
                        <option value="E">E</option>
                        <option value="W">W</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="coord">
                  <div className="form-field">
                    <label htmlFor="">Latitude</label>
                    <br />
                    <input
                      onChange={handleChange}
                      placeholder="DD"
                      value={state.latDD}
                      className="input-i k"
                      type="text"
                      name="latDD"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <br />
                    <input
                      onChange={handleChange}
                      className="input-i k"
                      type="text"
                      value={state.latMMMMM}
                      placeholder="MM SS"
                      name="latMMMMM"
                      required
                    />
                  </div>
                  <div className="form-field cen-v">
                    <div>
                      <select
                        onChange={handleChange}
                        value={state.latD}
                        className="select-css min"
                        name="latD"
                      >
                        <option value="N">N</option>
                        <option value="S">S</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="soc-long">Radius (Nautical mile)</label>
                  <br />
                  <input
                    onChange={handleChange}
                    className="input-i"
                    value={state.radius}
                    type="text"
                    required
                    name="radius"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="soc-long">Trust value (0-100)</label>
                  <br />
                  <input
                    onChange={handleChange}
                    value={state.trustValue}
                    className="input-i"
                    type="text"
                    required
                    name="trustValue"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="soc-long">Date|Time</label>
                  <br />
                  <input
                    onChange={handleChange}
                    value={state.iTime}
                    className="input-i"
                    type="datetime-local"
                    name="iTime"
                    required
                  />
                </div>
                <div className="search-holder">
                  <button className="btn s-btn">Add point</button>
                </div>
              </form>
            </div>
            <div className="d-2">
              <div onClick={updateGrid} className="btn stretch">
                Update grid
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="points-list">
              {points.length > 0 &&
                points.map((item) => (
                  <div key={item.id} className="l-point">
                    <div
                      onClick={() => changeColorOnClick(item.id)}
                      className="section-c"
                    >
                      <p className="cursor-pointer">
                        {" "}
                        ◙ Lat: {item.latitude}, Long: {item.longitude}
                      </p>
                      <div>Radius: {item.radius}</div>
                    </div>
                    <div className="section-r">
                      {" "}
                      <i
                        onClick={() => {
                          removePoint(item.id);
                        }}
                        class="fa fa-times"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
