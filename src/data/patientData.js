export const bodyPartColors = {
  heart: "red",
  lungs: "lightblue",
  intestine: "orange",
  liver: "green",
  arm: "pink",
  leg: "purple",
};

export const symptomToOrganMap = [
  { keyword: "sharp and worsening abdominal pain", organ: "intestine" },
  { keyword: "abdominal pain", organ: "intestine" },
  { keyword: "bloating", organ: "intestine" },
  { keyword: "nausea", organ: "intestine" },
  { keyword: "vomiting", organ: "intestine" },
  { keyword: "chest pain", organ: "heart" },
  { keyword: "shortness of breath", organ: "lungs" },
  { keyword: "persistent cough", organ: "lungs" },
  { keyword: "jaundice", organ: "liver" },
  { keyword: "right upper quadrant pain", organ: "liver" },
  { keyword: "arm numbness", organ: "arm" },
  { keyword: "swollen leg", organ: "leg" },
  { keyword: "leg pain", organ: "leg" },
  { keyword: "lower back pain", organ: "intestine" },
  { keyword: "frequent urination", organ: "intestine" },
  { keyword: "headache", organ: "heart" },
  { keyword: "dizziness", organ: "heart" },
];

export const patients = [
  {
    name: "Jane Smith",
    symptoms: ["chest pain", "shortness of breath"],
  },
  {
    name: "Rahul Verma",
    symptoms: ["jaundice"],
  },
  {
    name: "Lisa Ray",
    symptoms: ["headache", "dizziness"],
  },
  {
    name: "John Doe",
    symptoms: ["sharp and worsening abdominal pain"],
  },
  {
    name: "Amit Patel",
    symptoms: ["frequent urination"],
  },

  {
    name: "Rahul Verma",
    symptoms: ["jaundice"],
  },
  {
    name: "Emily Johnson",
    symptoms: ["arm numbness", "swollen leg"],
  },
];
