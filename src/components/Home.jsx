import React, { useState } from "react";
import { fields1, searchCraft, distressCraft } from "../properties/HomeFields";
import { SOCHelper } from "../properties/Helper";
const Home = (props) => {
  const [state, setState] = useState({
    longitude: "",
    latitude: "",
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
    props.history.push({
      pathname: "/track",
      state: {
        data: {
          longitude,
          latitude,
          altitude,
          groundSpeed,
          verticalSpeed,
          heading,
          timestampLKP: new Date(dateTimeLKP).valueOf(),
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
                          <label htmlFor="soc-long">Longitude</label>
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
                          <label htmlFor="soc-lat">Latitude</label>
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
