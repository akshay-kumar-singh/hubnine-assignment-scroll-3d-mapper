import React, { useState } from "react";
import BodyModel from "../components/BodyModel";
import {
  patients,
  symptomToOrganMap,
  bodyPartColors,
} from "../data/patientData";

const getAffectedOrgans = (symptoms) => {
  return [
    ...new Set(
      symptomToOrganMap
        .filter(({ keyword }) =>
          symptoms.some((s) => s.toLowerCase().includes(keyword.toLowerCase()))
        )
        .map(({ organ }) => organ)
    ),
  ];
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const OrganColorBadge = ({ organ }) => {
  const color = bodyPartColors[organ] || "#666";
  return (
    <div className="flex items-center">
      <div
        className="w-4 h-4 rounded-full mr-2"
        style={{ backgroundColor: color }}
      />
      <span style={{ color: color }}>{capitalizeFirstLetter(organ)}</span>
    </div>
  );
};

const PatientPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedPatient = patients[selectedIndex];
  const affectedOrgans = getAffectedOrgans(selectedPatient.symptoms);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        3D Body Mapping - (Medical Symptoms) (Assignment-2)
      </h1>

      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        <div className="md:w-1/3 space-y-4">
          <h2 className="text-xl font-semibold mb-2 text-center md:text-left">
            Patients
          </h2>
          {patients.map((patient, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition ${
                index === selectedIndex
                  ? "bg-blue-100 border-blue-500"
                  : "bg-white hover:bg-gray-50 border-gray-300"
              }`}
            >
              <span className="font-medium">{patient.name}</span>
            </button>
          ))}
        </div>

        <div className="md:w-2/3 space-y-4">
          <div className="bg-white shadow-md rounded-xl p-5 border">
            <h2 className="text-2xl font-semibold mb-4">
              Patient: {selectedPatient.name}
            </h2>

            <div className="mb-4">
              <h3 className="font-medium text-lg mb-1">
                Reported Symptoms / Conditions:
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                {selectedPatient.symptoms.map((symptom, idx) => {
                  const matchingMap = symptomToOrganMap.find(({ keyword }) =>
                    symptom.toLowerCase().includes(keyword.toLowerCase())
                  );
                  const organColor = matchingMap
                    ? bodyPartColors[matchingMap.organ] || "#666"
                    : "#666";

                  return (
                    <li key={idx} className="flex items-center py-1">
                      <span className="mr-2">•</span>
                      <span style={{ color: organColor }}>{symptom}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="font-medium text-lg mb-1">Affected Organs:</h3>
              {affectedOrgans.length > 0 ? (
                <ul className="space-y-2">
                  {affectedOrgans.map((organ, idx) => (
                    <li key={idx} className="flex items-center">
                      <OrganColorBadge organ={organ} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No matched organs.</p>
              )}
            </div>

            <div className="mt-6 mb-2">
              <h3 className="font-medium text-lg mb-1">Color Legend:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Object.entries(bodyPartColors).map(([organ, color]) => (
                  <div key={organ} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm">
                      {capitalizeFirstLetter(organ)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-[400px] border rounded-md overflow-hidden">
              <BodyModel symptoms={selectedPatient.symptoms} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
