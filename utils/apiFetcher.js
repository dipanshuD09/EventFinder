import axios from "axios";
import NodeCache from "node-cache";


const cache = new NodeCache({ stdTTL: 3600 });

const weatherAPI = async (city, date) => {
  try {
    const res = await Promise.all([
      axios.get(
        `https://gg-backend-assignment.azurewebsites.net/api/Weather?code=KfQnTWHJbg1giyB_Q9Ih3Xu3L9QOBDTuU5zwqVikZepCAzFut3rqsg==&city=${encodeURIComponent(
          city
        )}&date=${encodeURIComponent(date)}`
      ),
    ]);

    const { weather } = res[0].data;
    return weather;
  } catch (error) {
    console.error("Error making parallel requests:", error);
  }
};

export const fetchWeather = async (city, date) => {
  const cacheKey = `weather:${city}:${date}`;
  const cachedWeather = cache.get(cacheKey);

  if (cachedWeather) {
    return cachedWeather;
  }

  const weather = await weatherAPI(city, date);
  cache.set(cacheKey, weather);
  return weather;
};

const distanceAPI = async (lat1, long1, lat2, long2) => {
  try {
    const res = await Promise.all([
      axios.get(
        `https://gg-backend-assignment.azurewebsites.net/api/Distance?code=IAKvV2EvJa6Z6dEIUqqd7yGAu7IZ8gaH-a0QO6btjRc1AzFu8Y3IcQ==&latitude1=${encodeURIComponent(
          lat1
        )}&longitude1=${encodeURIComponent(
          long1
        )}&latitude2=${encodeURIComponent(
          lat2
        )}&longitude2=${encodeURIComponent(long2)}`
      ),
    ]);
    const { distance } = res[0].data;
    return distance;
  } catch (error) {
    console.error("Error making parallel requests:", error);
  }
};

export const fetchDistance = async (lat1, long1, lat2, long2) => {
  const cacheKey = `distance:${lat1}:${long1}:${lat2}:${long2}`;
  const cachedDistance = cache.get(cacheKey);

  if (cachedDistance) {
    return cachedDistance;
  }

  const distance = await distanceAPI(lat1, long1, lat2, long2);
  cache.set(cacheKey, distance);
  return distance;
};