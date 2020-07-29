export const fields1 = [
  {
    name: "longitude",
    placeholder: "Longitude",
    type: "text",
  },
  {
    name: "latitude",
    placeholder: "Latitude",
    type: "text",
  },
  {
    name: "altitude",
    placeholder: "Altitude",
    type: "text",
  },
  {
    name: "groundSpeed",
    placeholder: "Ground Speed",
    type: "text",
  },
  {
    name: "verticalSpeed",
    placeholder: "Vertical Speed",
    type: "text",
  },
  {
    name: "heading",
    placeholder: "Heading",
    type: "text",
  },
  {
    name: "dateTimeLKP",
    placeholder: "Date|Time of LKP",
    type: "datetime-local",
  },
];

export const distressCraft = [
  {
    name: "dcMeansOfNavigation",
    placeholder: "Means of Navigation",
    type: "select",
    options: [
      "GNSS",
      "Radar",
      "Visual Fix",
      "Celestial Fix",
      "Marine radio beacon",
      "LORAN C",
      "INS",
      "VOR",
      "TACAN",
      "Unknown",
    ],
  },
  {
    name: "dcTypeofcraft",
    placeholder: "Type of craft",
    options: [
      "Aircraft(more than 2 engines)",
      "Aircraft(twin-engine)",
      "Aircraft(single-engine)",
    ],
  },
];
export const searchCraft = [
  {
    name: "scMeansOfNavigation",
    placeholder: "Means of Navigation",
    type: "select",
    options: [
      "GNSS",
      "Radar",
      "Visual Fix",
      "Celestial Fix",
      "Marine radio beacon",
      "LORAN C",
      "INS",
      "VOR",
      "TACAN",
      "Unknown",
    ],
  },
  {
    name: "scTypeofcraft",
    placeholder: "Type of craft",
    options: [
      "Ship",
      "Submarine (Military)",
      "Aircraft(more than 2 engines)",
      "Aircraft(twin-engine)",
      "Aircraft(single-engine)",
      "Submersible",
      "Boat",
    ],
  },
];
