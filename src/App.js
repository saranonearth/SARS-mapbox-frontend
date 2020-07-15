import React from "react";
import ReactMapboxGl, {
  ZoomControl,
  Marker,
  Layer,
  Feature,
} from "react-mapbox-gl";
import Sidebar from "./Sidebar";
import marker from "./marker.svg";
import { line, POLYGON1 } from "./pathdata";
import { heatData } from "./heat";
const App = () => {
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

  const getCirclePaint = () => ({
    "circle-radius": 30,
    "circle-color": "#E54E52",
    "circle-opacity": 0.8,
    "circle-stroke-width": 3,
    "circle-stroke-color": "#0b71de",
  });

  //polygon prop
  const polygonPaint = {
    "fill-color": "#6F788A",
    "fill-opacity": 0.7,
  };

  const mappedRoute = line.map((point) => [point.lng, point.lat]);

  return (
    <div>
      <Sidebar />

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
        <Marker coordinates={[78.704674, 10.790483]} anchor="center">
          <img className="iconimg" src={marker} />
        </Marker>

        <Layer type="line" layout={lineLayout} paint={linePaint}>
          <Feature coordinates={mappedRoute} />
        </Layer>

        <Layer type="heatmap" paint={layerPaint}>
          {heatData.map((el, index) => (
            <Feature key={index} coordinates={el.latlng} properties={el} />
          ))}
        </Layer>

        <Layer type="circle" paint={getCirclePaint()}>
          <Feature coordinates={[31.1656, 48.3794]} />
        </Layer>
        <Layer type="circle" paint={getCirclePaint()}>
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
        </Layer>
        <Layer type="fill" paint={polygonPaint}>
          <Feature coordinates={POLYGON1} />
        </Layer>
      </Map>
    </div>
  );
};

export default App;
