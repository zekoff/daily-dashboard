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

const NASA_API_KEY = "5YNzXNqZ25GQ4TL62ASPnaVisVtBGIipV24NxX5B";
const NASA_APOD_URL = "https://api.nasa.gov/planetary/apod";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest({cors: true}, (request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const newFunction = onRequest({cors: true}, (request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from the new function");
});

export const getNasaApod = onRequest({cors: true}, async (req, res) => {
  try {
    const callResult = await axios.get(NASA_APOD_URL, {
      params: {
        api_key: NASA_API_KEY,
        // date: req.query.date,
      },
    });
    logger.info(callResult.data);
    res.json(callResult.data);
  } catch (error) {
    logger.error("Error fetching NASA APOD:", error);
    res.status(500).send("Error fetching NASA APOD");
  }
  // logger.info("Hello logs!", {structuredData: true});
  // response.send("hello from the nasa apod function");
  // return axios.get(NASA_APOD_URL, {
  //   params: {
  //     api_key: NASA_API_KEY,
  //     // date: req.query.date,
  //   },
  // }).then(response => {
  //   res.json(response.data);
  // }).catch(error => {
  //   res.status(500).send("Error fetching NASA APOD");
  // });
});

