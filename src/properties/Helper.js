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
// let grid = [];
// let gridData = [];

// geojson.map((item, i) => {
//   const coord = item.features[0].geometry.coordinates;
//   grid = [coord, ...grid];
//   gridData = [
//     {
//       x: (coord[0][0][0] + coord[0][2][0]) / 2,
//       y: (coord[0][0][1] + coord[0][2][1]) / 2,
//     },
//     ...gridData,
//   ];
// });