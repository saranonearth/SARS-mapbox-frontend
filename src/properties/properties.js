import { line } from "./pathdata";

// line settings here
export const lineLayout = {
  "line-cap": "round",
  "line-join": "round",
};

export const linePaint = {
  "line-color": "#4790E5",
  "line-width": 3,
};

//heatmap setting
export const layerPaint = {
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
export const metersToPixelsAtMaxZoom = (meters, latitude) =>
  meters / 0.075 / Math.cos((latitude * Math.PI) / 180);

const circleColor = (data) => {
  if (data === 105) {
    return "#42a7f5";
  } else if (data >= 0 && data <= 25) {
    return "#ff5975";
  } else if (data > 25 && data <= 50) {
    return "#de435d";
  } else if (data > 50 && data <= 75) {
    return "#c92a2a";
  } else if (data > 75 && data <= 100) {
    return "#ba0000";
  }
};
const circleOpacity = (data) => {
  if (data === 105) {
    return 0.5;
  } else if (data >= 0 && data <= 25) {
    return 0.4;
  } else if (data > 25 && data <= 50) {
    return 0.5;
  } else if (data > 50 && data <= 75) {
    return 0.6;
  } else if (data > 75 && data <= 100) {
    return 0.8;
  }
};
export const getCirclePaint = (data) => ({
  "circle-radius": {
    stops: [
      [0, 0],
      [20, metersToPixelsAtMaxZoom(data.radius * 1852, data.latitude)],
    ],
    base: 2,
  },
  "circle-color": circleColor(data.trustValue),
  "circle-opacity": circleOpacity(data.trustValue),
  "circle-stroke-width": 3,
  "circle-stroke-color": "#06c1c7",
});

//polygon prop
export const polygonPaint = {
  "fill-color": "red",
  "fill-opacity": 0.4,
};
export const getPolygonPaint = (color) => {
  return {
    "fill-color": color,
    "fill-opacity": 0.4,
  };
};
export const mappedRoute = line.map((point) => [point.lng, point.lat]);
export const dummy = [
  {
    lat: 21,
    long: 45,
  },
  {
    lat: 22.73694444,
    long: 44.49527778,
  },
  {
    lat: 22.26055556,
    long: 42.61777778,
  },
  {
    lat: 20.52444444,
    long: 43.14472222,
  },
  {
    lat: 21,
    long: 45,
  },
];

export const getMultiPolyPaint = (data) => {
  return {
    "fill-color": data.color,
    "fill-opacity": 0.5,
  };
};
