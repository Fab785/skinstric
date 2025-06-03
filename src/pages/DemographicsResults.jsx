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
  const [selectedLabel, setSelectedLabel] = useState(null);

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
            headers: { "Content-Type": "application/json" },
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

  const formatSortedScores = (obj) =>
    Object.entries(obj)
      .sort((a, b) => b[1] - a[1])
      .map(([label, value]) => ({
        label,
        value: (value * 100).toFixed(0),
      }));

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
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Header */}
      <div className="px-[64px] pt-[24px] pb-[16px]">
        <p className="text-xs tracking-wide text-gray-500 mb-1">SKINSTRIC [ INTRO ]</p>
        <p className="text-sm text-gray-500 mb-1">A.I. ANALYSIS</p>
        <h1 className="text-[56px] font-black tracking-tight leading-none">DEMOGRAPHICS</h1>
        <p className="text-sm text-gray-500 mt-1">PREDICTED RACE & AGE</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 px-[64px] pt-[60px] gap-[16px]">
        {/* Left Tabs */}
<div className="w-[190px] h-[464px] bg-white space-y-1 flex flex-col justify-start">
  {["race", "age", "gender"].map((key) => {
    const label = key === "race" ? "RACE" : key === "age" ? "AGE" : "SEX";
    const top = demographics ? getTopPrediction(demographics[key]) : null;

    return (
      <div
        key={key}
        className={`px-4 py-3 h-[104px] w-[190px] cursor-pointer flex flex-col justify-between ${
          activeTab === key ? "bg-black text-white" : "bg-gray-100 text-black"
        }`}
        onClick={() => setActiveTab(key)}
      >
        <div className="text-base font-bold uppercase">{top ? top.label : "—"}</div>
        <div className="text-base font-bold uppercase tracking-wide">{label}</div>
      </div>
    );
  })}
</div>


        {/* Center Prediction Display */}
        <div
          className="flex flex-col justify-center bg-gray-100 border-t border-gray-200 px-8"
          style={{ flex: 1, height: "464px" }}
        >
          {error && <p className="text-red-500">Error: {error}</p>}
          {!error && top ? (
            <>
              <div className="text-left text-xl font-medium mb-6 capitalize">{top.label}</div>
              <div className="flex justify-center items-center">
                <div
                  className="rounded-full flex items-center justify-center text-[32px] font-bold text-black relative"
                  style={{
                    width: "384px",
                    height: "384px",
                    background: `conic-gradient(black ${top.value}%, #e5e7eb ${top.value}% 100%)`,
                  }}
                >
                  <div className="w-[344px] h-[344px] rounded-full bg-white flex items-center justify-center">
                    {top.value}%
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-400">Loading...</p>
          )}
        </div>

        {/* Right Panel: A.I. Confidence */}
        <div
          className="px-4 py-4 bg-gray-100"
          style={{ width: "320px", height: "464px" }}
        >
          <div className="text-xs uppercase text-gray-500 font-medium mb-3 flex justify-between">
            <span>{activeTab === "race" ? "RACE" : activeTab === "age" ? "AGE" : "SEX"}</span>
            <span>A.I. CONFIDENCE</span>
          </div>
          {selectedCategoryData ? (
            <div className="space-y-2">
              {formatSortedScores(selectedCategoryData).map(({ label, value }) => (
                <div
                  key={label}
                  className={`flex justify-between items-center px-4 py-2 rounded text-sm capitalize cursor-pointer ${
                    selectedLabel === label
                      ? "bg-black text-white font-semibold"
                      : "text-black hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedLabel(label)}
                >
                  <span className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 border border-black rotate-45 bg-white"></span>
                    <span>{label}</span>
                  </span>
                  <span>{value}%</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Loading...</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-[64px] py-4">
        <div onClick={handleBackClick} className="cursor-pointer">
          <RhombusButton direction="left" label="BACK" />
        </div>
        <div className="text-gray-400 text-[16px]">
          If A.I. estimate is wrong, select the correct one.
        </div>
        <div className="flex gap-3">
          <button
            className="px-4 py-1 border border-black text-black hover:bg-gray-100"
            onClick={() => setReloadKey((k) => k + 1)}
          >
            RESET
          </button>
          <button className="bg-black text-white px-4 py-1">CONFIRM</button>
        </div>
      </div>
    </div>
  );
}























