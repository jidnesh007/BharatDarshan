import React, { useState, useRef } from "react";
import {
  Clock,
  Upload,
  Zap,
  Calendar,
  MapPin,
  Camera,
  Sparkles,
  ArrowRight,
  History,
} from "lucide-react";

export default function TimeTravel() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [timePeriod, setTimePeriod] = useState(200);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [historicalInfo, setHistoricalInfo] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setGeneratedImage(null);
        setHistoricalInfo(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateHistoricalImage = async () => {
    if (!uploadedImage) return;

    setIsGenerating(true);

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Generate mock historical information based on time period
    const currentYear = new Date().getFullYear();
    const targetYear = currentYear - timePeriod;

    const historicalData = {
      targetYear,
      timePeriod,
      era: getHistoricalEra(targetYear),
      changes: getHistoricalChanges(timePeriod),
      architecture: getArchitecturalStyle(targetYear),
      technology: getTechnologyLevel(targetYear),
      population: getPopulationData(timePeriod),
      environment: getEnvironmentalChanges(timePeriod),
    };

    // Create a simulated historical version of the image
    // In a real implementation, this would call an AI service
    setGeneratedImage(uploadedImage); // Using same image for demo
    setHistoricalInfo(historicalData);
    setIsGenerating(false);
  };

  const getHistoricalEra = (year) => {
    if (year >= 2000) return "Modern Era";
    if (year >= 1950) return "Mid-20th Century";
    if (year >= 1900) return "Early 20th Century";
    if (year >= 1850) return "Industrial Revolution";
    if (year >= 1800) return "Victorian Era";
    if (year >= 1750) return "Colonial Period";
    return "Pre-Industrial Era";
  };

  const getHistoricalChanges = (years) => {
    const changes = [];
    if (years >= 50) changes.push("Significant urban development changes");
    if (years >= 100) changes.push("Major architectural evolution");
    if (years >= 150) changes.push("Transportation infrastructure differences");
    if (years >= 200) changes.push("Pre-industrial landscape features");
    if (years >= 300) changes.push("Colonial-era structures and layouts");
    return changes;
  };

  const getArchitecturalStyle = (year) => {
    if (year >= 1950) return "Modernist and Contemporary";
    if (year >= 1900) return "Art Deco and Early Modern";
    if (year >= 1850) return "Victorian and Gothic Revival";
    if (year >= 1800) return "Neoclassical and Federal";
    return "Colonial and Georgian";
  };

  const getTechnologyLevel = (year) => {
    if (year >= 1950)
      return "Electric lighting, automobiles, modern infrastructure";
    if (year >= 1900) return "Early electricity, horse-drawn vehicles";
    if (year >= 1850) return "Gas lighting, steam power, railways";
    if (year >= 1800) return "Oil lamps, water mills, horse transportation";
    return "Candles, manual labor, walking paths";
  };

  const getPopulationData = (years) => {
    const reduction = Math.floor(years / 25) * 15;
    return `Estimated ${reduction}% less populated than today`;
  };

  const getEnvironmentalChanges = (years) => {
    const changes = [];
    if (years >= 100) changes.push("More natural vegetation");
    if (years >= 150) changes.push("Cleaner air and water");
    if (years >= 200) changes.push("Extensive forests and wildlife");
    if (years >= 250) changes.push("Undeveloped natural landscapes");
    return changes;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
        <div className="relative container mx-auto px-6 py-16 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-4">
              <Clock className="w-8 h-8" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Time Travel Vision
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Upload any image and journey back in time to see how the location
            looked decades or centuries ago
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-3 text-purple-400" />
                Upload Your Image
              </h2>

              <div
                className="border-2 border-dashed border-purple-400 rounded-2xl p-8 text-center cursor-pointer hover:border-purple-300 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="max-h-64 mx-auto rounded-xl shadow-lg"
                    />
                    <p className="text-green-400 font-semibold">
                      Image uploaded successfully!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Camera className="w-16 h-16 mx-auto text-purple-400" />
                    <p className="text-lg">Click to upload an image</p>
                    <p className="text-sm text-gray-400">
                      Supports JPG, PNG, WebP
                    </p>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Time Period Selector */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-blue-400" />
                Select Time Period
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Years Back in Time: {timePeriod}
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="25"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>50 years</span>
                    <span>500 years</span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-center">
                    <span className="text-purple-400 font-semibold">
                      Target Year:
                    </span>{" "}
                    <span className="text-2xl font-bold text-blue-400">
                      {new Date().getFullYear() - timePeriod}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateHistoricalImage}
              disabled={!uploadedImage || isGenerating}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Generating Time Travel Vision...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Generate Historical Image
                </div>
              )}
            </button>
          </div>

          {/* Results Section */}
          <div className="space-y-8">
            {generatedImage && (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <History className="w-6 h-6 mr-3 text-green-400" />
                  Historical Vision
                </h2>

                <div className="space-y-6">
                  <div className="relative">
                    <img
                      src={generatedImage}
                      alt="Historical version"
                      className="w-full rounded-xl shadow-lg"
                    />
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-sm font-semibold text-green-400">
                        {historicalInfo?.targetYear}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-purple-400" />
                    <span className="mx-4 text-lg font-semibold">
                      Transformed to {historicalInfo?.era}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {historicalInfo && (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-yellow-400" />
                  Historical Context
                </h2>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="font-semibold text-purple-400 mb-2">
                        Era
                      </h3>
                      <p className="text-sm">{historicalInfo.era}</p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="font-semibold text-blue-400 mb-2">
                        Architecture
                      </h3>
                      <p className="text-sm">{historicalInfo.architecture}</p>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <h3 className="font-semibold text-green-400 mb-2">
                      Technology Level
                    </h3>
                    <p className="text-sm">{historicalInfo.technology}</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4">
                    <h3 className="font-semibold text-yellow-400 mb-2">
                      Population
                    </h3>
                    <p className="text-sm">{historicalInfo.population}</p>
                  </div>

                  {historicalInfo.changes.length > 0 && (
                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="font-semibold text-red-400 mb-2">
                        Major Changes
                      </h3>
                      <ul className="text-sm space-y-1">
                        {historicalInfo.changes.map((change, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-400 mr-2">•</span>
                            {change}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {historicalInfo.environment.length > 0 && (
                    <div className="bg-white/5 rounded-xl p-4">
                      <h3 className="font-semibold text-green-400 mb-2">
                        Environmental Differences
                      </h3>
                      <ul className="text-sm space-y-1">
                        {historicalInfo.environment.map((env, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-400 mr-2">•</span>
                            {env}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: linear-gradient(45deg, #8b5cf6, #3b82f6);
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: linear-gradient(45deg, #8b5cf6, #3b82f6);
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}
