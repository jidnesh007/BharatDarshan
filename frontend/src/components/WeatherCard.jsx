import React, { useState, useEffect } from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Zap,
  MapPin,
  Droplets,
  Wind,
  Thermometer,
  Calendar,
} from "lucide-react";

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  // Weather icon mapping
  const getWeatherIcon = (weatherMain, size = "w-8 h-8") => {
    const iconProps = { className: size };

    switch (weatherMain.toLowerCase()) {
      case "clear":
        return <Sun {...iconProps} />;
      case "clouds":
        return <Cloud {...iconProps} />;
      case "rain":
      case "drizzle":
        return <CloudRain {...iconProps} />;
      case "snow":
        return <CloudSnow {...iconProps} />;
      case "thunderstorm":
        return <Zap {...iconProps} />;
      default:
        return <Sun {...iconProps} />;
    }
  };

  // Get user's current location
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        }
      );
    });
  };

  // Fetch current weather data
  const fetchWeatherData = async (lat, lon) => {
    try {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

      if (!API_KEY) {
        throw new Error(
          "API key not found. Please check your environment variables."
        );
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Weather API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Weather fetch error:", error);

      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        throw new Error(
          "Network error. Please check your internet connection or try again later."
        );
      }

      throw error;
    }
  };

  // Fetch 5-day forecast data
  const fetchForecastData = async (lat, lon) => {
    try {
      const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

      if (!API_KEY) {
        throw new Error(
          "API key not found. Please check your environment variables."
        );
      }

      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Forecast API error: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Forecast fetch error:", error);

      if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        throw new Error(
          "Network error. Please check your internet connection or try again later."
        );
      }

      throw error;
    }
  };

  // Process forecast data to get daily forecasts
  const processForecastData = (forecastData) => {
    if (!forecastData || !forecastData.list) return [];

    const dailyForecasts = [];
    const today = new Date().toDateString();

    // Group forecasts by day
    const groupedByDay = forecastData.list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (date !== today) {
        // Skip today as we have current weather
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
      }
      return acc;
    }, {});

    // Get the next 4 days
    Object.keys(groupedByDay)
      .slice(0, 4)
      .forEach((date) => {
        const dayForecasts = groupedByDay[date];
        const temps = dayForecasts.map((f) => f.main.temp);
        const maxTemp = Math.round(Math.max(...temps));
        const minTemp = Math.round(Math.min(...temps));

        // Get the most common weather condition for the day
        const weatherCounts = dayForecasts.reduce((acc, f) => {
          const weather = f.weather[0].main;
          acc[weather] = (acc[weather] || 0) + 1;
          return acc;
        }, {});

        const mostCommonWeather = Object.keys(weatherCounts).reduce((a, b) =>
          weatherCounts[a] > weatherCounts[b] ? a : b
        );

        dailyForecasts.push({
          date: new Date(date),
          maxTemp,
          minTemp,
          weather: mostCommonWeather,
          description: dayForecasts[0].weather[0].description,
        });
      });

    return dailyForecasts;
  };

  // Initialize weather data
  useEffect(() => {
    const initializeWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const userLocation = await getCurrentLocation();
        setLocation(userLocation);

        // Fetch both current weather and forecast
        const [weather, forecast] = await Promise.all([
          fetchWeatherData(userLocation.latitude, userLocation.longitude),
          fetchForecastData(userLocation.latitude, userLocation.longitude),
        ]);

        setWeatherData(weather);
        setForecastData(forecast);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeWeather();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <span className="ml-3 text-lg">Loading weather...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 text-center">
          <h3 className="text-xl font-bold mb-2">Weather Unavailable</h3>
          <p className="text-white/80 text-sm mb-4">{error}</p>
        </div>
      </div>
    );
  }

  if (!weatherData) return null;

  const temp = Math.round(weatherData.main.temp);
  const feelsLike = Math.round(weatherData.main.feels_like);
  const humidity = weatherData.main.humidity;
  const windSpeed = Math.round(weatherData.wind?.speed * 3.6) || 0;
  const weatherMain = weatherData.weather[0].main;
  const weatherDescription = weatherData.weather[0].description;
  const cityName = weatherData.name;
  const country = weatherData.sys.country;

  const dailyForecasts = processForecastData(forecastData);

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    }
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl p-6 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        {/* Current Weather */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              {cityName}, {country}
            </h3>
            <p className="text-white/80 text-sm capitalize">
              {weatherDescription}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {getWeatherIcon(weatherMain)}
            <div className="text-right">
              <div className="text-3xl font-bold">{temp}°C</div>
              <div className="text-sm text-white/80">Feels {feelsLike}°C</div>
            </div>
          </div>
        </div>

        {/* Current Weather Details */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-white/80" />
            <div>
              <div className="text-sm text-white/80">Humidity</div>
              <div className="font-semibold">{humidity}%</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-white/80" />
            <div>
              <div className="text-sm text-white/80">Wind</div>
              <div className="font-semibold">{windSpeed} km/h</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-white/80" />
            <div>
              <div className="text-sm text-white/80">Pressure</div>
              <div className="font-semibold">
                {weatherData.main.pressure} hPa
              </div>
            </div>
          </div>
        </div>

        {/* Forecast Section */}
        {dailyForecasts.length > 0 && (
          <div className="border-t border-white/20 pt-4">
            <h4 className="text-lg font-semibold mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              4-Day Forecast
            </h4>
            <div className="space-y-3">
              {dailyForecasts.map((forecast, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white/10 rounded-lg p-3"
                >
                  <div className="flex items-center space-x-3">
                    {getWeatherIcon(forecast.weather, "w-6 h-6")}
                    <div>
                      <div className="font-medium">
                        {formatDate(forecast.date)}
                      </div>
                      <div className="text-sm text-white/80 capitalize">
                        {forecast.description}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {forecast.maxTemp}° / {forecast.minTemp}°
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
