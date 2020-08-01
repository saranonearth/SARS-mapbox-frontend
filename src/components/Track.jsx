import React, { useState, useEffect } from "react";
import ReactMapboxGl, {
  ZoomControl,
  Marker,
  Layer,
  Feature,
  GeoJSONLayer,
  Popup,
} from "react-mapbox-gl";
import axios from "axios";
import MapboxGL from "mapbox-gl";
import Sidebar from "./Sidebar";
import {
  lineLayout,
  linePaint,
  dummy,
  getCirclePaint,
  polygonPaint,
} from "../properties/properties";
import geojson from "./geojson.json";
import { Redirect } from "react-router-dom";

const Track = (props) => {
  const API_BASE_URL = "https://sars-headquaters-server.herokuapp.com";
  const flightId = props.match.params.id;
  const [state, setState] = useState({
    homeData: null,
    points: [],
    grid: [],
    gridData: [],
  });
  useEffect(() => {
    const dataFromHome = props.history.location.state.data;
    console.log(dataFromHome);
    const fetchData = async () => {
      try {
        const body = JSON.stringify(dataFromHome);
        console.log("DATA POSTING", dataFromHome);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.post(
          `${API_BASE_URL}/initial-datum`,
          body,
          config
        );

        console.log("TRACK DATA POST", response);
      } catch (error) {
        console.log("ERROR IN TRACK FETCHING INITIAL DATUM", error);
      }
    };

    let grid = [];
    let gridData = [];
    geojson.map((item, i) => {
      const coord = item.features[0].geometry.coordinates;
      grid = [coord, ...grid];
      gridData = [
        {
          x: (coord[0][0][0] + coord[0][2][0]) / 2,
          y: (coord[0][0][1] + coord[0][2][1]) / 2,
        },
        ...gridData,
      ];
    });

    setState({
      ...state,
      grid,
      gridData,
    });

    fetchData();
  }, []);

  const token =
    "pk.eyJ1Ijoic2FyYW5vbmVhcnRoIiwiYSI6ImNrY21hZndsMDJhc28yc3AwanBmcWVwMDQifQ.DJ1Ba2dZDy-a3HC4ibPRdQ";

  const Map = ReactMapboxGl({
    accessToken: token,
  });

  const setPoints = (data) => {
    console.log(data);
    setState({
      ...state,
      points: [
        {
          latitude: data.lat,
          longitutde: data.long,
          trustValue: data.trustValue,
          radius: data.radius,
        },
        ...state.points,
      ],
    });
  };

  const multiPolygonPaint = {
    "fill-color": "#14d9a4",
    "fill-opacity": 0.6,
    "fill-outline-color": "#030bfc",
  };

  return (
    <div>
      <Sidebar setPoints={setPoints} data={state.flightData} />

      <Map
        onZoom={(e) => {
          console.log(e);
        }}
        style="mapbox://styles/mapbox/satellite-v9"
        center={[78.704674, 10.790483]}
        zoom={[3]}
        containerStyle={{
          height: "100vh",
          width: "100%",
        }}
      >
        <ZoomControl />

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

        {/* <Layer type="line" layout={lineLayout} paint={linePaint}>
          <Feature
            coordinates={dummy.map((point) => [point.long, point.lat])}
          />
        </Layer> */}

        {state.points.map((c, i) => (
          <Popup
            key={i}
            coordinates={[c.longitutde, c.latitude]}
            anchor="center"
          >
            <Layer type="circle" paint={getCirclePaint(c)}>
              <Feature coordinates={[c.longitutde, c.latitude]} />
            </Layer>
            <p>{c.trustValue}</p>
          </Popup>
        ))}

        <Layer type="fill" paint={multiPolygonPaint}>
          <Feature coordinates={state.grid} />
        </Layer>

        {state.gridData.map((c, i) => (
          <Popup
            key={i + Math.random()}
            coordinates={[c.x, c.y]}
            anchor="center"
            offset={{
              bottom: [0, 0],
            }}
          >
            {/* <p className="white">{Math.random()}</p> */}
          </Popup>
        ))}
      </Map>
    </div>
  );
};

export default Track;
