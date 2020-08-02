export const fields1 = [
  {
    name: "altitude",
    placeholder: "Altitude (feet)",
    type: "text",
  },
  {
    name: "groundSpeed",
    placeholder: "Ground Speed (Knot)",
    type: "text",
  },
  {
    name: "verticalSpeed",
    placeholder: "Vertical Speed (feet/min)",
    type: "text",
  },
  {
    name: "heading",
    placeholder: "Heading (Degrees)",
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
