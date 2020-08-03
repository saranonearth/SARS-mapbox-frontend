import React, { useState, useEffect } from "react";
import ReactMapboxGl, {
  ZoomControl,
  Layer,
  Marker,
  Feature,
  Popup,
  MapContext,
} from "react-mapbox-gl";
import axios from "axios";

import Sidebar from "./Sidebar";
import { getCirclePaint, getPolygonPaint } from "../properties/properties";
import { calculateRadius, parseGeoJson } from "../properties/Helper";
import marker from "../assets/marker.svg";
import Information from "./Information";
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
    information: null,
  });
  const calculateRadiusInitial = (X, Y, DE) => {
    let initRadius;
    const x = X || 1;
    const y = Y || 1;
    const de = DE || 1;
    console.log(X, Y, DE);

    initRadius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(de, 2));

    return initRadius;
  };

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
        console.log("FETCHED DATA", fetchedData);
        if (fetchedData.line) {
          const { x, y, driftError } = fetchedData.line;
          initRadius = calculateRadiusInitial(x, y, driftError);
        }

        if (fetchedData.circle) {
          const { x, y, driftError } = fetchedData.circle;

          initRadius = calculateRadiusInitial(x, y, driftError);
        }

        setState({
          ...state,
          homeData: dataFromHome,
          initialDatum: fetchedData,
          initialRadius: initRadius,
          starting: {
            lat: fetchedData.circle ? eval(fetchedData.circle.latitude) : 10,
            long: fetchedData.circle ? eval(fetchedData.circle.longitude) : 75,
            zoom: 8,
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
    console.log("DATA FROM MENU", data);
    setState({
      ...state,
      starting: {
        lat: data.lat,
        long: data.long,
        zoom: 10,
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
          id: Math.random(),
          color: data.trustValue,
        },
        ...state.points,
      ],
    });
  };

  console.log(state);

  const updateGrid = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
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

    data = [
      {
        center: [
          eval(state.initialDatum.circle.latitude),
          eval(state.initialDatum.circle.longitude),
        ],
        radius: state.initialRadius,
        strip: [0.2, 0.1, 0.2],
        trust: state.initialDatum.circle.trustVal,
      },
      ...data,
    ];

    // let body;
    // if (state.initialDatum.line) {
    //   body = {
    //     line: [
    //       [
    //         state.initialDatum.line.sourceLatitude,
    //         state.initialDatum.line.sourceLongitude,
    //       ],
    //       [
    //         state.initialDatum.line.destinationLatitude,
    //         state.initialDatum.line.destinationLongitude,
    //       ],
    //     ],
    //   };
    // }

    console.log("DATA I AM SENDING FOR UPDATING GRID", data);

    if (data.length >= 2) {
      try {
        const response = await axios.post(
          "https://cv-sih.herokuapp.com/grid",
          {
            line: [],
            circles: data,
          },
          config
        );

        console.log(response.data);

        const parsedGeoJsonData = parseGeoJson(response.data);
        console.log(parsedGeoJsonData.grid.slice(0, 50));

        setState({
          ...state,
          grid: parsedGeoJsonData.grid,
          gridData: parsedGeoJsonData.gridData,
        });
      } catch (error) {
        console.log("IN TRACK ERROR WHEN UPDATING GRID", error);
      }
    }
  };

  console.log("STATE OF TRACK.jsx", state);

  //Function to remove point circle
  const removePoint = (id) => {
    let oldPoints = state.points;
    const newPointsList = oldPoints.filter((e) => e.id != id);

    setState({
      ...state,
      points: newPointsList,
      starting: {
        ...state.starting,
        zoom: 7,
      },
    });
  };

  //Function to change point circle color on click
  const changeColorOnClick = (id) => {
    const oldPointsList = state.points;

    const newList = oldPointsList.map((point) => {
      if (point.id === id && point.color !== 106) {
        return { ...point, color: 106 };
      } else if (point.id === id) {
        return { ...point, color: point.trustValue };
      }

      return { ...point };
    });
    console.log("NEW LIST", newList);
    setState({
      ...state,
      points: newList,
      starting: {
        ...state.starting,
        zoom: 7,
      },
    });
  };

  const handlePopUp = () => {
    setState({
      ...state,
      information: {
        text: "Hospital",
      },
      starting: {
        lat: 10,
        long: 75,
        zoom: 6,
      },
    });
  };

  const handleInfoCardClose = () => {
    setState({
      ...state,
      information: null,
      starting: {
        lat: 10,
        long: 75,
        zoom: 6,
      },
    });
  };

  return (
    <div>
      <Sidebar
        removePoint={removePoint}
        updateGrid={updateGrid}
        setPoints={setPoints}
        data={state.flightData}
        changeColorOnClick={changeColorOnClick}
        points={state.points}
      />

      {/* {state.information && (
        <Information data={state.information} close={handleInfoCardClose} />
      )} */}

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

        {/* <Marker
          onClick={() => handlePopUp()}
          coordinates={[75, 10]}
          anchor="center"
        >
          <img className="LKP" src={marker} />
        </Marker> */}

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
              radius: state.initialRadius * 3,
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
        {state.initialRadius && state.initialDatum.circle && (
          <Layer
            type="circle"
            paint={getCirclePaint({
              latitude: state.initialDatum.circle.latitude,
              radius: state.initialRadius * 2,
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
                radius: c.calRadius * 3,
                latitude: c.latitude,
                trustValue: c.color,
              })}
            >
              <Feature coordinates={[c.longitude, c.latitude]} />
            </Layer>
            <p>{c.trustValue}</p>
          </Popup>
        ))}
        {state.points.map((c, i) => (
          <Popup
            key={i}
            coordinates={[c.longitude, c.latitude]}
            anchor="center"
          >
            <Layer
              type="circle"
              paint={getCirclePaint({
                radius: c.calRadius * 2,
                latitude: c.latitude,
                trustValue: c.color,
              })}
            >
              <Feature coordinates={[c.longitude, c.latitude]} />
            </Layer>
            <p>{c.trustValue}</p>
          </Popup>
        ))}

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
                trustValue: c.color,
              })}
            >
              <Feature coordinates={[c.longitude, c.latitude]} />
            </Layer>
            <p>{c.trustValue}</p>
          </Popup>
        ))}

        {state.homeData && (
          <Marker
            coordinates={[state.homeData.longitude, state.homeData.latitude]}
            anchor="center"
          >
            <img className="LKP" src={marker} />
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default Track;
