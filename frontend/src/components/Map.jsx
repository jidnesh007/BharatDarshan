import React, { useState, useEffect, useRef } from "react";

const Map = ({
  className = "",
  height = "400px",
  showControls = true,
  initialCenter = [20.5937, 78.9629],
  initialZoom = 5,
  onSiteSelect = null,
}) => {
  const [heritageData, setHeritageData] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSites, setFilteredSites] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const mapId = useRef(
    `heritage-map-${Math.random().toString(36).substr(2, 9)}`
  );

  // Enhanced heritage site categories with UNIQUE Flaticon symbols and colors
  const siteCategories = {
    Monument: {
      color: "#f59e0b",
      symbol: "/images/mon.png",
      shape: "square",
      textColor: "#ffffff",
    },
    Temple: {
      color: "#8b5cf6",
      symbol: "/images/temp.png",
      shape: "triangle",
      textColor: "#ffffff",
    },
    Fort: {
      color: "#dc2626",
      symbol: "/images/temp.png",
      shape: "pentagon",
      textColor: "#ffffff",
    },
    Palace: {
      color: "#0ea5e9",
      symbol: "https://cdn-icons-png.flaticon.com/512/2316/2316968.png",
      shape: "diamond",
      textColor: "#ffffff",
    },
    "Archaeological Site": {
      color: "#059669",
      symbol: "https://cdn-icons-png.flaticon.com/512/3062/3062623.png",
      shape: "hexagon",
      textColor: "#ffffff",
    },
    "Natural Heritage": {
      color: "#65a30d",
      symbol: "https://cdn-icons-png.flaticon.com/512/1888/1888423.png",
      shape: "circle",
      textColor: "#ffffff",
    },
    Museum: {
      color: "#ea580c",
      symbol: "https://cdn-icons-png.flaticon.com/512/3143/3143463.png",
      shape: "square",
      textColor: "#ffffff",
    },
    "Religious Site": {
      color: "#7c3aed",
      symbol: "https://cdn-icons-png.flaticon.com/512/3062/3062608.png",
      shape: "star",
      textColor: "#ffffff",
    },
    Cave: {
      color: "#6b7280",
      symbol: "https://cdn-icons-png.flaticon.com/512/3062/3062610.png",
      shape: "circle",
      textColor: "#ffffff",
    },
    Garden: {
      color: "#16a34a",
      symbol: "https://cdn-icons-png.flaticon.com/512/1888/1888426.png",
      shape: "flower",
      textColor: "#ffffff",
    },
  };

  // Function to create custom marker HTML with different shapes
  const createMarkerHTML = (site) => {
    const category = siteCategories[site.type] || siteCategories.Monument;
    const baseSize = 32;
    const symbolSize = 16;

    const shapeStyles = {
      circle: `
        width: ${baseSize}px; 
        height: ${baseSize}px; 
        border-radius: 50%;
      `,
      square: `
        width: ${baseSize}px; 
        height: ${baseSize}px; 
        border-radius: 4px;
      `,
      triangle: `
        width: 0; 
        height: 0; 
        border-left: ${baseSize / 2}px solid transparent;
        border-right: ${baseSize / 2}px solid transparent;
        border-bottom: ${baseSize}px solid ${category.color};
        background: transparent;
        position: relative;
      `,
      diamond: `
        width: ${baseSize}px; 
        height: ${baseSize}px; 
        transform: rotate(45deg);
        border-radius: 4px;
      `,
      pentagon: `
        width: ${baseSize}px; 
        height: ${baseSize}px; 
        clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
      `,
      hexagon: `
        width: ${baseSize}px; 
        height: ${baseSize}px; 
        clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
      `,
      star: `
        width: ${baseSize}px; 
        height: ${baseSize}px; 
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
      `,
      flower: `
        width: ${baseSize}px; 
        height: ${baseSize}px; 
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      `,
    };

    const shapeStyle = shapeStyles[category.shape] || shapeStyles.circle;

    if (category.shape === "triangle") {
      return `
        <div style="position: relative; width: ${baseSize}px; height: ${baseSize}px;">
          <div style="
            ${shapeStyle}
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
            border: 2px solid white;
          "></div>
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -30%);
            width: ${symbolSize}px;
            height: ${symbolSize}px;
            background: url('${category.symbol}') center/contain no-repeat;
            z-index: 10;
          "></div>
        </div>
      `;
    } else if (category.shape === "diamond") {
      return `
        <div style="position: relative; width: ${baseSize}px; height: ${baseSize}px;">
          <div style="
            ${shapeStyle}
            background: ${category.color};
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
            border: 2px solid white;
          "></div>
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            width: ${symbolSize}px;
            height: ${symbolSize}px;
            background: url('${category.symbol}') center/contain no-repeat;
            z-index: 10;
          "></div>
        </div>
      `;
    } else {
      return `
        <div style="
          ${shapeStyle}
          background: ${category.color};
          border: 3px solid white;
          box-shadow: 0 3px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
        ">
          <div style="
            width: ${symbolSize}px;
            height: ${symbolSize}px;
            background: url('${category.symbol}') center/contain no-repeat;
          "></div>
        </div>
      `;
    }
  };

  // Enhanced heritage data with more details
  const fallbackHeritageData = [
    {
      id: 1,
      name: "Taj Mahal",
      lat: 27.1751,
      lng: 78.0421,
      type: "Monument",
      description:
        "A symbol of eternal love and Mughal architecture masterpiece",
      period: "1632-1653 CE",
      dynasty: "Mughal",
      significance: "UNESCO World Heritage Site",
      bestTime: "Oct-Mar",
      rating: 4.9,
      visitors: "6-7 million/year",
      image:
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&h=200&fit=crop",
      highlights: [
        "Marble inlay work",
        "Symmetrical gardens",
        "Moonlight viewing",
      ],
    },
    {
      id: 2,
      name: "Red Fort",
      lat: 28.6562,
      lng: 77.241,
      type: "Fort",
      description: "Historic fortified palace of Mughal emperors in Delhi",
      period: "1638-1648 CE",
      dynasty: "Mughal",
      significance: "UNESCO World Heritage Site",
      bestTime: "Nov-Mar",
      rating: 4.6,
      visitors: "3-4 million/year",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&h=200&fit=crop",
      highlights: ["Red sandstone walls", "Diwan-i-Khas", "Sound & Light show"],
    },
    {
      id: 3,
      name: "Qutub Minar",
      lat: 28.5245,
      lng: 77.1855,
      type: "Monument",
      description: "Tallest brick minaret in the world",
      period: "1199-1220 CE",
      dynasty: "Delhi Sultanate",
      significance: "UNESCO World Heritage Site",
      bestTime: "Oct-Mar",
      rating: 4.5,
      visitors: "2-3 million/year",
      image:
        "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=300&h=200&fit=crop",
      highlights: [
        "Indo-Islamic architecture",
        "Iron Pillar",
        "Intricate carvings",
      ],
    },
    {
      id: 4,
      name: "Hampi",
      lat: 15.335,
      lng: 76.46,
      type: "Archaeological Site",
      description: "Ruins of the magnificent Vijayanagara Empire",
      period: "14th-16th century CE",
      dynasty: "Vijayanagara Empire",
      significance: "UNESCO World Heritage Site",
      bestTime: "Oct-Mar",
      rating: 4.7,
      visitors: "500K-1M/year",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=200&fit=crop",
      highlights: ["Vittala Temple", "Stone Chariot", "Matanga Hill"],
    },
    {
      id: 5,
      name: "Khajuraho Temples",
      lat: 24.8318,
      lng: 79.9199,
      type: "Temple",
      description: "Famous for intricate sculptures and temple architecture",
      period: "950-1050 CE",
      dynasty: "Chandela Dynasty",
      significance: "UNESCO World Heritage Site",
      bestTime: "Oct-Mar",
      rating: 4.4,
      visitors: "1-2 million/year",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      highlights: [
        "Erotic sculptures",
        "Kandariya Mahadeva",
        "Light & Sound show",
      ],
    },
    {
      id: 6,
      name: "Ajanta Caves",
      lat: 20.5519,
      lng: 75.7033,
      type: "Cave",
      description: "Ancient Buddhist cave monuments with exquisite paintings",
      period: "2nd century BCE - 6th century CE",
      dynasty: "Multiple periods",
      significance: "UNESCO World Heritage Site",
      bestTime: "Nov-Mar",
      rating: 4.6,
      visitors: "800K-1M/year",
      image:
        "https://images.unsplash.com/photo-1601115177090-bfbae27d9da8?w=300&h=200&fit=crop",
      highlights: [
        "Buddhist frescoes",
        "Chaitya halls",
        "Bodhisattva paintings",
      ],
    },
    {
      id: 7,
      name: "Mysore Palace",
      lat: 12.3051,
      lng: 76.6551,
      type: "Palace",
      description: "Magnificent palace of the Wodeyar dynasty",
      period: "1912 CE",
      dynasty: "Wodeyar Dynasty",
      significance: "Royal residence",
      bestTime: "Oct-Mar",
      rating: 4.5,
      visitors: "2-3 million/year",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=200&fit=crop",
      highlights: ["Illuminated palace", "Durbar Hall", "Royal artifacts"],
    },
    {
      id: 8,
      name: "Konark Sun Temple",
      lat: 19.8876,
      lng: 86.0945,
      type: "Temple",
      description: "Architectural marvel dedicated to Sun God",
      period: "13th century CE",
      dynasty: "Eastern Ganga Dynasty",
      significance: "UNESCO World Heritage Site",
      bestTime: "Oct-Mar",
      rating: 4.7,
      visitors: "1-2 million/year",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=200&fit=crop",
      highlights: ["Chariot wheels", "Erotic sculptures", "Sunrise views"],
    },
    {
      id: 9,
      name: "Meenakshi Temple",
      lat: 9.9195,
      lng: 78.1193,
      type: "Temple",
      description: "Magnificent Dravidian temple complex",
      period: "12th century CE",
      dynasty: "Pandyan Dynasty",
      significance: "Active Hindu temple",
      bestTime: "Oct-Mar",
      rating: 4.8,
      visitors: "1-2 million/year",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=200&fit=crop",
      highlights: [
        "Colorful gopurams",
        "Thousand pillar hall",
        "Daily rituals",
      ],
    },
    {
      id: 10,
      name: "Brihadeeswarar Temple",
      lat: 10.7825,
      lng: 79.1317,
      type: "Temple",
      description: "Chola architectural masterpiece",
      period: "11th century CE",
      dynasty: "Chola Dynasty",
      significance: "UNESCO World Heritage Site",
      bestTime: "Oct-Mar",
      rating: 4.7,
      visitors: "500K-1M/year",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=200&fit=crop",
      highlights: ["Tallest temple tower", "Chola bronzes", "Massive Nandi"],
    },
    {
      id: 11,
      name: "Lotus Temple",
      lat: 28.5535,
      lng: 77.2588,
      type: "Religious Site",
      description: "Modern architectural marvel and Bahá'í House of Worship",
      period: "1986 CE",
      dynasty: "Modern",
      significance: "Bahá'í House of Worship",
      bestTime: "Oct-Mar",
      rating: 4.6,
      visitors: "4-5 million/year",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=200&fit=crop",
      highlights: [
        "Lotus-shaped architecture",
        "Meditation hall",
        "Beautiful gardens",
      ],
    },
    {
      id: 12,
      name: "Shalimar Bagh",
      lat: 34.1608,
      lng: 74.8734,
      type: "Garden",
      description: "Mughal garden with terraced lawns and fountains",
      period: "1619 CE",
      dynasty: "Mughal",
      significance: "UNESCO World Heritage Site",
      bestTime: "Apr-Oct",
      rating: 4.5,
      visitors: "200K-500K/year",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=200&fit=crop",
      highlights: ["Chinar trees", "Terraced gardens", "Dal Lake views"],
    },
    {
      id: 13,
      name: "National Museum",
      lat: 28.6117,
      lng: 77.2197,
      type: "Museum",
      description: "Premier museum showcasing India's cultural heritage",
      period: "1949 CE",
      dynasty: "Modern",
      significance: "National Museum",
      bestTime: "Oct-Mar",
      rating: 4.3,
      visitors: "1 million/year",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=200&fit=crop",
      highlights: ["Ancient artifacts", "Miniature paintings", "Buddhist art"],
    },
    {
      id: 14,
      name: "Sundarbans National Park",
      lat: 21.9497,
      lng: 88.9468,
      type: "Natural Heritage",
      description: "Largest mangrove forest and Bengal tiger habitat",
      period: "Ancient",
      dynasty: "Nature",
      significance: "UNESCO World Heritage Site",
      bestTime: "Nov-Mar",
      rating: 4.4,
      visitors: "200K/year",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=200&fit=crop",
      highlights: ["Royal Bengal tigers", "Mangrove forests", "Boat safaris"],
    },
  ];

  // Load heritage data
  useEffect(() => {
    const loadHeritageData = async () => {
      try {
        setLoading(true);
        // Try to load from external file first
        const response = await fetch("/src/data/heri.json");
        if (response.ok) {
          const data = await response.json();
          setHeritageData(data);
        } else {
          throw new Error("External data not available");
        }
      } catch (error) {
        console.log("Using fallback heritage data");
        setHeritageData(fallbackHeritageData);
      } finally {
        setLoading(false);
      }
    };

    loadHeritageData();
  }, []);

  // Filter sites based on search and category
  useEffect(() => {
    let filtered = heritageData;

    if (searchTerm) {
      filtered = filtered.filter(
        (site) =>
          site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          site.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          site.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeFilter !== "all") {
      filtered = filtered.filter((site) => site.type === activeFilter);
    }

    setFilteredSites(filtered);
  }, [heritageData, searchTerm, activeFilter]);

  // Initialize map
  useEffect(() => {
    if (heritageData.length > 0 && !mapInitialized && !mapInstanceRef.current) {
      const initializeMap = () => {
        try {
          const mapContainer = document.getElementById(mapId.current);
          if (!mapContainer) return;

          // Create Leaflet map
          const leafletMap = window.L.map(mapId.current, {
            center: initialCenter,
            zoom: initialZoom,
            zoomControl: true,
            scrollWheelZoom: true,
          });

          // Add map tiles
          window.L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
              attribution: "© OpenStreetMap contributors",
              maxZoom: 19,
            }
          ).addTo(leafletMap);

          // Add markers for heritage sites
          heritageData.forEach((site) => {
            if (site.lat && site.lng) {
              const category =
                siteCategories[site.type] || siteCategories.Monument;

              // Create custom marker with distinct shapes
              const marker = window.L.marker([site.lat, site.lng], {
                icon: window.L.divIcon({
                  className: "custom-heritage-marker",
                  html: createMarkerHTML(site),
                  iconSize: [32, 32],
                  iconAnchor: [16, 16],
                }),
              }).addTo(leafletMap);

              const popupContent = `
                <div style="min-width: 280px; max-width: 320px; font-family: system-ui, -apple-system, sans-serif;">
                  <div style="position: relative; height: 120px; background: url('${
                    site.image || "https://via.placeholder.com/300x120"
                  }') center/cover; border-radius: 8px; margin-bottom: 12px;">
                    <div style="position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.7); color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;">
                      ${site.rating || 4.5} ⭐
                    </div>
                    <div style="position: absolute; top: 8px; left: 8px; background: ${
                      category.color
                    }; color: white; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; display: flex; align-items: center; gap: 4px;">
                      <img src="${
                        category.symbol
                      }" style="width: 12px; height: 12px;" /> ${site.type}
                    </div>
                  </div>
                  <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937; font-size: 16px;">${
                    site.name
                  }</h3>
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="color: #6b7280; font-size: 11px;">${
                      site.period || "Ancient"
                    }</span>
                    <span style="color: #6b7280; font-size: 11px;">•</span>
                    <span style="color: #6b7280; font-size: 11px;">${
                      site.dynasty || "Unknown"
                    }</span>
                  </div>
                  <p style="margin: 0 0 8px 0; font-size: 13px; color: #4b5563; line-height: 1.4;">${
                    site.description
                  }</p>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px;">
                    <span style="color: #6b7280; font-size: 11px;">${
                      site.visitors || "Popular destination"
                    }</span>
                    <span style="color: #059669; font-size: 11px; font-weight: 600;">Best: ${
                      site.bestTime || "Year-round"
                    }</span>
                  </div>
                </div>
              `;

              marker.bindPopup(popupContent, {
                maxWidth: 320,
                className: "custom-popup",
              });

              marker.on("click", () => {
                setSelectedSite(site);
                if (onSiteSelect) onSiteSelect(site);
              });
            }
          });

          mapInstanceRef.current = leafletMap;
          setMapInitialized(true);
        } catch (error) {
          console.error("Error creating map:", error);
          setError(
            "Failed to initialize map. Please check if Leaflet is loaded."
          );
        }
      };

      // Ensure Leaflet is loaded
      if (window.L) {
        const timer = setTimeout(initializeMap, 100);
        return () => clearTimeout(timer);
      } else {
        setError(
          "Leaflet library not found. Please include Leaflet in your project."
        );
      }
    }
  }, [
    heritageData.length,
    mapInitialized,
    initialCenter,
    initialZoom,
    onSiteSelect,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.off();
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        } catch (error) {
          console.error("Error cleaning up map:", error);
        }
      }
    };
  }, []);

  // Toggle favorite
  const toggleFavorite = (siteId) => {
    setFavorites((prev) =>
      prev.includes(siteId)
        ? prev.filter((id) => id !== siteId)
        : [...prev, siteId]
    );
  };

  // Get unique categories
  const uniqueCategories = [...new Set(heritageData.map((site) => site.type))];

  if (loading) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Heritage Map...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1160/1160119.png"
              className="w-8 h-8"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Map Error
          </h3>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}
    >
      {/* Header with Search and Filters */}
      {showControls && (
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1946/1946392.png"
                className="w-6 h-6 mr-2"
              />
              Heritage Sites Map
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {filteredSites.length} of {heritageData.length} sites
              </span>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === "all"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All ({heritageData.length})
            </button>
            {uniqueCategories.map((category) => {
              const count = heritageData.filter(
                (site) => site.type === category
              ).length;
              const categoryData =
                siteCategories[category] || siteCategories.Monument;
              return (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
                    activeFilter === category
                      ? "text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  style={{
                    backgroundColor:
                      activeFilter === category
                        ? categoryData.color
                        : undefined,
                  }}
                >
                  <img src={categoryData.symbol} className="w-4 h-4" />
                  <span>
                    {category} ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="relative">
        <div id={mapId.current} style={{ height }} className="w-full" />

        {/* Enhanced Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200">
          <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
              className="w-4 h-4 mr-2"
            />
            Symbol Legend
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(siteCategories).map(([type, data]) => (
              <div key={type} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-sm flex items-center justify-center"
                  style={{ backgroundColor: data.color }}
                >
                  <img src={data.symbol} className="w-3 h-3" />
                </div>
                <span className="text-gray-700 truncate">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map Controls */}
        {showControls && (
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <button
              onClick={() => {
                if (mapInstanceRef.current) {
                  mapInstanceRef.current.setView(initialCenter, initialZoom);
                }
              }}
              className="bg-white hover:bg-gray-50 p-2 rounded-lg shadow-md border border-gray-200 transition-colors"
              title="Reset view"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                className="w-5 h-5"
              />
            </button>
            <button
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const { latitude, longitude } = position.coords;
                      if (mapInstanceRef.current) {
                        mapInstanceRef.current.setView(
                          [latitude, longitude],
                          10
                        );
                      }
                    },
                    (error) => {
                      console.error("Geolocation error:", error);
                    }
                  );
                }
              }}
              className="bg-white hover:bg-gray-50 p-2 rounded-lg shadow-md border border-gray-200 transition-colors"
              title="My location"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                className="w-5 h-5"
              />
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-center py-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <button
          className="group relative px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out border-2 border-transparent hover:border-orange-300 overflow-hidden"
          onClick={() => {
            // Navigate to live map route
            window.location.href = "/live-map";
          }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>

          {/* Button content */}
          <div className="relative flex items-center gap-2">
            <svg
              className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="tracking-wide">View Live Map</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>

          {/* Ripple effect on click */}
          <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-30 bg-white group-active:animate-ping"></div>
        </button>
      </div>

      {/* Site Info Panel */}
      {selectedSite && (
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {selectedSite.name}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <span className="flex items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3597/3597071.png"
                    className="w-4 h-4 mr-1"
                  />
                  {selectedSite.period}
                </span>
                <span className="flex items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png"
                    className="w-4 h-4 mr-1"
                  />
                  {selectedSite.rating || 4.5}
                </span>
                <span className="flex items-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3039/3039420.png"
                    className="w-4 h-4 mr-1"
                  />
                  {selectedSite.visitors}
                </span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                {selectedSite.description}
              </p>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => toggleFavorite(selectedSite.id)}
                className={`p-2 rounded-full transition-colors ${
                  favorites.includes(selectedSite.id)
                    ? "bg-red-100 text-red-500"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                title={
                  favorites.includes(selectedSite.id)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
              >
                <img
                  src={
                    favorites.includes(selectedSite.id)
                      ? "https://cdn-icons-png.flaticon.com/512/1828/1828970.png"
                      : "https://cdn-icons-png.flaticon.com/512/1828/1828887.png"
                  }
                  className="w-5 h-5"
                />
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: selectedSite.name,
                      text: selectedSite.description,
                      url: window.location.href,
                    });
                  }
                }}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                title="Share site"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828959.png"
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>

          {/* Highlights */}
          {selectedSite.highlights && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">
                Highlights:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedSite.highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Best Time to Visit */}
          {selectedSite.bestTime && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1888/1888423.png"
                  className="w-4 h-4 mr-2"
                />
                <span className="text-sm font-medium text-green-800">
                  Best time to visit: {selectedSite.bestTime}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Map;
