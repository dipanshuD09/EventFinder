import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  event_name: {
    type: String,
    required: true,
  },
  city_name: {
    type: String,
    required: true,
  },
  date: { type: Date },
  time: { type: String },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

eventSchema.index({ date: 1, time: 1, event_name: 1 });

const Event = mongoose.model("Event", eventSchema);

export default Event;
