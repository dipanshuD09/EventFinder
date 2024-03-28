import express from "express";
import {
    createEvent,
  fetchEvents
} from "../controllers/eventController.js";
const router = express.Router();

router.route("/find").get(fetchEvents);
router.route("/").post(createEvent);

export default router;
