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
  const dataFromHome = props.history.location.state.data;
  const API_BASE_URL = "https://sars-headquaters-server.herokuapp.com";

  const [state, setState] = useState({
    homeData: null,
    points: [],
    grid: [],
    gridData: [],
    initialDatum: "",
  });

  useEffect(() => {
    let fetchedData;

    const fetchData = async () => {
      try {
        const body = JSON.stringify(dataFromHome);

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

        fetchedData = response.data.data;

        setState({
          ...state,
          initialDatum: fetchedData,
        });
        console.log(fetchedData);
      } catch (error) {
        console.log("ERROR IN TRACK FETCHING INITIAL DATUM", error);
      }
    };

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
  console.log(state);
  return (
    <div>
      <Sidebar setPoints={setPoints} data={state.flightData} />

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

        {/* <Layer type="line" layout={lineLayout} paint={linePaint}>
          <Feature
            coordinates={
              state.flightData &&
              state.flightData.data.flightPath.map((point) => [
                point.long,
                point.lat,
              ])
            }
          />
        </Layer> */}

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

        {/* <Layer type="fill" paint={multiPolygonPaint}>
          <Feature coordinates={state.grid} />
        </Layer> */}
      </Map>
    </div>
  );
};

export default Track;
