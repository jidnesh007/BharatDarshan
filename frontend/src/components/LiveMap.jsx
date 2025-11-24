import { useState, useEffect, useRef, useCallback, memo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Constants for site categories (unchanged)
const siteCategories = {
  Monument: {
    color: "#f59e0b",
    symbol: "🏛️",
    shape: "square",
    textColor: "#ffffff",
  },
  Temple: {
    color: "#8b5cf6",
    symbol: "🕉️",
    shape: "triangle",
    textColor: "#ffffff",
  },
  Fort: {
    color: "#dc2626",
    symbol: "🏰",
    shape: "pentagon",
    textColor: "#ffffff",
  },
  Palace: {
    color: "#0ea5e9",
    symbol: "🏰",
    shape: "diamond",
    textColor: "#ffffff",
  },
  "Archaeological Site": {
    color: "#059669",
    symbol: "⚱️",
    shape: "hexagon",
    textColor: "#ffffff",
  },
  "Natural Heritage": {
    color: "#65a30d",
    symbol: "🌿",
    shape: "circle",
    textColor: "#ffffff",
  },
  Museum: {
    color: "#ea580c",
    symbol: "🏛️",
    shape: "square",
    textColor: "#ffffff",
  },
  "Religious Site": {
    color: "#7c3aed",
    symbol: "🕉️",
    shape: "star",
    textColor: "#ffffff",
  },
  Cave: {
    color: "#6b7280",
    symbol: "🕳️",
    shape: "circle",
    textColor: "#ffffff",
  },
  Garden: {
    color: "#16a34a",
    symbol: "🌸",
    shape: "flower",
    textColor: "#ffffff",
  },
};

// Transportation modes (unchanged)
const transportModes = {
  walking: {
    name: "Walking",
    icon: "🚶",
    mode: "foot-walking",
    color: "#059669",
  },
  biking: {
    name: "Two Wheeler",
    icon: "🏍️",
    mode: "cycling-regular",
    color: "#0ea5e9",
  },
  driving: {
    name: "Four Wheeler",
    icon: "🚗",
    mode: "driving-car",
    color: "#dc2626",
  },
};

// Fallback heritage data (placeholder, assuming same as original)
const fallbackHeritageData = [
  {
    id: 1,
    name: "Taj Mahal",
    lat: 27.1751,
    lng: 78.0421,
    type: "Monument",
    description: "A symbol of eternal love and Mughal architecture masterpiece",
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
    name: "Jaipur City Palace",
    lat: 26.9255,
    lng: 75.823,
    type: "Palace",
    description:
      "Royal residence showcasing Rajasthani and Mughal architecture",
    period: "1729-1732 CE",
    dynasty: "Kachwaha Rajput",
    significance: "UNESCO World Heritage Site",
    bestTime: "Oct-Mar",
    rating: 4.7,
    visitors: "2-3 million/year",
    image:
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09b?w=300&h=200&fit=crop",
    highlights: ["Hawa Mahal", "Peacock Gate", "Royal artifacts"],
  },
  {
    id: 5,
    name: "Hampi",
    lat: 15.335,
    lng: 76.46,
    type: "Archaeological Site",
    description: "Ancient Vijayanagara Empire capital with stunning ruins",
    period: "1336-1565 CE",
    dynasty: "Vijayanagara",
    significance: "UNESCO World Heritage Site",
    bestTime: "Oct-Mar",
    rating: 4.8,
    visitors: "1-2 million/year",
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=300&h=200&fit=crop",
    highlights: ["Virupaksha Temple", "Stone chariot", "Lotus Mahal"],
  },
  {
    id: 6,
    name: "Khajuraho Temples",
    lat: 24.8318,
    lng: 79.9199,
    type: "Temple",
    description: "Famous for intricate sculptures and architectural excellence",
    period: "950-1050 CE",
    dynasty: "Chandela",
    significance: "UNESCO World Heritage Site",
    bestTime: "Oct-Mar",
    rating: 4.6,
    visitors: "1-2 million/year",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    highlights: [
      "Erotic sculptures",
      "Nagara architecture",
      "Light & Sound show",
    ],
  },
  {
    id: 7,
    name: "Mysore Palace",
    lat: 12.3051,
    lng: 76.6551,
    type: "Palace",
    description: "Magnificent palace known for its grandeur and architecture",
    period: "1912 CE",
    dynasty: "Wadiyar",
    significance: "Major tourist attraction",
    bestTime: "Oct-Mar",
    rating: 4.7,
    visitors: "6+ million/year",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=200&fit=crop",
    highlights: ["Illuminated evenings", "Durbar Hall", "Royal artifacts"],
  },
  {
    id: 8,
    name: "Ellora Caves",
    lat: 20.0263,
    lng: 75.1792,
    type: "Cave",
    description: "Rock-cut caves representing three religions",
    period: "600-1000 CE",
    dynasty: "Various",
    significance: "UNESCO World Heritage Site",
    bestTime: "Nov-Mar",
    rating: 4.8,
    visitors: "1-2 million/year",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=300&h=200&fit=crop",
    highlights: [
      "Kailasa Temple",
      "Multi-religious caves",
      "Rock-cut architecture",
    ],
  },
  {
    id: 9,
    name: "Golconda Fort",
    lat: 15.3937,
    lng: 77.4466,
    type: "Temple",
    description: "Famous Fort known for its unique architecture.",
    period: "10th Century CE",
    dynasty: "Rajput",
    significance: "UNESCO World Heritage Site",
    bestTime: "Oct-Mar",
    rating: 4.5,
    visitors: "1-2 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=9&heritage",
    highlights: [
      "Historical importance",
      "Heritage walk",
      "Architectural marvel",
    ],
  },
  {
    id: 10,
    name: "Sun Temple",
    lat: 10.0163,
    lng: 75.7547,
    type: "Temple",
    description: "Famous Temple known for its unique architecture.",
    period: "18th Century CE",
    dynasty: "Maratha",
    significance: "Important cultural site",
    bestTime: "Dec-Apr",
    rating: 4.3,
    visitors: "3-4 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=10&heritage",
    highlights: ["Panoramic views", "Guided tours", "Photography spot"],
  },
  {
    id: 11,
    name: "Gateway of India",
    lat: 28.7664,
    lng: 81.8167,
    type: "Cave",
    description: "Famous Palace known for its unique cultural significance.",
    period: "16th Century CE",
    dynasty: "Gupta",
    significance: "Ancient spiritual hub",
    bestTime: "Nov-Feb",
    rating: 4.9,
    visitors: "1-2 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=11&heritage",
    highlights: ["Stone carvings", "Light & Sound Show", "Museum"],
  },

  {
    id: 13,
    name: "Charminar",
    lat: 25.079,
    lng: 87.959,
    type: "Monument",
    description: "Famous Cave known for its unique architecture.",
    period: "14th Century CE",
    dynasty: "Rajput",
    significance: "Ancient spiritual hub",
    bestTime: "Oct-Mar",
    rating: 4.8,
    visitors: "3-4 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=13&heritage",
    highlights: ["Intricate sculptures", "Temple tower", "Sacred rituals"],
  },
  {
    id: 14,
    name: "Victoria Memorial",
    lat: 14.1172,
    lng: 76.9587,
    type: "Palace",
    description:
      "Famous Archaeological Site known for its unique architecture.",
    period: "18th Century CE",
    dynasty: "Pallava",
    significance: "Ancient spiritual hub",
    bestTime: "Nov-Feb",
    rating: 4.4,
    visitors: "1-2 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=14&heritage",
    highlights: ["Intricate sculptures", "Temple tower", "Sacred rituals"],
  },
  {
    id: 15,
    name: "Rani ki Vav",
    lat: 18.0278,
    lng: 84.8077,
    type: "Temple",
    description: "Famous Fort known for its unique history.",
    period: "16th Century CE",
    dynasty: "Pallava",
    significance: "UNESCO World Heritage Site",
    bestTime: "Nov-Feb",
    rating: 4.8,
    visitors: "3-4 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=15&heritage",
    highlights: ["Intricate sculptures", "Temple tower", "Sacred rituals"],
  },
  {
    id: 16,
    name: "Ajanta Caves",
    lat: 18.6108,
    lng: 71.1824,
    type: "Cave",
    description: "Famous Temple known for its unique architecture.",
    period: "14th Century CE",
    dynasty: "Maratha",
    significance: "Important cultural site",
    bestTime: "Nov-Feb",
    rating: 4.5,
    visitors: "3-4 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=16&heritage",
    highlights: ["Stone carvings", "Light & Sound Show", "Museum"],
  },
  {
    id: 17,
    name: "Brihadeeswara Temple",
    lat: 14.8565,
    lng: 77.4346,
    type: "Palace",
    description: "Famous Palace known for its unique history.",
    period: "18th Century CE",
    dynasty: "Gupta",
    significance: "Ancient spiritual hub",
    bestTime: "Dec-Apr",
    rating: 4.6,
    visitors: "1-2 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=17&heritage",
    highlights: ["Panoramic views", "Guided tours", "Photography spot"],
  },
  {
    id: 18,
    name: "Shaniwar Wada",
    lat: 16.885,
    lng: 74.0443,
    type: "Archaeological Site",
    description: "Famous Monument known for its unique architecture.",
    period: "16th Century CE",
    dynasty: "Vijayanagara",
    significance: "UNESCO World Heritage Site",
    bestTime: "Dec-Apr",
    rating: 4.3,
    visitors: "3-4 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=18&heritage",
    highlights: ["Panoramic views", "Guided tours", "Photography spot"],
  },

  {
    id: 23,
    name: "Chittorgarh Fort",
    lat: 27.6003,
    lng: 87.9232,
    type: "Temple",
    description: "Famous Palace known for its unique history.",
    period: "14th Century CE",
    dynasty: "Rajput",
    significance: "Important cultural site",
    bestTime: "Oct-Mar",
    rating: 4.8,
    visitors: "1-2 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=23&heritage",
    highlights: ["Panoramic views", "Guided tours", "Photography spot"],
  },
  {
    id: 24,
    name: "Jantar Mantar",
    lat: 26.3444,
    lng: 86.299,
    type: "Archaeological Site",
    description: "Famous Monument known for its unique history.",
    period: "18th Century CE",
    dynasty: "Maurya",
    significance: "UNESCO World Heritage Site",
    bestTime: "Dec-Apr",
    rating: 4.3,
    visitors: "2-3 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=24&heritage",
    highlights: ["Intricate sculptures", "Temple tower", "Sacred rituals"],
  },
  {
    id: 25,
    name: "Elephanta Caves",
    lat: 27.3153,
    lng: 75.7362,
    type: "Archaeological Site",
    description: "Famous Cave known for its unique architecture.",
    period: "16th Century CE",
    dynasty: "Gupta",
    significance: "Ancient spiritual hub",
    bestTime: "Oct-Mar",
    rating: 4.7,
    visitors: "2-3 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=25&heritage",
    highlights: ["Intricate sculptures", "Temple tower", "Sacred rituals"],
  },
  {
    id: 26,
    name: "Mahabalipuram",
    lat: 22.4606,
    lng: 76.9371,
    type: "Monument",
    description:
      "Famous Archaeological Site known for its unique architecture.",
    period: "16th Century CE",
    dynasty: "Mughal",
    significance: "UNESCO World Heritage Site",
    bestTime: "Oct-Mar",
    rating: 4.5,
    visitors: "3-4 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=26&heritage",
    highlights: [
      "Historical importance",
      "Heritage walk",
      "Architectural marvel",
    ],
  },
  {
    id: 27,
    name: "Konark Temple",
    lat: 20.491,
    lng: 78.047,
    type: "Archaeological Site",
    description: "Famous Fort known for its unique history.",
    period: "18th Century CE",
    dynasty: "Rajput",
    significance: "UNESCO World Heritage Site",
    bestTime: "Dec-Apr",
    rating: 4.5,
    visitors: "2-3 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=27&heritage",
    highlights: [
      "Historical importance",
      "Heritage walk",
      "Architectural marvel",
    ],
  },
  {
    id: 28,
    name: "Nalanda University",
    lat: 25.4965,
    lng: 82.8274,
    type: "Palace",
    description: "Famous Temple known for its unique cultural significance.",
    period: "18th Century CE",
    dynasty: "Rajput",
    significance: "Ancient spiritual hub",
    bestTime: "Nov-Feb",
    rating: 4.5,
    visitors: "2-3 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=28&heritage",
    highlights: ["Stone carvings", "Light & Sound Show", "Museum"],
  },
  {
    id: 29,
    name: "Jagannath Temple",
    lat: 26.1421,
    lng: 83.1405,
    type: "Monument",
    description: "Famous Palace known for its unique architecture.",
    period: "10th Century CE",
    dynasty: "Mughal",
    significance: "Ancient spiritual hub",
    bestTime: "Oct-Mar",
    rating: 4.8,
    visitors: "5+ million/year",
    image: "https://source.unsplash.com/random/300x200?sig=29&heritage",
    highlights: [
      "Historical importance",
      "Heritage walk",
      "Architectural marvel",
    ],
  },
  {
    id: 30,
    name: "Gwalior Fort",
    lat: 15.1688,
    lng: 72.9674,
    type: "Monument",
    description: "Famous Monument known for its unique cultural significance.",
    period: "14th Century CE",
    dynasty: "Maurya",
    significance: "UNESCO World Heritage Site",
    bestTime: "Dec-Apr",
    rating: 4.7,
    visitors: "1-2 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=30&heritage",
    highlights: [
      "Historical importance",
      "Heritage walk",
      "Architectural marvel",
    ],
  },

  {
    id: 32,
    name: "Ujjain Mahakaleshwar",
    lat: 27.0223,
    lng: 82.4314,
    type: "Cave",
    description: "Famous Archaeological Site known for its unique history.",
    period: "18th Century CE",
    dynasty: "Rajput",
    significance: "Ancient spiritual hub",
    bestTime: "Dec-Apr",
    rating: 4.7,
    visitors: "5+ million/year",
    image: "https://source.unsplash.com/random/300x200?sig=32&heritage",
    highlights: [
      "Historical importance",
      "Heritage walk",
      "Architectural marvel",
    ],
  },
  {
    id: 33,
    name: "Ranthambore Fort",
    lat: 29.5976,
    lng: 78.0176,
    type: "Monument",
    description: "Famous Fort known for its unique architecture.",
    period: "14th Century CE",
    dynasty: "Pallava",
    significance: "Ancient spiritual hub",
    bestTime: "Dec-Apr",
    rating: 4.9,
    visitors: "5+ million/year",
    image: "https://source.unsplash.com/random/300x200?sig=33&heritage",
    highlights: ["Intricate sculptures", "Temple tower", "Sacred rituals"],
  },
  {
    id: 34,
    name: "Mehrangarh Fort",
    lat: 16.8659,
    lng: 82.7558,
    type: "Temple",
    description: "Famous Temple known for its unique architecture.",
    period: "10th Century CE",
    dynasty: "Mughal",
    significance: "Important cultural site",
    bestTime: "Oct-Mar",
    rating: 4.5,
    visitors: "2-3 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=34&heritage",
    highlights: ["Stone carvings", "Light & Sound Show", "Museum"],
  },
  {
    id: 35,
    name: "Kumbhalgarh Fort",
    lat: 21.4665,
    lng: 83.0786,
    type: "Fort",
    description: "Famous Palace known for its unique cultural significance.",
    period: "10th Century CE",
    dynasty: "Maurya",
    significance: "UNESCO World Heritage Site",
    bestTime: "Dec-Apr",
    rating: 4.3,
    visitors: "5+ million/year",
    image: "https://source.unsplash.com/random/300x200?sig=35&heritage",
    highlights: [
      "Historical importance",
      "Heritage walk",
      "Architectural marvel",
    ],
  },
  {
    id: 36,
    name: "Raj Ghat",
    lat: 27.2561,
    lng: 76.9967,
    type: "Cave",
    description: "Famous Monument known for its unique architecture.",
    period: "12th Century CE",
    dynasty: "Mughal",
    significance: "Important cultural site",
    bestTime: "Nov-Feb",
    rating: 4.9,
    visitors: "1-2 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=36&heritage",
    highlights: [
      "Historical importance",
      "Heritage walk",
      "Architectural marvel",
    ],
  },
  {
    id: 37,
    name: "Sarnath",
    lat: 29.6145,
    lng: 74.5877,
    type: "Temple",
    description: "Famous Cave known for its unique cultural significance.",
    period: "10th Century CE",
    dynasty: "Chola",
    significance: "Ancient spiritual hub",
    bestTime: "Dec-Apr",
    rating: 4.8,
    visitors: "5+ million/year",
    image: "https://source.unsplash.com/random/300x200?sig=37&heritage",
    highlights: ["Intricate sculptures", "Temple tower", "Sacred rituals"],
  },
  {
    id: 38,
    name: "Pattadakal",
    lat: 16.6519,
    lng: 82.4325,
    type: "Temple",
    description:
      "Famous Archaeological Site known for its unique cultural significance.",
    period: "16th Century CE",
    dynasty: "Gupta",
    significance: "Ancient spiritual hub",
    bestTime: "Nov-Feb",
    rating: 4.6,
    visitors: "5+ million/year",
    image: "https://source.unsplash.com/random/300x200?sig=38&heritage",
    highlights: ["Panoramic views", "Guided tours", "Photography spot"],
  },
  {
    id: 39,
    name: "Bhimbetka",
    lat: 10.1317,
    lng: 77.7854,
    type: "Temple",
    description: "Famous Fort known for its unique architecture.",
    period: "14th Century CE",
    dynasty: "Chola",
    significance: "Ancient spiritual hub",
    bestTime: "Nov-Feb",
    rating: 4.3,
    visitors: "3-4 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=39&heritage",
    highlights: ["Stone carvings", "Light & Sound Show", "Museum"],
  },
  {
    id: 40,
    name: "Basilica of Bom Jesus",
    lat: 11.7971,
    lng: 74.6188,
    type: "Fort",
    description: "Famous Temple known for its unique history.",
    period: "10th Century CE",
    dynasty: "Gupta",
    significance: "UNESCO World Heritage Site",
    bestTime: "Oct-Mar",
    rating: 4.7,
    visitors: "2-3 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=40&heritage",
    highlights: [
      "Historical importance",
      "Heritage walk",
      "Architectural marvel",
    ],
  },

  {
    id: 42,
    name: "Junagarh Fort",
    lat: 26.5974,
    lng: 71.2508,
    type: "Fort",
    description: "Famous Monument known for its unique cultural significance.",
    period: "18th Century CE",
    dynasty: "Rajput",
    significance: "Important cultural site",
    bestTime: "Oct-Mar",
    rating: 4.4,
    visitors: "3-4 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=42&heritage",
    highlights: ["Panoramic views", "Guided tours", "Photography spot"],
  },
  {
    id: 43,
    name: "Taragarh Fort",
    lat: 17.7471,
    lng: 72.9291,
    type: "Cave",
    description: "Famous Cave known for its unique architecture.",
    period: "14th Century CE",
    dynasty: "Pallava",
    significance: "Important cultural site",
    bestTime: "Nov-Feb",
    rating: 4.9,
    visitors: "5+ million/year",
    image: "https://source.unsplash.com/random/300x200?sig=43&heritage",
    highlights: [
      "Historical importance",
      "Heritage walk",
      "Architectural marvel",
    ],
  },

  {
    id: 45,
    name: "Belur Math",
    lat: 27.2297,
    lng: 76.3146,
    type: "Temple",
    description: "Famous Fort known for its unique architecture.",
    period: "12th Century CE",
    dynasty: "Maratha",
    significance: "Ancient spiritual hub",
    bestTime: "Nov-Feb",
    rating: 4.4,
    visitors: "3-4 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=45&heritage",
    highlights: ["Stone carvings", "Light & Sound Show", "Museum"],
  },
  {
    id: 46,
    name: "Birla Mandir",
    lat: 28.7349,
    lng: 86.5941,
    type: "Temple",
    description: "Famous Temple known for its unique history.",
    period: "10th Century CE",
    dynasty: "Rajput",
    significance: "Ancient spiritual hub",
    bestTime: "Dec-Apr",
    rating: 4.3,
    visitors: "3-4 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=46&heritage",
    highlights: [
      "Historical importance",
      "Heritage walk",
      "Architectural marvel",
    ],
  },
  {
    id: 47,
    name: "Kamakhya Temple",
    lat: 26.5033,
    lng: 76.2659,
    type: "Palace",
    description: "Famous Palace known for its unique history.",
    period: "14th Century CE",
    dynasty: "Chola",
    significance: "Important cultural site",
    bestTime: "Oct-Mar",
    rating: 4.8,
    visitors: "5+ million/year",
    image: "https://source.unsplash.com/random/300x200?sig=47&heritage",
    highlights: ["Stone carvings", "Light & Sound Show", "Museum"],
  },
  {
    id: 48,
    name: "Tirupati Balaji",
    lat: 21.1344,
    lng: 81.6166,
    type: "Fort",
    description: "Famous Monument known for its unique architecture.",
    period: "12th Century CE",
    dynasty: "Maurya",
    significance: "Important cultural site",
    bestTime: "Nov-Feb",
    rating: 4.8,
    visitors: "3-4 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=48&heritage",
    highlights: ["Intricate sculptures", "Temple tower", "Sacred rituals"],
  },
  {
    id: 49,
    name: "Padmanabhaswamy Temple",
    lat: 22.797,
    lng: 73.849,
    type: "Archaeological Site",
    description: "Famous Cave known for its unique cultural significance.",
    period: "18th Century CE",
    dynasty: "Maratha",
    significance: "UNESCO World Heritage Site",
    bestTime: "Oct-Mar",
    rating: 4.6,
    visitors: "1-2 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=49&heritage",
    highlights: [
      "Historical importance",
      "Heritage walk",
      "Architectural marvel",
    ],
  },
  {
    id: 50,
    name: "Hoysaleswara Temple",
    lat: 21.422,
    lng: 70.881,
    type: "Monument",
    description:
      "Famous Archaeological Site known for its unique cultural significance.",
    period: "16th Century CE",
    dynasty: "Pallava",
    significance: "Ancient spiritual hub",
    bestTime: "Dec-Apr",
    rating: 4.5,
    visitors: "2-3 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=50&heritage",
    highlights: ["Stone carvings", "Light & Sound Show", "Museum"],
  },
  {
    id: 51,
    name: "Sundarbans NP",
    lat: 18.7512,
    lng: 77.2668,
    type: "Temple",
    description: "Famous Fort known for its unique history.",
    period: "10th Century CE",
    dynasty: "Maratha",
    significance: "Important cultural site",
    bestTime: "Dec-Apr",
    rating: 4.9,
    visitors: "1-2 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=51&heritage",
    highlights: ["Stone carvings", "Light & Sound Show", "Museum"],
  },
  {
    id: 52,
    name: "Bandhavgarh Fort",
    lat: 18.2004,
    lng: 83.9652,
    type: "Cave",
    description: "Famous Temple known for its unique history.",
    period: "10th Century CE",
    dynasty: "Chola",
    significance: "UNESCO World Heritage Site",
    bestTime: "Dec-Apr",
    rating: 4.5,
    visitors: "2-3 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=52&heritage",
    highlights: ["Intricate sculptures", "Temple tower", "Sacred rituals"],
  },
  {
    id: 53,
    name: "Lepakshi Temple",
    lat: 18.4051,
    lng: 79.65,
    type: "Archaeological Site",
    description: "Famous Palace known for its unique cultural significance.",
    period: "18th Century CE",
    dynasty: "Pallava",
    significance: "UNESCO World Heritage Site",
    bestTime: "Dec-Apr",
    rating: 4.6,
    visitors: "3-4 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=53&heritage",
    highlights: ["Panoramic views", "Guided tours", "Photography spot"],
  },
  {
    id: 54,
    name: "Nalanda Stupa",
    lat: 29.1548,
    lng: 77.8223,
    type: "Monument",
    description: "Famous Monument known for its unique architecture.",
    period: "12th Century CE",
    dynasty: "Gupta",
    significance: "Important cultural site",
    bestTime: "Nov-Feb",
    rating: 4.6,
    visitors: "1-2 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=54&heritage",
    highlights: ["Panoramic views", "Guided tours", "Photography spot"],
  },
  {
    id: 55,
    name: "Bada Imambara",
    lat: 8.6526,
    lng: 78.8142,
    type: "Cave",
    description: "Famous Cave known for its unique cultural significance.",
    period: "16th Century CE",
    dynasty: "Pallava",
    significance: "UNESCO World Heritage Site",
    bestTime: "Oct-Mar",
    rating: 4.6,
    visitors: "1-2 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=55&heritage",
    highlights: ["Stone carvings", "Light & Sound Show", "Museum"],
  },
  {
    id: 56,
    name: "Rock Garden",
    lat: 22.4443,
    lng: 83.089,
    type: "Cave",
    description:
      "Famous Archaeological Site known for its unique cultural significance.",
    period: "18th Century CE",
    dynasty: "Mughal",
    significance: "Ancient spiritual hub",
    bestTime: "Nov-Feb",
    rating: 4.7,
    visitors: "2-3 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=56&heritage",
    highlights: ["Panoramic views", "Guided tours", "Photography spot"],
  },
  {
    id: 57,
    name: "Rakhigarhi",
    lat: 31.1411,
    lng: 79.9128,
    type: "Temple",
    description: "Famous Fort known for its unique architecture.",
    period: "12th Century CE",
    dynasty: "Mughal",
    significance: "Important cultural site",
    bestTime: "Oct-Mar",
    rating: 4.5,
    visitors: "5+ million/year",
    image: "https://source.unsplash.com/random/300x200?sig=57&heritage",
    highlights: ["Stone carvings", "Light & Sound Show", "Museum"],
  },
  {
    id: 58,
    name: "Takht Sri Patna Sahib",
    lat: 19.7349,
    lng: 86.2941,
    type: "Fort",
    description: "Famous Temple known for its unique cultural significance.",
    period: "14th Century CE",
    dynasty: "Chola",
    significance: "UNESCO World Heritage Site",
    bestTime: "Dec-Apr",
    rating: 4.3,
    visitors: "2-3 million/year",
    image: "https://source.unsplash.com/random/300x200?sig=58&heritage",
    highlights: ["Intricate sculptures", "Temple tower", "Sacred rituals"],
  },
  // ... (other sites as per original)
];

// Helper to create marker HTML (unchanged)
const createMarkerHTML = (site) => {
  const category = siteCategories[site.type] || siteCategories.Monument;
  const baseSize = 36;
  const symbolSize = 20;

  const shapeStyles = {
    circle: `width: ${baseSize}px; height: ${baseSize}px; border-radius: 50%;`,
    square: `width: ${baseSize}px; height: ${baseSize}px; border-radius: 6px;`,
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
      border-radius: 6px;
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
        <div style="${shapeStyle} box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 3px solid white; filter: drop-shadow(0 0 3px rgba(0,0,0,0.2));"></div>
        <div style="position: absolute; top: 55%; left: 50%; transform: translate(-50%, -50%); font-size: ${symbolSize}px; z-index: 10;">${category.symbol}</div>
      </div>
    `;
  } else if (category.shape === "diamond") {
    return `
      <div style="position: relative; width: ${baseSize}px; height: ${baseSize}px;">
        <div style="${shapeStyle} background: ${category.color}; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 3px solid white; filter: drop-shadow(0 0 3px rgba(0,0,0,0.2));"></div>
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: ${symbolSize}px; z-index: 10;">${category.symbol}</div>
      </div>
    `;
  } else {
    return `
      <div style="${shapeStyle} background: ${category.color}; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; position: relative; z-index: 1; filter: drop-shadow(0 0 3px rgba(0,0,0,0.2));">
        <div style="font-size: ${symbolSize}px;">${category.symbol}</div>
      </div>
    `;
  }
};

// User marker HTML (blue for start location)
const createUserMarkerHTML = () => `
  <div style="width: 24px; height: 24px; background: linear-gradient(45deg, #3b82f6, #1d4ed8); border: 4px solid white; border-radius: 50%; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3), 0 4px 12px rgba(0,0,0,0.3); animation: userPulse 2s infinite; position: relative;">
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 12px; font-weight: bold;">📍</div>
  </div>
  <style>
    @keyframes userPulse {
      0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7), 0 4px 12px rgba(0,0,0,0.3); }
      70% { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0), 0 4px 12px rgba(0,0,0,0.3); }
      100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0), 0 4px 12px rgba(0,0,0,0.3); }
    }
  </style>
`;

// Destination marker HTML (red for selected or destination location)
const createDestinationMarkerHTML = () => `
  <div style="width: 24px; height: 24px; background: linear-gradient(45deg, #dc2626, #b91c1c); border: 4px solid white; border-radius: 50%; box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.3), 0 4px 12px rgba(0,0,0,0.3); animation: destPulse 2s infinite; position: relative;">
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 12px; font-weight: bold;">🎯</div>
  </div>
  <style>
    @keyframes destPulse {
      0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7), 0 4px 12px rgba(0,0,0,0.3); }
      70% { box-shadow: 0 0 0 15px rgba(220, 38, 38, 0), 0 4px 12px rgba(0,0,0,0.3); }
      100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0), 0 4px 12px rgba(0,0,0,0.3); }
    }
  </style>
`;

// Format duration (unchanged)
const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

// Memoized TravelTimePanel Component (unchanged)
const TravelTimePanel = memo(
  ({ routes, selectedMode, onModeChange, destination }) => {
    if (!routes || !destination) return null;

    return (
      <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-4 rounded-xl border border-blue-200 mb-4 shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-sm sm:text-base">
          🗺️ Travel to {destination.name}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {Object.entries(transportModes).map(([mode, transport]) => {
            const route = routes[mode];
            const isSelected = selectedMode === mode;
            const distance = route ? (route.distance / 1000).toFixed(1) : "-";
            const duration = route ? formatDuration(route.duration) : "-";

            return (
              <button
                key={mode}
                onClick={() => route && onModeChange(mode)}
                disabled={!route}
                className={`p-3 rounded-lg border-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isSelected && route
                    ? "border-blue-500 bg-blue-600 text-white shadow-md scale-105"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
                }`}
                aria-label={`Travel by ${transport.name} to ${destination.name}`}
              >
                <div className="text-center">
                  <div className="text-xl sm:text-2xl mb-1">
                    {transport.icon}
                  </div>
                  <div
                    className={`text-xs font-medium ${
                      isSelected && route ? "text-white" : "text-gray-600"
                    }`}
                  >
                    {transport.name}
                  </div>
                  <div
                    className={`text-sm font-bold ${
                      isSelected && route ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {duration}
                  </div>
                  <div
                    className={`text-xs ${
                      isSelected && route ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {distance} km
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

// Memoized MapHeader Component (updated to clear start marker on input clear)
const MapHeader = memo(
  ({
    filteredSites,
    heritageData,
    activeFilter,
    setActiveFilter,
    isTrackingLocation,
    startLocationTracking,
    stopLocationTracking,
    userLocation,
    userPlaceName,
    setStartLocation,
    isNavigating,
    currentRoute,
    routeDistance,
    routeDuration,
    clearNavigation,
    selectedMode,
    clearStartMarker,
  }) => {
    const [autocompleteResults, setAutocompleteResults] = useState([]);
    const [showAutocomplete, setShowAutocomplete] = useState(false);
    const [isHeaderOpen, setIsHeaderOpen] = useState(false);
    const inputRef = useRef(null);
    const debounceTimeout = useRef(null);

    const handleAutocomplete = async (query) => {
      if (!query) {
        setAutocompleteResults([]);
        setShowAutocomplete(false);
        setStartLocation(null);
        clearStartMarker();
        return;
      }
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&limit=5`
        );
        const data = await response.json();
        setAutocompleteResults(data);
        setShowAutocomplete(true);
      } catch (err) {
        console.error("Autocomplete error:", err);
      }
    };

    const handleSelectPlace = (place) => {
      stopLocationTracking();
      setStartLocation({
        lat: parseFloat(place.lat),
        lng: parseFloat(place.lon),
        name: place.display_name,
      });
      setShowAutocomplete(false);
      inputRef.current.value = place.display_name;
    };

    const handleInputChange = (e) => {
      const query = e.target.value;
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(
        () => handleAutocomplete(query),
        300
      );
    };

    return (
      <div className="p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
            🏛️ Heritage Explorer
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-xs sm:text-sm text-gray-600 bg-white px-2 sm:px-3 py-1 rounded-full">
              {filteredSites.length} / {heritageData.length} sites
            </span>
            <button
              className="sm:hidden text-gray-600"
              onClick={() => setIsHeaderOpen(!isHeaderOpen)}
              aria-label="Toggle menu"
            >
              {isHeaderOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>

        <div className={`${isHeaderOpen ? "block" : "hidden"} sm:block`}>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-blue-200">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full relative">
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <input
                    ref={inputRef}
                    id="start-location-input"
                    name="startLocation"
                    type="text"
                    placeholder={userPlaceName || "Enter start location"}
                    className="px-3 sm:px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full sm:w-48"
                    onChange={handleInputChange}
                    onFocus={() => setShowAutocomplete(true)}
                    autoComplete="off"
                    aria-label="Start location"
                  />
                  {showAutocomplete && autocompleteResults.length > 0 && (
                    <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 w-full max-h-60 overflow-y-auto">
                      {autocompleteResults.map((place) => (
                        <li
                          key={place.place_id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => handleSelectPlace(place)}
                          role="option"
                          aria-selected={false}
                        >
                          {place.display_name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  onClick={
                    isTrackingLocation
                      ? stopLocationTracking
                      : startLocationTracking
                  }
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center space-x-2 shadow-sm ${
                    isTrackingLocation
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  aria-label={
                    isTrackingLocation
                      ? "Stop tracking location"
                      : "Use current location"
                  }
                >
                  <span className="text-base sm:text-lg">
                    {isTrackingLocation ? "📍" : "🎯"}
                  </span>
                  <span>{isTrackingLocation ? "Stop" : "Locate Me"}</span>
                </button>
              </div>
              {userLocation && (
                <div className="text-xs sm:text-sm text-blue-700 bg-blue-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg w-full sm:w-auto">
                  📍{" "}
                  {userPlaceName ||
                    `${userLocation[0].toFixed(4)}, ${userLocation[1].toFixed(
                      4
                    )}`}
                </div>
              )}
            </div>
            {isNavigating && currentRoute && (
              <div className="flex items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0">
                <div className="text-xs sm:text-sm text-blue-700 bg-blue-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
                  🧭 To{" "}
                  <span className="font-semibold">{currentRoute.name}</span>
                  {routeDistance && routeDuration && (
                    <span className="ml-1 sm:ml-2 text-blue-600">
                      ({routeDistance} km, ~{routeDuration} via{" "}
                      {transportModes[selectedMode].name})
                    </span>
                  )}
                </div>
                <button
                  onClick={clearNavigation}
                  className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-500 text-white rounded-lg text-xs sm:text-sm hover:bg-gray-600 transition-colors"
                  aria-label="Clear navigation"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeFilter === "all"
                  ? "bg-orange-500 text-white shadow-md scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200"
              }`}
              aria-label="Show all sites"
            >
              All ({heritageData.length})
            </button>
            {[...new Set(heritageData.map((site) => site.type))].map(
              (category) => {
                const count = heritageData.filter(
                  (site) => site.type === category
                ).length;
                const categoryData =
                  siteCategories[category] || siteCategories.Monument;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center space-x-1 sm:space-x-2 ${
                      activeFilter === category
                        ? "text-white shadow-md scale-105"
                        : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200"
                    }`}
                    style={{
                      backgroundColor:
                        activeFilter === category
                          ? categoryData.color
                          : undefined,
                    }}
                    aria-label={`Filter by ${category}`}
                  >
                    <span>{categoryData.symbol}</span>
                    <span>
                      {category} ({count})
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </div>
      </div>
    );
  }
);

// Memoized MapLegend Component (unchanged)
const MapLegend = memo(() => (
  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-xl border border-gray-200 z-[1000] max-w-xs">
    <h4 className="text-xs sm:text-sm font-bold text-gray-800 mb-2 sm:mb-3 flex items-center">
      🗺️ Map Legend
    </h4>
    <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs">
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-4 sm:w-5 h-4 sm:h-5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full border-2 border-white"></div>
        <span className="text-gray-700 font-medium">Your Location</span>
      </div>
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-4 sm:w-5 h-4 sm:h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full border-2 border-white"></div>
        <span className="text-gray-700 font-medium">Selected/Destination</span>
      </div>
      {Object.entries(siteCategories).map(([type, data]) => (
        <div key={type} className="flex items-center space-x-2">
          <div
            className="w-3 sm:w-4 h-3 sm:h-4 rounded-sm flex items-center justify-center text-xs"
            style={{ backgroundColor: data.color }}
          >
            {data.symbol}
          </div>
          <span className="text-gray-700 truncate">{type}</span>
        </div>
      ))}
    </div>
  </div>
));

// Memoized SiteInfoPanel Component (unchanged)
const SiteInfoPanel = memo(
  ({
    selectedSite,
    favorites,
    toggleFavorite,
    startLocation,
    navigateToSite,
    selectedMode,
    onModeChange,
    routes,
  }) => (
    <div className="p-4 sm:p-6 border-t border-gray-200 bg-gradient-to-br from-orange-50 to-red-50 shadow-sm overflow-y-auto max-h-[40vh] sm:max-h-[50vh]">
      <div className="flex flex-col sm:flex-row items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 flex items-center">
            {selectedSite.name}
            <span className="ml-2 text-xl sm:text-2xl">
              {
                (siteCategories[selectedSite.type] || siteCategories.Monument)
                  .symbol
              }
            </span>
          </h3>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3">
            <span className="flex items-center bg-white px-2 sm:px-3 py-1 rounded-full">
              📅 {selectedSite.period}
            </span>
            <span className="flex items-center bg-white px-2 sm:px-3 py-1 rounded-full">
              ⭐ {selectedSite.rating || 4.5}
            </span>
            <span className="flex items-center bg-white px-2 sm:px-3 py-1 rounded-full">
              👥 {selectedSite.visitors}
            </span>
          </div>
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed bg-white p-3 rounded-lg">
            {selectedSite.description}
          </p>
        </div>
        <div className="flex items-center space-x-2 ml-0 sm:ml-4 mt-2 sm:mt-0">
          <button
            onClick={() => toggleFavorite(selectedSite.id)}
            className={`p-2 sm:p-3 rounded-full transition-all duration-200 ${
              favorites.includes(selectedSite.id)
                ? "bg-red-500 text-white scale-110"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title={
              favorites.includes(selectedSite.id)
                ? "Remove from favorites"
                : "Add to favorites"
            }
            aria-label={
              favorites.includes(selectedSite.id)
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            {favorites.includes(selectedSite.id) ? "❤️" : "🤍"}
          </button>
          {startLocation && (
            <button
              onClick={() => navigateToSite(selectedSite)}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 text-xs sm:text-sm font-medium flex items-center space-x-2 shadow-sm"
              aria-label={`Navigate to ${selectedSite.name}`}
            >
              <span>🧭</span>
              <span>Navigate</span>
            </button>
          )}
        </div>
      </div>

      <TravelTimePanel
        routes={routes}
        selectedMode={selectedMode}
        onModeChange={onModeChange}
        destination={selectedSite}
      />

      {selectedSite.highlights && (
        <div className="mt-4">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3">
            Highlights:
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedSite.highlights.map((highlight, index) => (
              <span
                key={index}
                className="px-2 sm:px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium border border-orange-200"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      )}

      {selectedSite.bestTime && (
        <div className="mt-4 p-3 sm:p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="flex items-center">
            <span className="text-xs sm:text-sm font-medium text-green-800">
              🌿 Best time to visit: {selectedSite.bestTime}
            </span>
          </div>
        </div>
      )}
    </div>
  )
);

// Main Map Component
const LiveMap = ({
  className = "",
  height = "100vh",
  showControls = true,
  center = [20.5937, 78.9629],
  zoom = 5,
}) => {
  const [heritageData] = useState(fallbackHeritageData);
  const [filteredSites, setFilteredSites] = useState(fallbackHeritageData);
  const [activeFilter, setActiveFilter] = useState("all");
  const [userLocation, setUserLocation] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [userPlaceName, setUserPlaceName] = useState(null);
  const [isTrackingLocation, setIsTrackingLocation] = useState(false);
  const [selectedSite, setSelectedSite] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [routeDistance, setRouteDistance] = useState(null);
  const [routeDuration, setRouteDuration] = useState(null);
  const [routes, setRoutes] = useState({});
  const [selectedMode, setSelectedMode] = useState("driving");
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);
  const routeLayerRef = useRef(null);
  const watchIdRef = useRef(null);

  const fetchRoutes = async (start, end, site) => {
    const newRoutes = {};
    for (const [mode, transport] of Object.entries(transportModes)) {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/${transport.mode}/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
        );
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
          newRoutes[mode] = {
            distance: data.routes[0].distance,
            duration: data.routes[0].duration,
            geometry: data.routes[0].geometry,
          };
        }
      } catch (err) {
        console.error(`Error fetching ${mode} route:`, err);
      }
    }
    setRoutes(newRoutes);
    if (newRoutes[selectedMode]) {
      setCurrentRoute({ ...newRoutes[selectedMode], name: site.name });
      setRouteDistance((newRoutes[selectedMode].distance / 1000).toFixed(1));
      setRouteDuration(formatDuration(newRoutes[selectedMode].duration));
    }
  };

  const navigateToSite = (site) => {
    if (!startLocation) return;
    setSelectedSite(site);
    setIsNavigating(true);
    fetchRoutes(startLocation, site, site);

    // Add destination marker
    if (mapRef.current) {
      if (destinationMarkerRef.current) {
        destinationMarkerRef.current.setLatLng([site.lat, site.lng]);
      } else {
        destinationMarkerRef.current = L.marker([site.lat, site.lng], {
          icon: L.divIcon({
            className: "destination-marker",
            html: createDestinationMarkerHTML(),
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          }),
        }).addTo(mapRef.current);
      }
      mapRef.current.panTo([site.lat, site.lng]);
    }
  };

  const clearNavigation = () => {
    setIsNavigating(false);
    setCurrentRoute(null);
    setRouteDistance(null);
    setRouteDuration(null);
    setRoutes({});
    if (routeLayerRef.current) {
      routeLayerRef.current.clearLayers();
    }
    if (destinationMarkerRef.current && mapRef.current) {
      mapRef.current.removeLayer(destinationMarkerRef.current);
      destinationMarkerRef.current = null;
    }
  };

  const clearStartMarker = () => {
    if (userMarkerRef.current && mapRef.current) {
      mapRef.current.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }
  };

  const toggleFavorite = (siteId) => {
    setFavorites((prev) =>
      prev.includes(siteId)
        ? prev.filter((id) => id !== siteId)
        : [...prev, siteId]
    );
  };

  const startLocationTracking = useCallback(() => {
    if (navigator.geolocation) {
      setIsTrackingLocation(true);
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setStartLocation({ lat: latitude, lng: longitude });
          fetchPlaceName(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsTrackingLocation(false);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
    }
  }, []);

  const stopLocationTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      setIsTrackingLocation(false);
      clearStartMarker();
      setStartLocation(null);
      setUserLocation(null);
      setUserPlaceName(null);
    }
  }, []);

  const fetchPlaceName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      setUserPlaceName(data.display_name || "Current Location");
      setStartLocation((prev) => ({
        ...prev,
        name: data.display_name || "Current Location",
      }));
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      setUserPlaceName(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      setStartLocation((prev) => ({
        ...prev,
        name: `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      }));
    }
  };

  useEffect(() => {
    const filtered = heritageData.filter(
      (site) => activeFilter === "all" || site.type === activeFilter
    );
    setFilteredSites(filtered);
  }, [activeFilter, heritageData]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center,
        zoom,
        zoomControl: showControls,
        attributionControl: showControls,
        scrollWheelZoom: true,
        touchZoom: true,
        doubleClickZoom: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: showControls
          ? '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          : "",
        maxZoom: 19,
      }).addTo(mapRef.current);

      routeLayerRef.current = L.layerGroup().addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, zoom, showControls]);

  useEffect(() => {
    if (!mapRef.current) return;

    const markers = filteredSites.map((site) => {
      const marker = L.marker([site.lat, site.lng], {
        icon: L.divIcon({
          className: "custom-marker",
          html: createMarkerHTML(site),
          iconSize: [36, 36],
          iconAnchor: [18, 18],
        }),
      }).addTo(mapRef.current);

      marker.on("click", () => {
        setSelectedSite(site);
        mapRef.current.panTo([site.lat, site.lng]);
      });
      return marker;
    });

    return () => {
      if (mapRef.current) {
        markers.forEach((marker) => {
          mapRef.current.removeLayer(marker);
        });
      }
    };
  }, [filteredSites]);

  useEffect(() => {
    if (startLocation && mapRef.current) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([startLocation.lat, startLocation.lng]);
      } else {
        userMarkerRef.current = L.marker(
          [startLocation.lat, startLocation.lng],
          {
            icon: L.divIcon({
              className: "user-marker",
              html: createUserMarkerHTML(),
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            }),
          }
        ).addTo(mapRef.current);
      }
      if (isTrackingLocation) {
        mapRef.current.panTo([startLocation.lat, startLocation.lng]);
      }
    }
  }, [startLocation, isTrackingLocation]);

  useEffect(() => {
    if (currentRoute && mapRef.current && routeLayerRef.current) {
      routeLayerRef.current.clearLayers();
      L.geoJSON(currentRoute.geometry, {
        style: {
          color: transportModes[selectedMode].color,
          weight: 4,
          opacity: 0.7,
        },
      }).addTo(routeLayerRef.current);
    }
  }, [currentRoute, selectedMode]);

  useEffect(() => {
    return () => {
      stopLocationTracking();
    };
  }, [stopLocationTracking]);

  return (
    <div className={`relative ${className}`} style={{ height: "100vh" }}>
      <div id="map" className="w-full h-full" />
      {showControls && (
        <>
          <MapHeader
            filteredSites={filteredSites}
            heritageData={heritageData}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            isTrackingLocation={isTrackingLocation}
            startLocationTracking={startLocationTracking}
            stopLocationTracking={stopLocationTracking}
            userLocation={userLocation}
            userPlaceName={userPlaceName}
            setStartLocation={setStartLocation}
            isNavigating={isNavigating}
            currentRoute={currentRoute}
            routeDistance={routeDistance}
            routeDuration={routeDuration}
            clearNavigation={clearNavigation}
            selectedMode={selectedMode}
            clearStartMarker={clearStartMarker}
          />
          <MapLegend />
          {selectedSite && (
            <SiteInfoPanel
              selectedSite={selectedSite}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              startLocation={startLocation}
              navigateToSite={navigateToSite}
              selectedMode={selectedMode}
              onModeChange={setSelectedMode}
              routes={routes}
            />
          )}
        </>
      )}
    </div>
  );
};

export default LiveMap;
