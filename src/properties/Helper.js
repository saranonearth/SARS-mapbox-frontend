import { differenceInHours, setQuarter } from "date-fns";
export const SOCHelper = (data) => {
  switch (data) {
    case "Aircraft(more than 2 engines)":
      return "Aircraft_3";
    case "Aircraft(twin-engine)":
      return "Aircraft_2";
    case "Aircraft(single-engine)":
      return "Aircraft_1";
    default:
      return data;
  }
};

export const calculateRadius = (data, time) => {
  const timeDiffinHours = differenceInHours(
    new Date(time),
    new Date(data.iTime)
  );
  console.log("TimeDiff", timeDiffinHours);
  const drift = timeDiffinHours * 0.5;

  return Math.sqrt(Math.pow(drift, 2) + Math.pow(data.radius, 2));
};

export const parseGeoJson = (geojson) => {
  let grid = [];
  let gridData = [];
  geojson.map((item, i) => {
    const coord = item.features[0].geometry.coordinates;
    grid = [
      {
        points: coord,
        color: item.color,
      },
      ...grid,
    ];
    gridData = [
      {
        x: (coord[0][0][0] + coord[0][2][0]) / 2,
        y: (coord[0][0][1] + coord[0][2][1]) / 2,
        prob: item.prob_dist,
      },
      ...gridData,
    ];
  });

  return {
    grid,
    gridData,
  };
};
