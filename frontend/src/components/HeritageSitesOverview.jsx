import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Award,
  Shield,
  Clock,
  AlertTriangle,
  Star,
  Loader2,
} from "lucide-react";

const HeritageSitesOverview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [heritageSites, setHeritageSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);
  const [error, setError] = useState(null);

  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
  const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

  const callGroqAPI = async (prompt) => {
    if (!GROQ_API_KEY || GROQ_API_KEY === "YOUR_GROQ_API_KEY") {
      throw new Error("Groq API key is not configured.");
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "system",
            content:
              "You are a heritage preservation expert. Provide detailed, accurate information about Indian heritage sites in a structured JSON format. Always include preservation scores, threats, conservation efforts, and current status.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Groq API error: ${errorData.error?.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const fetchHeritageData = async (siteName = "") => {
    setLoading(true);
    setError(null);

    try {
      const searchQuery = siteName.trim() || "major Indian heritage sites";
      const prompt = `
        Provide detailed information about ${searchQuery} in India. Return the data as a JSON array with objects containing:
        {
          "id": unique_number,
          "name": "Site Name",
          "location": "City, State",
          "type": "Type of heritage site",
          "yearBuilt": "Construction period",
          "unescoPriority": "UNESCO status or heritage classification",
          "image": "appropriate emoji",
          "preservationScore": numerical_score_0_to_100,
          "rating": decimal_rating_1_to_5,
          "status": "Current preservation status",
          "threats": ["array", "of", "current", "threats"],
          "conservationEfforts": ["array", "of", "conservation", "efforts"],
          "funding": "Annual funding information",
          "visitorsPerYear": "Annual visitor numbers",
          "lastRestoration": "Year of last restoration",
          "description": "Brief description of current preservation challenges and status"
        }
        Return only the JSON array.
      `;

      const groqResponse = await callGroqAPI(prompt);
      const jsonMatch = groqResponse.match(/\[[\s\S]*\]/);
      const jsonString = jsonMatch ? jsonMatch[0] : groqResponse;
      const parsedData = JSON.parse(jsonString);

      const processedData = parsedData.map((site, index) => ({
        ...site,
        id: site.id || index + 1,
        preservationScore: Math.max(
          0,
          Math.min(100, Number(site.preservationScore) || 70)
        ),
        rating: Math.max(1, Math.min(5, Number(site.rating) || 3.5)),
        threats: Array.isArray(site.threats) ? site.threats : [],
        conservationEfforts: Array.isArray(site.conservationEfforts)
          ? site.conservationEfforts
          : [],
      }));

      setHeritageSites(processedData);
    } catch (err) {
      console.error("Error fetching heritage data:", err);
      
      setHeritageSites([
        {
          id: 1,
          name: "Taj Mahal",
          location: "Agra, Uttar Pradesh",
          type: "Mughal Mausoleum",
          yearBuilt: "1631-1648",
          unescoPriority: "World Heritage Site",
          image: "🕌",
          preservationScore: 85,
          rating: 4.2,
          status: "Well Preserved",
          threats: [
            "Air pollution",
            "Acid rain",
            "Tourism pressure",
            "Yamuna river pollution",
          ],
          conservationEfforts: [
            "Marble cleaning",
            "Visitor restrictions",
            "Pollution monitoring",
            "Structural reinforcement",
          ],
          funding: "₹15 Crores annually",
          visitorsPerYear: "6-8 Million",
          lastRestoration: "2023",
          description:
            "The Taj Mahal faces challenges from air pollution causing yellowing of marble and acid rain damage.",
        },
        {
          id: 2,
          name: "Khajuraho Group of Monuments",
          location: "Khajuraho, Madhya Pradesh",
          type: "Hindu and Jain Temples",
          yearBuilt: "950-1050 CE",
          unescoPriority: "World Heritage Site",
          image: "🛕",
          preservationScore: 78,
          rating: 3.9,
          status: "Good Condition",
          threats: [
            "Sandstone weathering",
            "Vandalism",
            "Limited funding",
            "Vegetation growth",
          ],
          conservationEfforts: [
            "Stone conservation",
            "Security enhancement",
            "Digital documentation",
            "Vegetation management",
          ],
          funding: "₹8 Crores annually",
          visitorsPerYear: "1.2 Million",
          lastRestoration: "2022",
          description:
            "The temples face challenges from natural weathering and human impact.",
        },
        {
          id: 3,
          name: "Hampi",
          location: "Hampi, Karnataka",
          type: "Vijayanagara Empire Capital",
          yearBuilt: "14th-16th Century",
          unescoPriority: "World Heritage Site",
          image: "🏛️",
          preservationScore: 65,
          rating: 3.2,
          status: "At Risk",
          threats: [
            "Illegal mining",
            "Encroachment",
            "Lack of maintenance",
            "Natural erosion",
          ],
          conservationEfforts: [
            "Archaeological surveys",
            "Legal protection",
            "Community awareness",
            "Tourism management",
          ],
          funding: "₹5 Crores annually",
          visitorsPerYear: "800,000",
          lastRestoration: "2021",
          description:
            "Hampi requires urgent attention due to illegal mining and encroachment issues.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchWikipediaData = async (siteName) => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          siteName
        )}`
      );
      if (response.ok) {
        const data = await response.json();
        return {
          extract: data.extract,
          thumbnail: data.thumbnail?.source,
          pageUrl: data.content_urls?.desktop?.page,
        };
      }
    } catch (error) {
      console.error("Wikipedia API error:", error);
    }
    return null;
  };

  useEffect(() => {
    fetchHeritageData();
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      fetchHeritageData(searchTerm);
    } else {
      fetchHeritageData();
    }
  };

  const getStatusColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getStatusIcon = (score) => {
    if (score >= 80) return <Shield className="w-4 h-4" />;
    if (score >= 60) return <Clock className="w-4 h-4" />;
    return <AlertTriangle className="w-4 h-4" />;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <Star className="w-4 h-4 fill-yellow-400/50 text-yellow-400" />
        )}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="text-sm font-medium text-gray-700 ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8 px-4 sm:px-0">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1F2937] mb-3 tracking-tight">
          🇮🇳 <span className="text-[#DC2626]">Heritage Sites</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
          Discover and preserve the legacy of India's cultural heritage .
        </p>

        {(!GROQ_API_KEY || GROQ_API_KEY === "YOUR_GROQ_API_KEY") && (
          <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md text-sm sm:text-base max-w-md mx-auto">
            ⚠️ <strong>Groq API key missing:</strong> Please set your API key to
            unlock full functionality.
          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search sites (e.g., Taj Mahal, Hampi)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Search
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2" />
          {error}
        </div>
      )}

      {/* Heritage Sites List */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Award className="w-5 h-5 mr-2 text-orange-500" />
          Heritage Sites
          {heritageSites.length > 0 && (
            <span className="ml-2 text-xs text-gray-600">
              ({heritageSites.length} sites)
            </span>
          )}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
            <span className="ml-2 text-gray-600 text-sm">Analyzing...</span>
          </div>
        ) : heritageSites.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🏛️</div>
            <h3 className="text-base font-medium text-gray-800 mb-1">
              No Sites Found
            </h3>
            <p className="text-xs text-gray-600">
              Try searching for a specific heritage site
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {heritageSites.map((site) => (
              <div
                key={site.id}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedSite?.id === site.id
                    ? "border-orange-300 bg-orange-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() =>
                  setSelectedSite(selectedSite?.id === site.id ? null : site)
                }
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="flex items-start space-x-3 w-full sm:w-auto">
                    <div className="text-3xl">{site.image}</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {site.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{site.location}</span>
                        <span className="hidden sm:inline">•</span>
                        <span>{site.type}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-600">
                        <Calendar className="w-3 h-3" />
                        <span>{site.yearBuilt}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="font-medium text-blue-600">
                          {site.unescoPriority}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-0 sm:text-right w-full sm:w-auto">
                    <div className="flex items-center sm:justify-end space-x-2 mb-2">
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(
                          site.preservationScore
                        )}`}
                      >
                        {getStatusIcon(site.preservationScore)}
                        <span>{site.status}</span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-800 mb-1 sm:text-right">
                      {site.preservationScore}%
                    </div>
                    <div className="sm:text-right">
                      {renderStars(site.rating)}
                    </div>
                  </div>
                </div>

                {selectedSite?.id === site.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                          Site Information
                        </h4>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Visitors:</span>
                            <span className="font-medium">
                              {site.visitorsPerYear}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Funding:</span>
                            <span className="font-medium">{site.funding}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">
                              Last Restoration:
                            </span>
                            <span className="font-medium">
                              {site.lastRestoration}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <h4 className="font-semibold text-gray-800 mb-1 text-sm">
                            AI Analysis
                          </h4>
                          <p className="text-xs text-gray-600">
                            {site.description}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                          Current Threats
                        </h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {site.threats.map((threat, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
                            >
                              {threat}
                            </span>
                          ))}
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                          Conservation Efforts
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {site.conservationEfforts.map((effort, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                            >
                              {effort}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeritageSitesOverview;
