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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-blue-600" />
          Tourist Scam Detector
        </h1>
        <p className="text-gray-600">
          AI-powered analysis to detect tourist scams in India - tickets, tours,
          souvenirs, and travel services
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Text Query
            </label>
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="e.g., 'Taj Mahal ticket for ₹50,000 per person' or 'Auto rickshaw asking ₹2000 from Delhi airport to city'"
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Upload Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-color">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Upload image of tickets, souvenirs, or tour packages
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF up to 10MB
                </p>
              </label>
            </div>
          </div>

          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-full h-48 object-cover rounded-lg border"
              />
            </div>
          )}

          <button
            onClick={analyzeWithGroq}
            disabled={loading || (!textInput.trim() && !imageFile)}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
            {loading ? "Analyzing..." : "Analyze for Tourist Scams"}
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="text-red-800 font-medium">Error</span>
              </div>
              <p className="text-red-700 mt-2">{error}</p>
            </div>
          )}

          {analysis && (
            <div className="space-y-4">
              {/* Scam Status */}
              <div
                className={`border rounded-lg p-6 ${
                  analysis.isScam
                    ? "bg-red-50 border-red-200"
                    : "bg-green-50 border-green-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  {analysis.isScam ? (
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  ) : (
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  )}
                  <div>
                    <h3
                      className={`text-2xl font-bold ${
                        analysis.isScam ? "text-red-800" : "text-green-800"
                      }`}
                    >
                      {analysis.isScam ? "SCAM DETECTED" : "NOT A SCAM"}
                    </h3>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-lg ${
                    analysis.isScam ? "bg-red-100" : "bg-green-100"
                  }`}
                >
                  <p
                    className={`text-lg leading-relaxed ${
                      analysis.isScam ? "text-red-800" : "text-green-800"
                    }`}
                  >
                    {analysis.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Example Queries */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              Example Tourist Scam Queries:
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• "Taj Mahal entry ticket for ₹50,000 per person"</p>
              <p>• "Auto rickshaw from airport to city for ₹2000"</p>
              <p>• "Delhi to Agra train ticket for ₹5000"</p>
              <p>• "Pashmina shawl for ₹10,000"</p>
              <p>• "Golden Triangle tour package for ₹50,000"</p>
              <p>• Upload images of tickets, souvenirs, or tour brochures</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScamDetector;
