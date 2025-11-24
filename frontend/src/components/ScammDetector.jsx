import React, { useState } from "react";
import {
  Upload,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  MapPin,
  Camera,
  MessageSquare,
  Loader2,
  Shield,
  Crown,
  Gem,
  Sparkles,
  Eye,
  Heart,
  TrendingUp,
  Users,
  Award,
  Globe,
  Clock,
  Bell,
  Star,
  XCircle,
  Info,
  ChevronRight,
  Compass,
  TreePine,
  Zap,
} from "lucide-react";

const ScamDetector = () => {
  const [textInput, setTextInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ["image/png", "image/jpeg", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload a valid image (PNG, JPEG, or GIF)");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        setError("Image size exceeds 10MB limit");
        return;
      }

      setImageFile(file);
      setError(null);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.onerror = () => setError("Error reading image file");
      reader.readAsDataURL(file);
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () =>
        reject(new Error("Failed to convert image to base64"));
      reader.readAsDataURL(file);
    });
  };

  const analyzeWithGroq = async () => {
    if (!textInput.trim() && !imageFile) {
      setError("Please provide either text input or upload an image");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let prompt = "";
      let messages = [];

      if (imageFile) {
        const imageBase64 = await getBase64(imageFile);
        const base64Data = imageBase64.replace(
          /^data:image\/[a-z]+;base64,/,
          ""
        );
        prompt = `I have uploaded an image related to travel/tourism in India. Please analyze this image and tell me if what's shown appears to be a tourist scam or legitimate based on typical Indian prices and common scam patterns.

        Look for:
        - Overpriced tickets or services
        - Fake official documents
        - Overpriced souvenirs
        - Suspicious tour packages
        - Fake certificates or authenticity claims

        Here are actual prices in India for reference:
        - Taj Mahal entry: ₹50 for Indians, ₹1100 for foreigners
        - Red Fort entry: ₹30 for Indians, ₹500 for foreigners
        - Domestic flights: ₹3000-₹15000 typically
        - Train tickets: ₹200-₹3000 depending on class
        - Auto rickshaw: ₹10-15 per km
        - Taxi: ₹15-25 per km
        - Hotel rooms: ₹500-₹5000 per night (budget to mid-range)
        - Street food: ₹20-₹100 per item
        - Restaurant meals: ₹100-₹500 per person
        - Souvenirs: ₹50-₹500 for most items, higher for unique designs
        - Tour guides: ₹500-₹2000 per day
        - City tours: ₹500-₹3000 per person

        Answer simply: SCAM or NOT SCAM, then explain why based on typical Indian tourist prices and scam patterns.`;

        messages = [
          {
            role: "system",
            content:
              "You are a tourist scam detection expert specializing in India travel scams. Help tourists identify overpriced services, fake tickets, overpriced souvenirs, and common travel scams. Always compare prices to actual market rates in India.",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt,
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Data}`,
                },
              },
            ],
          },
        ];
      } else if (textInput.trim()) {
        prompt = `You are a tourist scam detection expert for India. Analyze this travel-related query and tell me if this is a tourist scam or not: "${textInput}"

        Here are actual prices in India for reference:
        - Taj Mahal entry: ₹50 for Indians, ₹1100 for foreigners
        - Red Fort entry: ₹30 for Indians, ₹500 for foreigners
        - Domestic flights: ₹3000-₹15000 typically
        - Train tickets: ₹200-₹3000 depending on class
        - Auto rickshaw: ₹10-15 per km
        - Taxi: ₹15-25 per km
        - Hotel rooms: ₹500-₹5000 per night (budget to mid-range)
        - Street food: ₹20-₹100 per item
        - Restaurant meals: ₹100-₹500 per person
        - Souvenirs: ₹50-₹500 for most items, higher for unique designs
        - Tour guides: ₹500-₹2000 per day
        - City tours: ₹500-₹3000 per person

        Common tourist scams in India:
        - Overpriced monument tickets
        - Fake travel agencies
        - Overcharging by taxis/autos
        - Gem/carpet scams
        - Fake government offices
        - Overpriced souvenirs
        - Fake train/flight bookings

        Answer simply: SCAM or NOT SCAM, then explain why based on typical Indian tourist prices.`;

        messages = [
          {
            role: "system",
            content:
              "You are a tourist scam detection expert specializing in India travel scams. Help tourists identify overpriced services, fake tickets, overpriced souvenirs, and common travel scams. Always compare prices to actual market rates in India.",
          },
          {
            role: "user",
            content: prompt,
          },
        ];
      }

      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: messages,
            max_tokens: 500,
            temperature: 0.3,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `API Error: ${response.status} - ${
            errorData.error?.message || "Unknown error"
          }`
        );
      }

      const data = await response.json();
      const result = data.choices[0].message.content;

      // Parse the response to extract scam status
      const isScam =
        result.toLowerCase().includes("scam") &&
        !result.toLowerCase().includes("not a scam");

      setAnalysis({
        isScam: isScam,
        explanation: result,
      });
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setTextInput("");
    setImageFile(null);
    setImagePreview(null);
    setAnalysis(null);
    setError(null);
  };

  
  const commonScams = [
    {
      icon: MapPin,
      title: "Fake Monument Tickets",
      description: "Overpriced or counterfeit entry tickets",
      example: "Taj Mahal ₹50K vs Real ₹1.1K",
    },
    {
      icon: Globe,
      title: "Gem & Carpet Scams",
      description: "Overpriced 'authentic' items with fake certificates",
      example: "₹50K carpet worth ₹2K",
    },
    {
      icon: Clock,
      title: "Travel Agency Fraud",
      description: "Fake bookings and non-existent packages",
      example: "Golden Triangle ₹1L vs Real ₹25K",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 via-pink-50 to-purple-100 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12">
          {/* Input Section */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/50 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    Describe Your Query
                  </h3>
                  <p className="text-sm text-gray-600">
                    Enter details about the offer or service
                  </p>
                </div>
              </div>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="e.g., 'Auto rickshaw asking ₹2000 from Delhi airport to city center' or 'Taj Mahal ticket for ₹50,000 per person'"
                className="w-full h-32 sm:h-40 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white/90 backdrop-blur-sm resize-none text-sm sm:text-base"
              />
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/50 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    Upload Evidence
                  </h3>
                  <p className="text-sm text-gray-600">
                    Photos of tickets, receipts, or packages
                  </p>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-400 transition-colors bg-gradient-to-br from-gray-50 to-gray-100">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 font-medium">
                    Upload image of tickets, souvenirs, or tour packages
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </label>
              </div>

              {imagePreview && (
                <div className="mt-6">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 sm:h-56 object-cover rounded-xl border-2 border-white shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={analyzeWithGroq}
                disabled={loading || (!textInput.trim() && !imageFile)}
                className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 px-6 rounded-xl hover:from-red-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all duration-300 font-bold shadow-lg text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Scam...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Analyze The Scam
                  </>
                )}
              </button>

              <button
                onClick={clearAll}
                className="px-6 py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6 sm:space-y-8">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-red-800 font-bold text-lg">
                      Warning
                    </h4>
                    <p className="text-red-600 text-sm">
                      An error occurred during analysis
                    </p>
                  </div>
                </div>
                <p className="text-red-700 bg-red-100 p-3 rounded-lg text-sm">
                  {error}
                </p>
              </div>
            )}

            {analysis && (
              <div className="space-y-6">
                {/* Main Result */}
                <div
                  className={`border-2 rounded-xl p-6 sm:p-8 shadow-2xl ${
                    analysis.isScam
                      ? "bg-gradient-to-br from-red-50 to-orange-50 border-red-200"
                      : "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg ${
                        analysis.isScam
                          ? "bg-gradient-to-br from-red-500 to-orange-500"
                          : "bg-gradient-to-br from-green-500 to-emerald-500"
                      }`}
                    >
                      {analysis.isScam ? (
                        <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      ) : (
                        <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      )}
                    </div>
                    <div>
                      <h3
                        className={`text-2xl sm:text-3xl font-bold ${
                          analysis.isScam ? "text-red-800" : "text-green-800"
                        }`}
                      >
                        {analysis.isScam
                          ? "⚠️ SCAM DETECTED"
                          : "✅ APPEARS LEGITIMATE"}
                      </h3>
                      <p
                        className={`text-sm sm:text-base ${
                          analysis.isScam ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {analysis.isScam
                          ? "Divine protection activated"
                          : "Safe to proceed"}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`p-6 rounded-xl ${
                      analysis.isScam ? "bg-red-100/80" : "bg-green-100/80"
                    } backdrop-blur-sm`}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <Info
                        className={`w-5 h-5 mt-1 ${
                          analysis.isScam ? "text-red-600" : "text-green-600"
                        }`}
                      />
                      <div>
                        <h4
                          className={`font-bold text-lg mb-2 ${
                            analysis.isScam ? "text-red-800" : "text-green-800"
                          }`}
                        >
                          Divine Analysis
                        </h4>
                        <p
                          className={`text-sm sm:text-base leading-relaxed ${
                            analysis.isScam ? "text-red-800" : "text-green-800"
                          }`}
                        >
                          {analysis.explanation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {analysis.isScam && (
                    <div className="mt-6 p-4 bg-orange-100 rounded-lg border border-orange-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="w-4 h-4 text-orange-600" />
                        <span className="font-bold text-orange-800">
                          Recommended Action
                        </span>
                      </div>
                      <p className="text-orange-700 text-sm">
                        🙏 Trust your instincts and seek alternatives. Report to
                        local authorities if needed.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Common Scams Info */}
            <div className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/50 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                    Common Tourist Scams
                  </h3>
                  <p className="text-sm text-gray-600">
                    Stay vigilant against these patterns
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {commonScams.map((scam, index) => {
                  const IconComponent = scam.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-orange-50 hover:to-red-50 transition-all duration-300"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-800 text-sm sm:text-base">
                          {scam.title}
                        </h4>
                        <p className="text-gray-600 text-xs sm:text-sm mt-1">
                          {scam.description}
                        </p>
                        <p className="text-red-600 font-medium text-xs mt-2">
                          Example: {scam.example}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cultural Quote */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10 text-center">
                <Gem className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-4 opacity-80" />
                <blockquote className="text-base sm:text-lg font-bold mb-3 italic">
                  "सत्यमेव जयते"
                </blockquote>
                <p className="text-white/90 text-sm sm:text-base mb-2">
                  "Truth alone triumphs"
                </p>
                <p className="text-white/70 text-xs sm:text-sm">
                  - Mundaka Upanishad | Your shield against deception
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScamDetector;
