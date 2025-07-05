import React, { useState } from "react";
import {
  Upload,
  Camera,
  MapPin,
  Calendar,
  Info,
  Loader2,
  AlertCircle,
  Star,
  Users,
  Clock,
} from "lucide-react";

const HeriInfo = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [heritageInfo, setHeritageInfo] = useState(null);
  const [error, setError] = useState(null);

  const GROQ_API_KEY = import.meta.env.VITE_XAI_API_KEY;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const base64Image = await convertImageToBase64(selectedImage);

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
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
                    text: `Analyze this image of an Indian heritage site, temple, monument, or cultural place. Please provide detailed information in JSON format with the following structure:
                  {
                    "name": "Name of the heritage site/temple/monument",
                    "location": "City, State, India",
                    "description": "Detailed description of the site",
                    "historical_significance": "Historical importance and background",
                    "architectural_style": "Architectural style and features",
                    "built_by": "Who built it",
                    "built_year": "When it was built (approximate)",
                    "best_time_to_visit": "Best time to visit",
                    "timings": "Opening hours",
                    "entry_fee": "Entry fee details",
                    "nearby_attractions": ["List of nearby attractions"],
                    "interesting_facts": ["List of interesting facts"],
                    "cultural_importance": "Cultural and religious significance",
                    "unesco_status": "UNESCO World Heritage status if applicable",
                    "rating": "Tourist rating out of 5",
                    "category": "Type (Temple, Fort, Palace, Monument, etc.)"
                  }
                  
                  If you cannot identify the specific heritage site, provide general information about the architectural style and probable region/period based on visual features.`,
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: `data:image/jpeg;base64,${base64Image}`,
                    },
                  },
                ],
              },
            ],
            max_tokens: 1500,
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      // Extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsedInfo = JSON.parse(jsonMatch[0]);
        setHeritageInfo(parsedInfo);
      } else {
        setHeritageInfo({
          name: "Heritage Site Analysis",
          description: content,
          location: "India",
          category: "Heritage Site",
        });
      }
    } catch (err) {
      console.error("Error analyzing image:", err);
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setHeritageInfo(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-800 mb-2 flex items-center justify-center gap-3">
            <Camera className="h-10 w-10" />
            Heritage Info Analyzer
          </h1>
          <p className="text-orange-600 text-lg">
            Upload images of Indian heritage sites, temples, and monuments to
            discover their rich history
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <h2 className="text-2xl font-semibold text-orange-800 mb-6 flex items-center gap-2">
              <Upload className="h-6 w-6" />
              Upload Heritage Image
            </h2>

            <div className="space-y-6">
              <div className="border-2 border-dashed border-orange-300 rounded-xl p-8 text-center hover:border-orange-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="space-y-4">
                    <div className="bg-orange-100 rounded-full p-4 inline-block">
                      <Camera className="h-8 w-8 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-700">
                        Click to upload an image
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports JPG, PNG, WebP formats
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {imagePreview && (
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden border-2 border-orange-200">
                    <img
                      src={imagePreview}
                      alt="Uploaded heritage site"
                      className="w-full h-64 object-cover"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={analyzeImage}
                      disabled={loading}
                      className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Info className="h-5 w-5" />
                          Analyze Heritage Site
                        </>
                      )}
                    </button>

                    <button
                      onClick={resetAnalysis}
                      className="px-6 py-3 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <h2 className="text-2xl font-semibold text-orange-800 mb-6 flex items-center gap-2">
              <Info className="h-6 w-6" />
              Heritage Information
            </h2>

            {!heritageInfo ? (
              <div className="text-center py-12">
                <div className="bg-orange-100 rounded-full p-6 inline-block mb-4">
                  <MapPin className="h-12 w-12 text-orange-600" />
                </div>
                <p className="text-gray-500 text-lg">
                  Upload and analyze an image to discover heritage information
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border-b border-orange-100 pb-6">
                  <h3 className="text-2xl font-bold text-orange-800 mb-2">
                    {heritageInfo.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {heritageInfo.location}
                    </div>
                    {heritageInfo.category && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        {heritageInfo.category}
                      </div>
                    )}
                    {heritageInfo.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {heritageInfo.rating}/5
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-2">
                      Description
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {heritageInfo.description}
                    </p>
                  </div>

                  {heritageInfo.historical_significance && (
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Historical Significance
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {heritageInfo.historical_significance}
                      </p>
                    </div>
                  )}

                  {heritageInfo.architectural_style && (
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2">
                        Architectural Style
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {heritageInfo.architectural_style}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {heritageInfo.built_by && (
                      <div className="bg-orange-50 rounded-lg p-4">
                        <h5 className="font-medium text-orange-800 mb-1">
                          Built By
                        </h5>
                        <p className="text-sm text-gray-700">
                          {heritageInfo.built_by}
                        </p>
                      </div>
                    )}
                    {heritageInfo.built_year && (
                      <div className="bg-orange-50 rounded-lg p-4">
                        <h5 className="font-medium text-orange-800 mb-1">
                          Built Year
                        </h5>
                        <p className="text-sm text-gray-700">
                          {heritageInfo.built_year}
                        </p>
                      </div>
                    )}
                  </div>

                  {heritageInfo.best_time_to_visit && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-medium text-green-800 mb-1 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Best Time to Visit
                      </h5>
                      <p className="text-sm text-gray-700">
                        {heritageInfo.best_time_to_visit}
                      </p>
                    </div>
                  )}

                  {heritageInfo.interesting_facts &&
                    heritageInfo.interesting_facts.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-orange-800 mb-2">
                          Interesting Facts
                        </h4>
                        <ul className="space-y-1">
                          {heritageInfo.interesting_facts.map((fact, index) => (
                            <li
                              key={index}
                              className="text-gray-700 text-sm flex items-start gap-2"
                            >
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              {fact}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {heritageInfo.unesco_status && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h5 className="font-medium text-blue-800 mb-1">
                        UNESCO Status
                      </h5>
                      <p className="text-sm text-blue-700">
                        {heritageInfo.unesco_status}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeriInfo;
