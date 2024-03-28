import asyncHandler from "../middleware/asyncHandler.js";
import Event from "../models/eventModel.js";
import { fetchWeather, fetchDistance } from "../utils/apiFetcher.js";
import { convertISOToYYYYMMDD } from "../utils/dateformatter.js";

const fetchEvents = asyncHandler(async (req, res) => {
  const currentDate = new Date();
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 14);
  const events = await Event.find({
    date: {
      $gte: currentDate,
      $lte: futureDate,
    },
  });

  const pages = Math.ceil(events.length / 10);
  const currentPage = parseInt(req.query.page, 10);
  const startIndex = currentPage * 10 - 10;
  const endIndex = currentPage * 10;

  const data = await Promise.all(
    events.slice(startIndex, endIndex).map(async (x) => {
      const city = x.city_name;
      const date = convertISOToYYYYMMDD(x.date);
      const weather = await fetchWeather(city, date);
      const [lat1, long1] = [x.latitude, x.longitude];
      const [lat2, long2] = [
        parseFloat(req.query.latitude),
        parseFloat(req.query.longitude),
      ];
      const distance = await fetchDistance(lat1, long1, lat2, long2);

      return {
        event_name: x.event_name,
        city_name: x.city_name,
        date: date,
        weather: weather,
        distance_km: distance,
      };
    })
  );

  res.json({
    events: data,
    page: currentPage,
    pageSize: 10,
    totalEvents: events.length,
    totalPages: pages,
  });
});

const createEvent = asyncHandler(async (req, res) => {
  const { event_name, city_name, latitude, longitude } = req.body;
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const event = await Event.find({event_name});
  console.log(event);
  const date = convertISOToYYYYMMDD(currentDate);
  const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${
    currentDate.getSeconds()
  }`;

  if (event.length == 0) {
    const _event = new Event({
      event_name,
      city_name,
      date,
      time,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });

    await _event.save();
    res.status(201).json({
      status: true,
    });
  } else {
    res.status(401);
    throw new Error("Event name already exists for the current date or field was left empty.");
  }
});

export { fetchEvents, createEvent };
