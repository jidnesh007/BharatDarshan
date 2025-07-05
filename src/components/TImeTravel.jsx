import React, { useState, useRef } from "react";
import {
  Clock,
  Upload,
  Zap,
  Calendar,
  MapPin,
  Camera,
  Sparkles,
  History,
  AlertCircle,
} from "lucide-react";

export default function TimeTravel() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [timePeriod, setTimePeriod] = useState(50); // default 50 years, max 100
  const [isGenerating, setIsGenerating] = useState(false);
  const [placeName, setPlaceName] = useState(null);
  const [wikiSummary, setWikiSummary] = useState(null);
  const [wikiThumbnail, setWikiThumbnail] = useState(null);
  const [historicalImages, setHistoricalImages] = useState([]);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setPlaceName(null);
        setWikiSummary(null);
        setWikiThumbnail(null);
        setHistoricalImages([]);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImageWithGroq = async (imageBase64) => {
    const apiKey = import.meta.env.VITE_XAI_API_KEY;
    if (!apiKey) {
      throw new Error("Groq API key is missing in .env file");
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Analyze this image and identify the specific location, landmark, or place shown. Provide only the exact name of the place or landmark as it appears on Wikipedia, and nothing else. Be as specific as possible (for example, 'Eiffel Tower', 'Taj Mahal', 'Times Square', 'Golden Gate Bridge').`,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: imageBase64,
                  },
                },
              ],
            },
          ],
          max_tokens: 50,
          temperature: 0.1,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Groq API Error: ${errorData.error?.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || "Unknown location";
  };

  const generateHistoricalImage = async () => {
    if (!uploadedImage) {
      setError("No image uploaded");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Step 1: Analyze image with Groq
      console.log("Analyzing image with Groq...");
      const identifiedPlace = await analyzeImageWithGroq(uploadedImage);
      console.log("Identified Place:", identifiedPlace);
      if (identifiedPlace === "Unknown location") {
        throw new Error("Could not identify a valid place from the image");
      }
      setPlaceName(identifiedPlace);

      // Step 2: Get Wikipedia summary
      const wikiResponse = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          identifiedPlace
        )}`
      );

      if (!wikiResponse.ok) {
        throw new Error(
          `Wikipedia API failed: ${wikiResponse.status} ${wikiResponse.statusText}`
        );
      }

      const wikiData = await wikiResponse.json();
      setWikiSummary(wikiData.extract || "No summary available");
      setWikiThumbnail(wikiData.thumbnail?.source || null);

      // Step 3: Search for historical images on Wikimedia Commons
      const targetYear = new Date().getFullYear() - timePeriod;
      console.log(`Searching for historical images near year: ${targetYear}`);

      // Search with specific year
      const commonsResponse = await fetch(
        `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
          identifiedPlace
        )} ${targetYear}&srnamespace=6&srlimit=10&format=json&origin=*`
      );

      if (!commonsResponse.ok) {
        throw new Error(
          `Wikimedia Commons API failed: ${commonsResponse.status} ${commonsResponse.statusText}`
        );
      }

      const commonsData = await commonsResponse.json();
      let images = commonsData.query.search
        .filter((item) => item.title.startsWith("File:"))
        .map((item) => ({
          title: item.title,
          pageid: item.pageid,
        }));

      // If no exact year match, try broader search with historical terms
      if (images.length === 0) {
        console.log("No exact year match, trying broader historical search...");
        const historicalTerms = [
          "historical",
          "vintage",
          "old",
          "archive",
          "past",
        ];

        for (const term of historicalTerms) {
          const broadResponse = await fetch(
            `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
              identifiedPlace
            )} ${term}&srnamespace=6&srlimit=10&format=json&origin=*`
          );

          if (broadResponse.ok) {
            const broadData = await broadResponse.json();
            const newImages = broadData.query.search
              .filter((item) => item.title.startsWith("File:"))
              .map((item) => ({
                title: item.title,
                pageid: item.pageid,
              }));

            images = [...images, ...newImages];
            if (images.length >= 5) break; // Stop when we have enough images
          }
        }
      }

      // Get image URLs
      const imageUrls = [];
      for (const image of images.slice(0, 6)) {
        try {
          const infoResp = await fetch(
            `https://commons.wikimedia.org/w/api.php?action=query&pageids=${image.pageid}&prop=imageinfo&iiprop=url&format=json&origin=*`
          );

          if (infoResp.ok) {
            const infoData = await infoResp.json();
            const info = infoData.query.pages[image.pageid].imageinfo;
            if (info && info[0]?.url) {
              imageUrls.push(info[0].url);
            }
          }
        } catch (err) {
          console.warn(`Failed to get URL for image ${image.title}:`, err);
        }
      }

      setHistoricalImages(imageUrls);

      if (imageUrls.length === 0) {
        setError(
          "No historical images found for this location and time period. The place might not have documented historical imagery available."
        );
      }
    } catch (err) {
      console.error("Error in generateHistoricalImage:", err);
      setError(err.message || "An error occurred while processing the request");
    } finally {
      setIsGenerating(false);
    }
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
            looked decades ago using AI-powered place recognition
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

            {/* Time Period */}
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
                    min="10"
                    max="100"
                    step="10"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>10 years</span>
                    <span>100 years</span>
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
                  Analyzing with AI & Searching History...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Generate Historical Vision
                </div>
              )}
            </button>
          </div>

          {/* Results Section */}
          <div className="space-y-8">
            {error && (
              <div className="bg-red-500/20 backdrop-blur-lg rounded-3xl p-8 border border-red-500/30">
                <h2 className="text-2xl font-bold mb-6 text-red-400 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-3" />
                  Error
                </h2>
                <p>{error}</p>
              </div>
            )}

            {placeName && (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-yellow-400" />
                  AI Identified Place
                </h2>
                <p className="text-lg font-semibold text-yellow-200">
                  {placeName}
                </p>
              </div>
            )}

            {wikiSummary && (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <History className="w-6 h-6 mr-3 text-green-400" />
                  Wikipedia Summary
                </h2>
                <p className="text-gray-200 leading-relaxed">{wikiSummary}</p>
              </div>
            )}

            {wikiThumbnail && (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Camera className="w-6 h-6 mr-3 text-blue-400" />
                  Current Reference Image
                </h2>
                <img
                  src={wikiThumbnail}
                  alt="Wikipedia Reference"
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            )}

            {(placeName || historicalImages.length > 0) && (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <History className="w-6 h-6 mr-3 text-green-400" />
                  Historical Images ({new Date().getFullYear() - timePeriod}s
                  Era)
                </h2>
                {historicalImages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {historicalImages.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Historical image ${index + 1}`}
                          className="w-full rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : placeName ? (
                  <div className="text-center py-8">
                    <Clock className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-400">
                      Searching for historical images from the{" "}
                      {new Date().getFullYear() - timePeriod}s...
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-400">
                      Upload an image to begin your time travel journey
                    </p>
                  </div>
                )}
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
