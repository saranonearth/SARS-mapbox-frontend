import React, { useState, useEffect } from "react";
import ReactMapboxGl, {
  ZoomControl,
  Marker,
  Layer,
  Feature,
} from "react-mapbox-gl";
import axios from "axios";
import Sidebar from "./Sidebar";
import marker from "../assets/marker.svg";
import { line, POLYGON1 } from "../properties/pathdata";
import { heatData } from "../properties/heat";
const Track = (props) => {
  const API_BASE_URL = "https://sars-headquaters-server.herokuapp.com";
  const flightId = props.match.params.id;
  const [state, setState] = useState({
    flightData: null,
  });

  useEffect(() => {
    let isCancelled = false;

    const fetchFlightData = async () => {
      try {
        const FLIGHT_TRACK_RESPONSE = await axios.get(
          `${API_BASE_URL}/flight-plan/${flightId}`
        );

        if (FLIGHT_TRACK_RESPONSE.status === 200) {
          if (!isCancelled) {
            setState({
              ...state,
              flightData: FLIGHT_TRACK_RESPONSE.data,
            });
          }
        }
      } catch (error) {
        console.log("FETCH ERROR IN TRACK COMPONENT", error);
      }
    };

    fetchFlightData();
    return () => {
      isCancelled = true;
    };
  }, []);

  console.log(state);

  const token =
    "pk.eyJ1Ijoic2FyYW5vbmVhcnRoIiwiYSI6ImNrY21hZndsMDJhc28yc3AwanBmcWVwMDQifQ.DJ1Ba2dZDy-a3HC4ibPRdQ";

  const Map = ReactMapboxGl({
    accessToken: token,
  });

  // line settings here
  const lineLayout = {
    "line-cap": "round",
    "line-join": "round",
  };

  const linePaint = {
    "line-color": "#4790E5",
    "line-width": 5,
  };

  //heatmap setting
  const layerPaint = {
    "heatmap-weight": {
      property: "priceIndicator",
      type: "exponential",
      stops: [
        [0, 0],
        [5, 2],
      ],
    },
    // Increase the heatmap color weight weight by zoom level
    // heatmap-ntensity is a multiplier on top of heatmap-weight
    "heatmap-intensity": {
      stops: [
        [0, 0],
        [5, 1.2],
      ],
    },
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0,
      "rgba(33,102,172,0)",
      0.25,
      "rgb(103,169,207)",
      0.5,
      "rgb(209,229,240)",
      0.8,
      "rgb(253,219,199)",
      1,
      "rgb(239,138,98)",
      2,
      "rgb(178,24,43)",
    ],
    // Adjust the heatmap radius by zoom level
    "heatmap-radius": {
      stops: [
        [0, 100],
        [100, 200],
      ],
    },
  };
  //circle prop
  const metersToPixelsAtMaxZoom = (meters, latitude) =>
    meters / 0.075 / Math.cos((latitude * Math.PI) / 180);

  const getCirclePaint = (data) => ({
    "circle-radius": {
      stops: [
        [0, 0],
        [
          20,
          metersToPixelsAtMaxZoom(5000, data && data.data.flightPath[105].lat),
        ],
      ],
      base: 2,
    },
    "circle-color": "#389cff",
    "circle-opacity": 0.5,
    "circle-stroke-width": 3,
    "circle-stroke-color": "#ff002f",
  });

  //polygon prop
  const polygonPaint = {
    "fill-color": "#6F788A",
    "fill-opacity": 0.7,
  };

  const mappedRoute = line.map((point) => [point.lng, point.lat]);

  return (
    <div>
      <Sidebar data={state.flightData} />

      <Map
        style="mapbox://styles/mapbox/dark-v10"
        center={[78.704674, 10.790483]}
        zoom={[3]}
        containerStyle={{
          height: "100vh",
          width: "100%",
        }}
      >
        <ZoomControl />
        <Marker
          coordinates={[
            state.flightData && state.flightData.data.flightPath[0].long,
            state.flightData && state.flightData.data.flightPath[0].lat,
          ]}
          anchor="center"
        >
          <img className="iconimg north-west" src={marker} />
        </Marker>

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

        {/* <Layer type="heatmap" paint={layerPaint}>
          {heatData.map((el, index) => (
            <Feature key={index} coordinates={el.latlng} properties={el} />
          ))}
        </Layer> */}

        <Layer type="circle" paint={getCirclePaint(state.flightData)}>
          <Feature
            coordinates={[
              state.flightData && state.flightData.data.flightPath[105].long,
              state.flightData && state.flightData.data.flightPath[105].lat,
            ]}
          />
        </Layer>
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
        {/* <Layer type="fill" paint={polygonPaint}>
          <Feature coordinates={POLYGON1} />
        </Layer> */}
      </Map>
    </div>
  );
};

export default Track;
