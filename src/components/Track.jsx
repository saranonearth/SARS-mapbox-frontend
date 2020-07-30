import React, { useState, useEffect } from "react";
import ReactMapboxGl, {
  ZoomControl,
  Marker,
  Layer,
  Feature,
} from "react-mapbox-gl";
import axios from "axios";

import Sidebar from "./Sidebar";
import {
  lineLayout,
  linePaint,
  dummy,
  polygonPaint,
} from "../properties/properties";

// import marker from "../assets/marker.svg";
// import { line, POLYGON1 } from "../properties/pathdata";
// import { heatData } from "../properties/heat";

const Track = (props) => {
  const API_BASE_URL = "https://sars-headquaters-server.herokuapp.com";
  const flightId = props.match.params.id;
  const [state, setState] = useState({
    homeData: null,
  });
  useEffect(() => {
    const dataFromHome = props.history.location.state.data;
  }, []);
  console.log("this.props.", props);

  const token =
    "pk.eyJ1Ijoic2FyYW5vbmVhcnRoIiwiYSI6ImNrY21hZndsMDJhc28yc3AwanBmcWVwMDQifQ.DJ1Ba2dZDy-a3HC4ibPRdQ";

  const Map = ReactMapboxGl({
    accessToken: token,
  });

  return (
    <div>
      <Sidebar data={state.flightData} />

      <Map
        style="mapbox://styles/mapbox/satellite-v9"
        center={[78.704674, 10.790483]}
        zoom={[3]}
        containerStyle={{
          height: "100vh",
          width: "100%",
        }}
      >
        <ZoomControl />
        {/* <Marker
          coordinates={[
            state.flightData && state.flightData.data.flightPath[0].long,
            state.flightData && state.flightData.data.flightPath[0].lat,
          ]}
          anchor="center"
        >
          <img className="iconimg north-west" src={marker} />
        </Marker> */}

        <Layer type="line" layout={lineLayout} paint={linePaint}>
          <Feature
            coordinates={
              state.flightData &&
              state.flightData.data.flightPath.map((point) => [
                point.long,
                point.lat,
              ])
            }
          />
        </Layer>

        <Layer type="line" layout={lineLayout} paint={linePaint}>
          <Feature
            coordinates={dummy.map((point) => [point.long, point.lat])}
          />
        </Layer>

        {/* <Layer type="heatmap" paint={layerPaint}>
          {heatData.map((el, index) => (
            <Feature key={index} coordinates={el.latlng} properties={el} />
          ))}
        </Layer> */}

        {/* <Layer type="circle" paint={getCirclePaint(state.flightData)}>
          <Feature
            coordinates={[
              state.flightData && state.flightData.data.flightPath[105].long,
              state.flightData && state.flightData.data.flightPath[105].lat,
            ]}
          />
        </Layer> */}
        {/* <Layer type="circle" paint={getCirclePaint(10.8083)}>
          <Feature coordinates={[ 78.6801,10.8083]} />
        </Layer> */}
        {/* <Layer type="circle" paint={getCirclePaint()}>
          <Feature coordinates={[50.82793, -0.168749]} />
        </Layer>
        <Layer type="circle" paint={getCirclePaint()}>
          <Feature coordinates={[46.3337, 15.6921]} />
        </Layer>
        <Layer type="circle" paint={getCirclePaint()}>
          <Feature coordinates={[22.4172, 5.8975]} />
        </Layer>
        <Layer type="circle" paint={getCirclePaint()}>
          <Feature coordinates={[15.6921, 46.3337]} />
        </Layer> */}
        <Layer type="fill" paint={polygonPaint}>
          <Feature
            coordinates={[
              [
                [45, 21],
                [44.49527778, 22.73694444],
                [42.61777778, 22.26055556],
                [43.14472222, 20.52444444],
                [45, 21],
              ],
            ]}
          />
        </Layer>
      </Map>
    </div>
  );
};

export default Track;
