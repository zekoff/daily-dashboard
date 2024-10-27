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

import NasaApodCard from "./components/nasaApodCard";
import QotdCard from "./components/qotdCard";
export default function Home() : JSX.Element {
  return (
    <div>
      {/* Today's date */}
      {/* NASA Astronomy Picture of the Day */}
      <NasaApodCard firebaseApp={app} />
      <QotdCard firebaseApp={app} />
      {/* Advice component */}
      {/* Proverbs component */}
      {/* News component (NewsAPI, Spaceflight News) */}
    </div>
  );
}
