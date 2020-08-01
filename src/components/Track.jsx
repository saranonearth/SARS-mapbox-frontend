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
  getPolygonPaint,
  polygonPaint,
  getMultiPolyPaint,
} from "../properties/properties";

import { calculateRadius, parseGeoJson } from "../properties/Helper";
import { setDate } from "date-fns";

const Track = (props) => {
  const dataFromHome = props.history.location.state.data;
  const API_BASE_URL = "https://sars-headquaters-server.herokuapp.com";

  const [state, setState] = useState({
    starting: {
      long: 75,
      lat: 15,
      zoom: 3,
    },
    homeData: null,
    points: [],
    grid: [],
    gridData: [],
    initialDatum: "",
    initialRadius: null,
  });

  useEffect(() => {
    let fetchedData;
    let initRadius;

    const fetchData = async () => {
      try {
        const body = JSON.stringify(dataFromHome);
        console.log("SENDING DATA", dataFromHome);
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
        console.log(response);
        fetchedData = response.data.data;

        console.log(fetchedData);
        if (fetchedData.circle) {
          const { x, y, driftError } = fetchedData.circle;
          const X = x || 1;
          const Y = y || 1;
          const DE = driftError || 1;
          console.log(X, Y, DE);
          initRadius = Math.sqrt(
            Math.pow(X, 2) + Math.pow(Y, 2) + Math.pow(DE, 2)
          );
          console.log("Radius", initRadius);
        }

        setState({
          ...state,
          homeData: dataFromHome,
          initialDatum: fetchedData,
          initialRadius: initRadius,
          starting: {
            lat: fetchedData.circle
              ? eval(fetchedData.circle.latitude)
              : fetchedData.line.latitude,
            long: fetchedData.circle
              ? eval(fetchedData.circle.longitude)
              : fetchedData.line.longitude,
            zoom: 10,
          },
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
      starting: {
        lat: data.lat,
        long: data.long,
        zoom: 5,
      },
      points: [
        {
          latitude: data.lat,
          longitude: data.long,
          trustValue: data.trustValue,
          radius: data.radius,
          calRadius: calculateRadius(data, new Date()),
          time: new Date(),
          iTime: new Date(data.iTime),
        },
        ...state.points,
      ],
    });
  };

  console.log(state);

  const updateGrid = async () => {
    let data = [];

    console.log("POINTS AT THE TIME OF UPDATE GRID", state.points);
    state.points.map((point) => {
      data = [
        {
          center: [eval(point.latitude), eval(point.longitude)],
          radius: eval(point.calRadius),
          strip: [0.2, 0.1, 0.2],
          trust: eval(point.trustValue),
        },
        ...data,
      ];
    });
    console.log("DATA I AM SENDING FOR UPDATING GRID", data);

    try {
      const response = await axios.post(
        "https://cv-sih.herokuapp.com/grid",
        data
      );

      console.log(response.data);

      const parsedGeoJsonData = parseGeoJson(response.data);

      setState({
        ...state,
        grid: parsedGeoJsonData.grid,
        gridData: parsedGeoJsonData.gridData,
      });
    } catch (error) {
      console.log("IN TRACK ERROR WHEN UPDATING GRID", error);
    }
  };

  console.log("STATE OF TRACK.jsx", state);

  return (
    <div>
      <Sidebar
        updateGrid={updateGrid}
        setPoints={setPoints}
        data={state.flightData}
      />

      <Map
        style="mapbox://styles/mapbox/satellite-v9"
        center={[state.starting.long, state.starting.lat]}
        zoom={[state.starting.zoom]}
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

        {state.grid.length > 0 &&
          state.grid.map((item, i) => (
            <Layer type="fill" paint={getPolygonPaint(item.color)}>
              <Feature coordinates={[item.points]} />
            </Layer>
          ))}

        {state.gridData.length > 0 &&
          state.gridData.map((item, i) => (
            <Popup
              key={i + Math.random()}
              coordinates={[item.x, item.y]}
              anchor="center"
            >
              {Math.floor(item.prob * 1000) / 1000}
            </Popup>
          ))}
        {state.initialRadius && state.initialDatum.circle && (
          <Layer
            type="circle"
            paint={getCirclePaint({
              latitude: state.initialDatum.circle.latitude,
              radius: state.initialRadius,
              trustValue: 105,
            })}
          >
            <Feature
              coordinates={[
                eval(state.initialDatum.circle.longitude),
                eval(state.initialDatum.circle.latitude),
              ]}
            />
          </Layer>
        )}
        {state.points.map((c, i) => (
          <Popup
            key={i}
            coordinates={[c.longitude, c.latitude]}
            anchor="center"
          >
            <Layer
              type="circle"
              paint={getCirclePaint({
                radius: c.calRadius,
                latitude: c.latitude,
                trustValue: c.trustValue,
              })}
            >
              <Feature coordinates={[c.longitude, c.latitude]} />
            </Layer>
            <p>{c.trustValue}</p>
          </Popup>
        ))}
      </Map>
    </div>
  );
};

export default Track;
