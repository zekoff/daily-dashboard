/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import axios from "axios";

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_APOD_URL = "https://api.nasa.gov/planetary/apod";
const NEWS_API_KEY = process.env.NEWS_API_KEY;

export const getNasaApod = onRequest({cors: true}, async (req, res) => {
  try {
    const callResult = await axios.get(NASA_APOD_URL, {
      params: {
        api_key: NASA_API_KEY,
      },
    });
    logger.info(callResult.data);
    res.json({data: callResult.data});
  } catch (error) {
    logger.error("Error fetching NASA APOD:", error);
    res.status(500).send("Error fetching NASA APOD");
  }
});

export const getQotd = onRequest({cors: true}, async (req, res) => {
  try {
    const callResult = await axios.get("https://favqs.com/api/qotd");
    logger.info(callResult.data);
    res.json({data: callResult.data});
  } catch (error) {
    logger.error("Error fetching QOTD:", error);
    res.status(500).send("Error fetching QOTD");
  }
});

export const getHeadlines = onRequest({cors: true}, async (req, res) => {
  try {
    const callResult = await axios.get("https://api.thenewsapi.com/v1/news/top", {
      params: {
        locale: "us",
        api_token: NEWS_API_KEY,
        categories: "general,science,tech",
        language: "en",
        limit: 10,
      },
    });
    logger.info(callResult.data);
    res.json({data: callResult.data});
  } catch (error) {
    logger.error("Error fetching headlines:", error);
    res.status(500).send("Error fetching headlines");
  }
});
