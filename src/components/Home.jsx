import React, { useState } from "react";
import { fields1, searchCraft, distressCraft } from "../properties/HomeFields";
import { SOCHelper } from "../properties/Helper";
import Coordinate from "coordinates-converter";
const Home = (props) => {
  const [state, setState] = useState({
    latDD: "",
    latMMMMM: "",
    latD: "N",
    longDD: "",
    longMMMMM: "",
    longD: "E",
    altitude: "",
    groundSpeed: "",
    verticalSpeed: "",
    heading: "",
    dateTimeLKP: "",
    dcMeansOfNavigation: "GNSS",
    dcTypeofcraft: "Aircraft(more than 2 engines)",
    scMeansOfNavigation: "GNSS",
    scTypeofcraft: "Ship",
    stateOfCraft: "1",
    socScenario2: {
      socLat: "",
      socLong: "",
    },
  });

  const [searchFacilityUsesDRNav, setSearchFacilityUsesDRNav] = useState(false);

  const changeFields1 = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSOCfieldChange = (e) => {
    setState({
      ...state,
      socScenario2: {
        ...state.socScenario2,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleSelectChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const changeStateofCraft = (e) => {
    setState({
      ...state,
      stateOfCraft: e.target.value,
      socScenario2:
        e.target.value === "1"
          ? { socLat: "", socLong: "" }
          : { ...state.socScenario2 },
    });
  };

  const handleSubmit = (e) => {
    const {
      latD,
      longD,
      latMMMMM,
      longMMMMM,
      latDD,
      longDD,
      latitude,
      longitude,
      altitude,
      groundSpeed,
      verticalSpeed,
      heading,
      dateTimeLKP,
      dcMeansOfNavigation,
      dcTypeofcraft,
      scMeansOfNavigation,
      scTypeofcraft,
      stateOfCraft,
      socScenario2,
    } = state;
    e.preventDefault();

    console.log(state);

    const coordWithSpaces2 = new Coordinate(
      `${latDD} ${latMMMMM} ${latD} ${longDD} ${longMMMMM} ${longD}`
    );
    console.log(coordWithSpaces2.toDd());
    const latlong = coordWithSpaces2.toDd();
    props.history.push({
      pathname: "/track",
      state: {
        data: {
          longitude: latlong[1],
          latitude: latlong[0],
          altitude,
          groundSpeed,
          verticalSpeed,
          heading,
          timestampLKP: Date.now(dateTimeLKP),
          distressedCraft: {
            meansOfNavigation: dcMeansOfNavigation,
            typeOfCraft: SOCHelper(dcTypeofcraft),
          },
          searchCraft: {
            meansOfNavigation: scMeansOfNavigation,
            typeOfCraft: SOCHelper(scTypeofcraft),
          },
          stateOfCraft,
          socScenario: socScenario2.socLat ? socScenario2 : null,
          searchFacilityUsesDRNav: searchFacilityUsesDRNav,
        },
      },
    });
  };

  return (
    <div>
      <div className="container">
        <div className="center">
          <h1 className="title">SARS</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="cont">
              <div className="sec1">
                <div className="holder1">
                  <div className="coord">
                    <div className="form-field">
                      <label htmlFor="">Longitude</label>
                      <br />
                      <input
                        placeholder="DD"
                        onChange={changeFields1}
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
                        onChange={changeFields1}
                        type="text"
                        placeholder="MMMMM"
                        name="longMMMMM"
                        required
                      />
                    </div>
                    <div className="form-field cen-v">
                      <div>
                        <select
                          value={state.longD}
                          onChange={changeFields1}
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
                        onChange={changeFields1}
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
                        onChange={changeFields1}
                        className="input-i k"
                        type="text"
                        value={state.latMMMMM}
                        placeholder="MMMMM"
                        name="latMMMMM"
                        required
                      />
                    </div>
                    <div className="form-field cen-v">
                      <div>
                        <select
                          onChange={changeFields1}
                          value={state.latD}
                          className="select-css min"
                          name="latD"
                        >
                          <option value="E">N</option>
                          <option value="W">S</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {fields1.map((f, i) => (
                    <div key={i} className="form-field">
                      <label htmlFor="">{f.placeholder}</label>
                      <br />
                      <input
                        onChange={changeFields1}
                        value={state[f.name]}
                        className="input-i"
                        type={f.type}
                        name={f.name}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="sec2">
                <div className="holder1">
                  <p className="sub-heading">Distress Craft</p>
                  {distressCraft.map((f, i) => (
                    <div key={i + Math.random()} className="form-field">
                      <label className="small-1" htmlFor={f.name}>
                        {f.placeholder}
                      </label>
                      <br />
                      <select
                        onChange={handleSelectChange}
                        value={state[f.name]}
                        className="select-css"
                        name={f.name}
                        required
                      >
                        {f.options.map((op, i) => (
                          <option key={i + Math.random()} name={op}>
                            {op}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                  <p className="sub-heading">State of Craft</p>
                  <div className="master-radio">
                    <div className="flex">
                      <input
                        type="radio"
                        value="1"
                        name="stateOfCraft"
                        id="radio2"
                        onChange={changeStateofCraft}
                        checked={state.stateOfCraft === "1"}
                      />{" "}
                      &nbsp;
                      <label htmlFor="scenario 1">Scenario 1</label>
                      <div className="tooltip">
                        <i
                          className="fa fa-question-circle c2"
                          aria-hidden="true"
                        ></i>
                        <span className="tooltiptext">
                          The distress incident occurred immediately following
                          the last communication.
                        </span>
                      </div>
                    </div>
                    <div className="flex">
                      <input
                        type="radio"
                        value="2"
                        name="stateOfCraft"
                        id="radio3"
                        onChange={changeStateofCraft}
                        checked={state.stateOfCraft === "2"}
                      />
                      &nbsp;
                      <label htmlFor="Scenario 2">Scenario 2</label>
                      <div className="tooltip">
                        <i
                          className="fa fa-question-circle c2"
                          aria-hidden="true"
                        ></i>
                        <span className="tooltiptext">
                          The craft continued along its intended track and the
                          distress incident occurred a significant time after
                          the last communication.
                        </span>
                      </div>
                    </div>
                  </div>
                  {state.stateOfCraft === "2" ? (
                    <>
                      <div>
                        <div className="form-field">
                          <label htmlFor="soc-long">Longitude (Degrees)</label>
                          <br />
                          <input
                            onChange={handleSOCfieldChange}
                            value={state.socScenario2.socLong}
                            className="input-i"
                            type="text"
                            name="socLong"
                          />
                        </div>
                        <div className="form-field">
                          <label htmlFor="soc-lat">Latitude (Degrees)</label>
                          <br />
                          <input
                            onChange={handleSOCfieldChange}
                            value={state.socScenario2.socLat}
                            className="input-i"
                            type="text"
                            name="socLat"
                          />
                        </div>
                      </div>
                    </>
                  ) : null}
                  <p className="sub-heading">Search Craft</p>
                  {searchCraft.map((f, i) => (
                    <div key={i + Math.random()} className="form-field">
                      <label className="small-1" htmlFor={f.name}>
                        {f.placeholder}
                      </label>
                      <br />
                      <select
                        onChange={handleSelectChange}
                        value={state[f.name]}
                        className="select-css"
                        name={f.name}
                        required
                      >
                        {f.options.map((op, i) => (
                          <option key={i + Math.random()} name={op}>
                            {op}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
                <div className="flex no-m">
                  <input
                    type="radio"
                    name="searchFacilityUsesDRNav"
                    id="radio2"
                    onClick={() => {
                      setSearchFacilityUsesDRNav(!searchFacilityUsesDRNav);
                    }}
                    onChange={() => {
                      setSearchFacilityUsesDRNav(!searchFacilityUsesDRNav);
                    }}
                    checked={searchFacilityUsesDRNav}
                  />
                  &nbsp;
                  <label htmlFor="searchFacilityUsesDRNav">
                    Search Facility uses DR Navigation
                  </label>
                </div>
              </div>
            </div>
            <div className="search-holder">
              <button className="btn s-btn">Search</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
