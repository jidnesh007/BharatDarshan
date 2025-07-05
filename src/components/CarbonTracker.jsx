import React, { useState, useEffect } from "react";
import {
  Calculator,
  Leaf,
  TrendingUp,
  Users,
  MapPin,
  Utensils,
  Car,
  Plane,
  Train,
  Bus,
  Home,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const CarbonTracker = () => {
  const [activeTab, setActiveTab] = useState("input");
  const [formData, setFormData] = useState({
    transport: "train",
    distance: "",
    people: 1,
    duration: "",
    accommodation: "budget_hotel",
    food: "vegetarian",
    activities: [],
    destination: "rajasthan",
  });
  const [results, setResults] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carbon emission factors for India (kg CO2 per person per km)
  const emissionFactors = {
    car: 0.14,
    plane: 0.255,
    train: 0.035,
    bus: 0.075,
    auto_rickshaw: 0.09,
    taxi: 0.16,
    metro: 0.025,
    bike: 0,
    walk: 0,
  };

  // Accommodation emissions for India (kg CO2 per night per person)
  const accommodationFactors = {
    luxury_hotel: 35,
    budget_hotel: 20,
    hostel: 12,
    guesthouse: 15,
    homestay: 10,
    ashram: 8,
    camping: 4,
    eco_resort: 12,
  };

  // Food emissions for India (kg CO2 per day per person)
  const foodFactors = {
    vegan: 2.0,
    vegetarian: 3.2,
    mixed: 5.5,
    meat_heavy: 7.8,
    street_food: 4.2,
    local_cuisine: 3.5,
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateCarbonFootprint = () => {
    const distance = parseFloat(formData.distance) || 0;
    const people = parseInt(formData.people) || 1;
    const duration = parseFloat(formData.duration) || 0;

    const transportEmissions =
      distance * emissionFactors[formData.transport] * people;
    const accommodationEmissions =
      duration * accommodationFactors[formData.accommodation] * people;
    const foodEmissions = duration * foodFactors[formData.food] * people;
    const totalEmissions =
      transportEmissions + accommodationEmissions + foodEmissions;

    return {
      transport: transportEmissions,
      accommodation: accommodationEmissions,
      food: foodEmissions,
      total: totalEmissions,
      perPerson: totalEmissions / people,
    };
  };

  const getAISuggestions = async (footprint) => {
    setLoading(true);
    try {
      // Since we can't use external APIs in this environment, we'll use fallback suggestions
      const suggestions = [
        {
          category: "Transport",
          suggestion:
            "Use Indian Railways - one of the most eco-friendly transport options in India",
          impact: "High",
        },
        {
          category: "Accommodation",
          suggestion: "Choose eco-certified hotels or traditional homestays",
          impact: "Medium",
        },
        {
          category: "Food",
          suggestion:
            "Enjoy local vegetarian cuisine - India has amazing plant-based options",
          impact: "Medium",
        },
        {
          category: "Local Travel",
          suggestion:
            "Use Metro/local trains in cities like Delhi, Mumbai, Bangalore",
          impact: "High",
        },
        {
          category: "Offset",
          suggestion:
            "Support Indian reforestation projects or renewable energy initiatives",
          impact: "High",
        },
      ];

      // Add some dynamic suggestions based on the trip data
      if (formData.transport === "plane") {
        suggestions.unshift({
          category: "Transport",
          suggestion:
            "Consider train travel for distances under 1000km - Indian Railways covers most destinations efficiently",
          impact: "High",
        });
      }

      if (formData.accommodation === "luxury_hotel") {
        suggestions.push({
          category: "Accommodation",
          suggestion:
            "Try heritage hotels or eco-resorts that often have better sustainability practices",
          impact: "Medium",
        });
      }

      setSuggestions(suggestions.slice(0, 5));
    } catch (error) {
      console.error("Error generating suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = async () => {
    const footprint = calculateCarbonFootprint();
    setResults(footprint);

    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      ...formData,
      footprint,
    };
    setHistory((prev) => [newEntry, ...prev]);

    await getAISuggestions(footprint);
    setActiveTab("results");
  };

  const getEcoScore = (emissions) => {
    if (emissions < 50)
      return { score: "A", color: "green", label: "Excellent" };
    if (emissions < 100) return { score: "B", color: "lime", label: "Good" };
    if (emissions < 200) return { score: "C", color: "yellow", label: "Fair" };
    if (emissions < 400) return { score: "D", color: "orange", label: "Poor" };
    return { score: "F", color: "red", label: "Very Poor" };
  };

  const TransportIcon = ({ type }) => {
    const icons = {
      car: Car,
      plane: Plane,
      train: Train,
      bus: Bus,
      auto_rickshaw: Car,
      taxi: Car,
      metro: Train,
      bike: Users,
      walk: Users,
    };
    const Icon = icons[type] || Car;
    return <Icon className="w-5 h-5" />;
  };

  const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"];

  const getPieChartData = () => {
    if (!results) return [];
    return [
      { name: "Transport", value: results.transport, color: COLORS[0] },
      { name: "Accommodation", value: results.accommodation, color: COLORS[1] },
      { name: "Food", value: results.food, color: COLORS[2] },
    ].filter((item) => item.value > 0);
  };

  const getHistoryChartData = () => {
    return history
      .slice(0, 10)
      .reverse()
      .map((trip, index) => ({
        trip: `Trip ${index + 1}`,
        transport: trip.footprint.transport,
        accommodation: trip.footprint.accommodation,
        food: trip.footprint.food,
        total: trip.footprint.total,
        date: trip.date,
      }));
  };

  const getTransportBreakdown = () => {
    const transportCounts = history.reduce((acc, trip) => {
      acc[trip.transport] = (acc[trip.transport] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(transportCounts).map(([transport, count]) => ({
      transport,
      count,
      percentage: Math.round((count / history.length) * 100),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              India Carbon Tracker
            </h1>
          </div>
          <p className="text-gray-600">
            Track your travel carbon footprint across incredible India
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            {["input", "results", "dashboard"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-green-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        {activeTab === "input" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6" />
              Trip Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transport Mode
                </label>
                <select
                  value={formData.transport}
                  onChange={(e) =>
                    handleInputChange("transport", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="train">Indian Railways</option>
                  <option value="bus">Bus</option>
                  <option value="car">Private Car</option>
                  <option value="taxi">Taxi/Cab</option>
                  <option value="auto_rickshaw">Auto Rickshaw</option>
                  <option value="metro">Metro</option>
                  <option value="plane">Domestic Flight</option>
                  <option value="bike">Motorbike</option>
                  <option value="walk">Walking</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Distance (km)
                </label>
                <input
                  type="number"
                  value={formData.distance}
                  onChange={(e) =>
                    handleInputChange("distance", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter distance"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of People
                </label>
                <input
                  type="number"
                  value={formData.people}
                  onChange={(e) => handleInputChange("people", e.target.value)}
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (days)
                </label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter duration"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accommodation
                </label>
                <select
                  value={formData.accommodation}
                  onChange={(e) =>
                    handleInputChange("accommodation", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="budget_hotel">Budget Hotel</option>
                  <option value="luxury_hotel">Luxury Hotel</option>
                  <option value="hostel">Hostel</option>
                  <option value="guesthouse">Guesthouse</option>
                  <option value="homestay">Homestay</option>
                  <option value="ashram">Ashram</option>
                  <option value="eco_resort">Eco Resort</option>
                  <option value="camping">Camping</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Food Preferences
                </label>
                <select
                  value={formData.food}
                  onChange={(e) => handleInputChange("food", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="local_cuisine">Local Cuisine</option>
                  <option value="street_food">Street Food</option>
                  <option value="mixed">Mixed</option>
                  <option value="meat_heavy">Meat Heavy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination Region
                </label>
                <select
                  value={formData.destination}
                  onChange={(e) =>
                    handleInputChange("destination", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="rajasthan">Rajasthan</option>
                  <option value="kerala">Kerala</option>
                  <option value="goa">Goa</option>
                  <option value="himachal">Himachal Pradesh</option>
                  <option value="uttarakhand">Uttarakhand</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="tamil_nadu">Tamil Nadu</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="west_bengal">West Bengal</option>
                  <option value="delhi">Delhi NCR</option>
                  <option value="punjab">Punjab</option>
                  <option value="gujarat">Gujarat</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={!formData.distance || !formData.duration}
              className="w-full mt-6 bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Calculate Your India Travel Footprint
            </button>
          </div>
        )}

        {/* Results */}
        {activeTab === "results" && results && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">
                Carbon Footprint Results
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TransportIcon type={formData.transport} />
                    <h3 className="font-semibold text-blue-800">Transport</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    {results.transport.toFixed(1)} kg CO₂
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="w-5 h-5" />
                    <h3 className="font-semibold text-purple-800">
                      Accommodation
                    </h3>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">
                    {results.accommodation.toFixed(1)} kg CO₂
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Utensils className="w-5 h-5" />
                    <h3 className="font-semibold text-orange-800">Food</h3>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">
                    {results.food.toFixed(1)} kg CO₂
                  </p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5" />
                    <h3 className="font-semibold text-red-800">Total</h3>
                  </div>
                  <p className="text-2xl font-bold text-red-600">
                    {results.total.toFixed(1)} kg CO₂
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white ${
                      getEcoScore(results.total).color === "green"
                        ? "bg-green-500"
                        : getEcoScore(results.total).color === "lime"
                        ? "bg-lime-500"
                        : getEcoScore(results.total).color === "yellow"
                        ? "bg-yellow-500"
                        : getEcoScore(results.total).color === "orange"
                        ? "bg-orange-500"
                        : "bg-red-500"
                    }`}
                  >
                    {getEcoScore(results.total).score}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      Eco Score: {getEcoScore(results.total).label}
                    </h3>
                    <p className="text-gray-600">
                      {results.perPerson.toFixed(1)} kg CO₂ per person
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Emission Breakdown
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getPieChartData()}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {getPieChartData().map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `${value.toFixed(1)} kg CO₂`,
                          "Emissions",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Leaf className="w-6 h-6" />
                Eco-Friendly Suggestions
              </h2>

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600">
                    Generating personalized suggestions...
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-green-50 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-green-800">
                            {suggestion.category}
                          </span>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              suggestion.impact === "High"
                                ? "bg-red-100 text-red-800"
                                : suggestion.impact === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {suggestion.impact} Impact
                          </span>
                        </div>
                        <p className="text-gray-700">{suggestion.suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Carbon Offset Options
              </h2>

              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-800">
                    Offset Your {results.total.toFixed(1)} kg CO₂
                  </h3>
                </div>
                <p className="text-blue-700 mb-3">
                  Estimated cost: ₹{(results.total * 1.5).toFixed(0)} - ₹
                  {(results.total * 4).toFixed(0)} (Support Indian green
                  initiatives)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    Gold Standard
                  </h4>
                  <p className="text-sm text-gray-600">
                    Support verified Indian renewable energy and forestry
                    projects
                  </p>
                </div>

                <div className="p-4 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    TERI (India)
                  </h4>
                  <p className="text-sm text-gray-600">
                    The Energy and Resources Institute - Leading Indian
                    sustainability research
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6" />
                Your India Travel Dashboard
              </h2>

              {history.length === 0 ? (
                <div className="text-center py-8">
                  <Leaf className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    No trips recorded yet. Calculate your first carbon
                    footprint!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">
                      Total Trips
                    </h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {history.length}
                    </p>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2">
                      Total CO₂
                    </h3>
                    <p className="text-2xl font-bold text-red-600">
                      {history
                        .reduce((sum, trip) => sum + trip.footprint.total, 0)
                        .toFixed(1)}{" "}
                      kg
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2">
                      Avg per Trip
                    </h3>
                    <p className="text-2xl font-bold text-green-600">
                      {(
                        history.reduce(
                          (sum, trip) => sum + trip.footprint.total,
                          0
                        ) / history.length
                      ).toFixed(1)}{" "}
                      kg
                    </p>
                  </div>
                </div>
              )}
            </div>

            {history.length > 0 && (
              <>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Carbon Footprint Trends
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getHistoryChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="trip" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) => [
                            `${value.toFixed(1)} kg CO₂`,
                            "Emissions",
                          ]}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="total"
                          stroke="#EF4444"
                          strokeWidth={2}
                          name="Total Emissions"
                        />
                        <Line
                          type="monotone"
                          dataKey="transport"
                          stroke="#10B981"
                          strokeWidth={2}
                          name="Transport"
                        />
                        <Line
                          type="monotone"
                          dataKey="accommodation"
                          stroke="#F59E0B"
                          strokeWidth={2}
                          name="Accommodation"
                        />
                        <Line
                          type="monotone"
                          dataKey="food"
                          stroke="#8B5CF6"
                          strokeWidth={2}
                          name="Food"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Transport Mode Usage
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getTransportBreakdown()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="transport" />
                        <YAxis />
                        <Tooltip formatter={(value) => [value, "Trips"]} />
                        <Bar dataKey="count" fill="#10B981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Trips</h3>
                  <div className="space-y-3">
                    {history.slice(0, 5).map((trip) => (
                      <div
                        key={trip.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <TransportIcon type={trip.transport} />
                          <div>
                            <p className="font-medium">
                              {trip.distance}km • {trip.duration} days
                            </p>
                            <p className="text-sm text-gray-600">{trip.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {trip.footprint.total.toFixed(1)} kg CO₂
                          </p>
                          <p className="text-sm text-gray-600">
                            {trip.people} people
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarbonTracker;
