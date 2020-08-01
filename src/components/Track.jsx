import React, { useState, useEffect, useRef } from "react";
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
  const mapRef = useRef();
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
            zoom: 5,
          },
        });
        console.log(fetchedData);
      } catch (error) {
        console.log("ERROR IN TRACK FETCHING INITIAL DATUM", error);
      }
    };
    console.log("MAP REF", mapRef.current);
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
          time: new Date(),
          iTime: new Date(data.iTime),
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

  const updateGrid = async () => {
    // let data = [];

    // state.points.map(point=>{
    //   data = [{center:[point.latitude,point.longitude]}...data]
    // })

    try {
      const response = await axios.post("https://cv-sih.herokuapp.com/grid");

      console.log(response.data);
    } catch (error) {
      console.log("IN TRACK ERROR WHEN UPDATING GRID", error);
    }
  };

  return (
    <div>
      <Sidebar
        updateGrid={updateGrid}
        setPoints={setPoints}
        data={state.flightData}
      />

      <Map
        ref={(el) => (mapRef.current = el)}
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

        {state.points.map((c, i) => (
          <Popup
            key={i}
            coordinates={[c.longitude, c.latitude]}
            anchor="center"
          >
            <Layer type="circle" paint={getCirclePaint(c)}>
              <Feature coordinates={[c.longitude, c.latitude]} />
            </Layer>
            <p>{c.trustValue}</p>
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

        {/* <Layer type="fill" paint={multiPolygonPaint}>
          <Feature coordinates={state.grid} />
        </Layer> */}
      </Map>
    </div>
  );
};

export default Track;
