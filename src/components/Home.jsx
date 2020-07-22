import React, { useState } from "react";

const Home = (props) => {
  const [state, setState] = useState({
    flightId: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      flightId: e.target.value,
    });
  };

  const startTrack = () => {
    props.history.push(`/track/${state.flightId}`);
  };
  return (
    <div>
      <div className="container">
        <div>
          <h1 className="title">SARS</h1>
        </div>
        <div>
          <input onChange={handleChange} type="text" placeholder="Flight Id" />
          <div className="btn-holder">
            <div className="btn" onClick={startTrack}>
              Track
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
