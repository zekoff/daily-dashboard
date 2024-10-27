"use client";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZDhkCAbXs1vqdgDDz8eZ6a88Hv5BFx4I",
  authDomain: "daily-dashboard-27333.firebaseapp.com",
  projectId: "daily-dashboard-27333",
  storageBucket: "daily-dashboard-27333.appspot.com",
  messagingSenderId: "442345440694",
  appId: "1:442345440694:web:4c181ba46b693ed946ed17",
  measurementId: "G-P6C08YK0LE"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const functions = getFunctions(app);
const today = new Date();
const formattedDate = today.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

import NasaApodCard from "./components/nasaApodCard";
import QotdCard from "./components/qotdCard";
import { Card, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import DataJokeCard from "./components/dadJokeCard";
import AdviceCard from "./components/adviceCard";
import WeatherCard from "./components/weatherCard";
import HeadlinesCard from "./components/headlinesCard";
export default function Home(): JSX.Element {
  return (
    <Container sx={{ paddingTop: 2, paddingBottom: 4 }}>
      <Stack spacing={2}>
        <Paper elevation={12}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h4">Today is {formattedDate}</Typography>
          </Card>
        </Paper>
        <Paper elevation={12}>
          <NasaApodCard firebaseApp={app} />
        </Paper>
        <Paper elevation={12}>
          <QotdCard firebaseApp={app} />
        </Paper>
        <Paper elevation={12}>
          <DataJokeCard />
        </Paper>
        <Paper elevation={12}>
          <AdviceCard />
        </Paper>
        <Paper elevation={12}>
          <WeatherCard />
        </Paper>
        {/* Proverbs component */}
        {/* News component (NewsAPI, Spaceflight News) */}
        <Paper elevation={12}>
          <HeadlinesCard firebaseApp={app} />
        </Paper>
      </Stack>
    </Container>
  );
}
