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
  Crown,
  Gem,
  Eye,
  TreePine,
  Globe,
  ChevronRight,
  Star,
  Sun,
  Moon,
  Compass,
  BookOpen,
  Award,
  PlayCircle,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  Share,
  Download,
  Search,
  Filter,
  Bell,
  Settings,
  Info,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
} from "lucide-react";

export default function TimeTravel() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [timePeriod, setTimePeriod] = useState(50);
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
                  text: "Analyze this image and identify the specific location, landmark, or place shown. Provide only the name of the place or landmark, nothing else. Be as specific as possible (e.g., 'Eiffel Tower', 'Taj Mahal', 'Times Square', 'Golden Gate Bridge') and don't provide fullstop at the end of name.",
                },
                {
                  type: "image_url",
                  image_url: { url: imageBase64 },
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
      console.log("Analyzing image with Groq...");
      const identifiedPlace = await analyzeImageWithGroq(uploadedImage);
      console.log("Identified Place:", identifiedPlace);
      if (identifiedPlace === "Unknown location") {
        throw new Error("Could not identify a valid place from the image");
      }
      setPlaceName(identifiedPlace);

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

      const targetYear = new Date().getFullYear() - timePeriod;
      console.log(`Searching for historical images near year: ${targetYear}`);

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
            if (images.length >= 5) break;
          }
        }
      }

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 via-pink-50 to-purple-100 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>


      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl mb-4 sm:mb-0 sm:mr-4 shadow-lg">
                  <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Upload Sacred Image
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Begin your divine darshan
                  </p>
                </div>
              </div>

              <div
                className="border-2 border-dashed border-orange-300 rounded-2xl p-6 sm:p-8 text-center cursor-pointer hover:border-orange-400 hover:bg-orange-50/50 transition-all duration-300"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className="max-h-48 sm:max-h-64 w-full object-cover mx-auto rounded-xl shadow-2xl border-4 border-white"
                    />
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                      <p className="text-green-600 font-bold text-sm sm:text-base">
                        Sacred image uploaded successfully!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                        Upload Heritage Image
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Share a photo of any heritage site, monument, or
                        cultural landmark
                      </p>
                    </div>
                    <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-500">
                      <span>JPG</span>
                      <span>•</span>
                      <span>PNG</span>
                      <span>•</span>
                      <span>WebP</span>
                    </div>
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
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mb-4 sm:mb-0 sm:mr-4 shadow-lg">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Time Portal Settings
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Choose your temporal journey
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-base sm:text-lg font-bold text-gray-800 mb-3">
                    Years Back in Time: {timePeriod}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="10"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(parseInt(e.target.value))}
                    className="w-full h-2 sm:h-3 bg-gradient-to-r from-orange-200 to-red-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-3">
                    <span className="bg-white/50 px-2 sm:px-3 py-1 rounded-full">
                      10 years
                    </span>
                    <span className="bg-white/50 px-2 sm:px-3 py-1 rounded-full">
                      100 years
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl p-4 sm:p-6 text-white text-center shadow-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <History className="w-5 h-5 sm:w-6 sm:h-6" />
                    <span className="text-base sm:text-lg font-bold">
                      Target Era
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mb-2">
                    {new Date().getFullYear() - timePeriod}
                  </div>
                  <p className="text-white/90 text-sm sm:text-base">
                    Witness the golden age of {timePeriod} years ago
                  </p>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateHistoricalImage}
              disabled={!uploadedImage || isGenerating}
              className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 sm:py-5 px-6 sm:px-8 rounded-xl text-base sm:text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-xl"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>🔍 AI Analyzing Sacred Site...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>🚀 Begin Time Travel Journey</span>
                </div>
              )}
            </button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex flex-col sm:flex-row items-center mb-4">
                  <div className="p-3 bg-red-500 rounded-xl mb-4 sm:mb-0 sm:mr-4">
                    <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-red-700">
                      Journey Interrupted
                    </h2>
                    <p className="text-red-600 text-sm">
                      Unable to complete time travel
                    </p>
                  </div>
                </div>
                <div className="bg-white/80 rounded-2xl p-4 sm:p-6 border border-red-100">
                  <p className="text-red-700 leading-relaxed text-sm sm:text-base">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {placeName && (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6">
                  <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl mb-4 sm:mb-0 sm:mr-4 shadow-lg">
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                      AI Vision Recognition
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Sacred site identified by divine AI
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 sm:p-6 border border-yellow-200">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-gray-800">
                        {placeName}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Heritage site identified
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {wikiSummary && (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl mb-4 sm:mb-0 sm:mr-4 shadow-lg">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                      Sacred Chronicles
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Historical wisdom from ancient texts
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-4 sm:p-6 border border-green-200">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {wikiSummary}
                  </p>
                </div>
              </div>
            )}

            {wikiThumbnail && (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl mb-4 sm:mb-0 sm:mr-4 shadow-lg">
                    <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                      Present Day Darshan
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Current reference image
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 border border-blue-200">
                  <img
                    src={wikiThumbnail}
                    alt="Current Reference"
                    className="w-full rounded-xl shadow-2xl border-4 border-white"
                  />
                </div>
              </div>
            )}

            {(placeName || historicalImages.length > 0) && (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-center mb-4 sm:mb-6">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-4 sm:mb-0 sm:mr-4 shadow-lg">
                    <History className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                      Historical Time Portal
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Journey to the {new Date().getFullYear() - timePeriod}s
                      era
                    </p>
                  </div>
                </div>

                {historicalImages.length > 0 ? (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 border border-purple-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {historicalImages.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`Historical image ${index + 1}`}
                            className="w-full rounded-xl shadow-2xl border-4 border-white hover:shadow-3xl transition-all duration-300 transform group-hover:scale-105"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                              <p className="text-xs sm:text-sm font-medium">
                                Historical Image {index + 1}
                              </p>
                              <p className="text-xs text-white/80">
                                From the {new Date().getFullYear() - timePeriod}
                                s era
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : placeName ? (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 sm:p-12 text-center border border-purple-200">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                      <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      🔮 Time Portal Activating
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      Our AI time travelers are journeying to the{" "}
                      <span className="font-bold text-purple-600">
                        {new Date().getFullYear() - timePeriod}s
                      </span>{" "}
                      to gather sacred historical images...
                    </p>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 sm:p-12 text-center border border-orange-200">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                      <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      🏛 Begin Your Sacred Journey
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      Upload an image of any heritage site to witness its divine
                      transformation through time
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cultural Footer */}
      <div className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white py-8 sm:py-12 mt-12 sm:mt-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center space-x-0 sm:space-x-3 mb-4">
            <Crown className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-0" />
            <h3 className="text-xl sm:text-2xl font-bold">
              Heritage AI Time Travel
            </h3>
          </div>
          <p className="text-white/90 max-w-xl sm:max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            Experience the divine connection between past and present through
            AI-powered heritage exploration. Every journey through time is a
            step closer to understanding our eternal cultural legacy.
          </p>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-6">
            <button className="bg-white/20 backdrop-blur-lg px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-white/30 transition-colors font-medium text-sm sm:text-base">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
              Save Journey
            </button>
            <button className="bg-white/20 backdrop-blur-lg px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-white/30 transition-colors font-medium text-sm sm:text-base">
              <Share className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
              Share Experience
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, #f97316, #dc2626);
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, #f97316, #dc2626);
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        @media (max-width: 640px) {
          .slider::-webkit-slider-thumb {
            width: 16px;
            height: 16px;
          }
          .slider::-moz-range-thumb {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  );
}
