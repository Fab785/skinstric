import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RhombusButton from "../UI/RhombusButtons";

export default function DemographicsResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const incomingImage = location.state?.imageBase64;
  const imageBase64 = incomingImage || localStorage.getItem("imageBase64");

  const [demographics, setDemographics] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("race");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (incomingImage) {
      localStorage.setItem("imageBase64", incomingImage);
    }
  }, [incomingImage]);

  useEffect(() => {
    if (!imageBase64) {
      setError("No image found.");
      return;
    }

    const fetchDemographics = async () => {
      try {
        setError(null);
        setDemographics(null);
        const response = await fetch(
          "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: imageBase64 }),
          }
        );

        const result = await response.json();

        if (response.ok && result.data) {
          setDemographics(result.data);
        } else {
          setError(result.message || "Failed to fetch demographics.");
        }
      } catch (err) {
        setError("Something went wrong while fetching data.");
      }
    };

    fetchDemographics();
  }, [imageBase64, reloadKey]);

  const formatSortedScores = (obj) => {
    return Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .map(([label, value]) => ({
        label,
        value: (value * 100).toFixed(2),
      }));
  };

  const getTopPrediction = (obj) => {
    const sorted = formatSortedScores(obj);
    return sorted[0];
  };

  const selectedCategoryData = demographics ? demographics[activeTab] : null;
  const top = selectedCategoryData ? getTopPrediction(selectedCategoryData) : null;

  const handleBackClick = () => {
    navigate("/analysis-overview");
  };

  return (
    <div className="flex flex-col h-screen font-sans bg-white">
      {/* Header */}
      <div className="px-8 pt-6 pb-3 border-b">
        <p className="text-xs tracking-wide text-gray-500 mb-1">SKINSTRIC [ ANALYSIS ]</p>
        <h1 className="text-3xl font-black tracking-tight">DEMOGRAPHICS</h1>
        <p className="text-sm text-gray-500 mt-1">PREDICTED RACE & AGE</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Tabs */}
        <div className="w-48 border-r p-4 space-y-2 bg-gray-50">
          {["race", "age", "gender"].map((key) => {
            const label = key === "race" ? "RACE" : key === "age" ? "AGE" : "SEX";
            const topLabel = demographics ? getTopPrediction(demographics[key]).label : "";
            return (
              <div key={key}>
                {key === activeTab && (
                  <div className="text-xs text-black font-semibold mb-1 uppercase">
                    {topLabel}
                  </div>
                )}
                <button
                  className={`w-full px-3 py-2 text-left text-sm uppercase font-medium border ${
                    activeTab === key
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-200"
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  {label}
                </button>
              </div>
            );
          })}
        </div>

        {/* Center Prediction Circle */}
        <div className="flex-1 flex items-center justify-center border-r">
          {error && <p className="text-red-500">{error}</p>}
          {!error && top ? (
            <div className="text-center">
              <div className="text-xl mb-6 capitalize">{top.label}</div>
              <div className="w-40 h-40 rounded-full border-2 border-black flex items-center justify-center text-2xl font-bold">
                {top.value}%
              </div>
            </div>
          ) : (
            !error && <p className="text-gray-400">Loading...</p>
          )}
        </div>

        {/* Right Breakdown Panel - Figma Styled */}
        <div className="w-80 bg-gray-100 p-8 border-l">
          <div className="flex justify-between items-center mb-4 text-sm text-gray-500 uppercase tracking-wider">
            <span>
              {activeTab === "race" ? "Race" : activeTab === "age" ? "Age" : "Sex"}
            </span>
            <span>A.I. Confidence</span>
          </div>

          {selectedCategoryData ? (
            <div className="space-y-2">
              {formatSortedScores(selectedCategoryData).map(({ label, value }, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between px-4 py-2 rounded ${
                    index === 0
                      ? "bg-black text-white font-semibold"
                      : "text-black hover:bg-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-3 h-3 transform rotate-45 border-2 ${
                        index === 0 ? "bg-white border-white" : "border-black"
                      }`}
                    ></span>
                    <span className="capitalize">{label}</span>
                  </div>
                  <span>{parseFloat(value).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Loading...</p>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-between items-center border-t px-8 py-4 text-sm text-gray-400">
        <div onClick={handleBackClick} className="cursor-pointer">
          <RhombusButton direction="left" label="BACK" />
        </div>

        <div className="space-x-3">
          <button
            className="border px-4 py-1 border-black"
            onClick={() => setReloadKey((k) => k + 1)}
          >
            RESET
          </button>
          <button className="bg-black text-white px-4 py-1">CONFIRM</button>
        </div>
      </div>

      <div className="text-center text-xs text-gray-300 pb-2">
        If A.I. estimate is wrong, select the correct one.
      </div>
    </div>
  );
}






