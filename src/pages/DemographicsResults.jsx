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
  const [selectedOption, setSelectedOption] = useState(null);

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
  const sortedCategoryData = selectedCategoryData ? formatSortedScores(selectedCategoryData) : [];
  const top = sortedCategoryData[0];

  useEffect(() => {
    if (top) setSelectedOption(top.label);
  }, [activeTab, demographics]);

  const handleBackClick = () => {
    navigate("/analysis-overview");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Header */}
      <div className="px-[64px] pt-[32px] pb-[12px]">
        <p className="text-xs tracking-wide text-black mb-1 font-semibold">SKINSTRIC [ ANALYSIS ]</p>
        <p className="text-sm text-black mb-3 font-medium">A.I. ANALYSIS</p>
        <h1 className="text-[60px] font-black leading-[64px] tracking-tight">DEMOGRAPHICS</h1>
        <p className="text-sm text-black mt-1 tracking-wide uppercase">PREDICTED RACE & AGE</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 px-[64px] pt-[80px] gap-[16px]">
        {/* Left Tabs */}
        <div className="w-[208px] h-[464px] space-y-2 flex flex-col justify-start">
          {["race", "age", "gender"].map((key) => {
            const label = key === "race" ? "RACE" : key === "age" ? "AGE" : "SEX";
            const top = demographics ? getTopPrediction(demographics[key]) : null;

            return (
              <div
                key={key}
                className={`px-4 py-4 border-t border-b border-black cursor-pointer w-[190px] h-[104px] flex flex-col justify-center ${
                  activeTab === key ? "bg-black text-white" : "bg-gray-100 text-black"
                }`}
                onClick={() => setActiveTab(key)}
              >
                <div className="text-xl font-semibold capitalize">{top ? top.label : "—"}</div>
                <div className="text-sm font-semibold tracking-wide mt-1 text-gray-500 uppercase">
                  {label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Prediction Display */}
        <div
          className="flex flex-col justify-center bg-gray-100 px-8 border-t border-black"
          style={{ width: "880px", height: "464px" }}
        >
          {error && <p className="text-red-500">Error: {error}</p>}
          {!error && top ? (
            <>
              <div className="text-left text-2xl font-bold mb-6 capitalize">{top.label}</div>
              <div className="flex justify-center items-center">
                <div
                  className="rounded-full flex items-center justify-center text-[32px] font-bold text-black relative"
                  style={{
                    width: "384px",
                    height: "384px",
                    background: `conic-gradient(black ${top.value}%, #e5e7eb ${top.value}% 100%)`,
                  }}
                >
                  <div className="w-[372px] h-[372px] rounded-full bg-white flex items-center justify-center">
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
          className="px-4 pt-4 pb-6 bg-gray-100 border-t border-black"
          style={{ width: "320px", height: "464px" }}
        >
          <div className="text-xs uppercase text-gray-500 font-semibold mb-3 flex justify-between">
            <span>{activeTab === "race" ? "RACE" : activeTab === "age" ? "AGE" : "SEX"}</span>
            <span>A.I. CONFIDENCE</span>
          </div>
          {sortedCategoryData.length > 0 ? (
            <div className="space-y-2">
              {sortedCategoryData.map(({ label, value }, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center px-4 py-2 rounded text-sm capitalize cursor-pointer ${
                    selectedOption === label
                      ? "bg-black text-white font-semibold"
                      : "text-black hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedOption(label)}
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
      <div className="flex justify-between items-center px-[64px] py-4 text-sm">
        <div onClick={handleBackClick} className="cursor-pointer">
          <RhombusButton direction="left" label="BACK" />
        </div>
        <div className="text-gray-400 text-base">
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
























