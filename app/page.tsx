"use client";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFunctions } from "firebase/functions";
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
// const functions = getFunctions(app);
const today = new Date();
const formattedDate = today.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();


import NasaApodCard from "./components/nasaApodCard";
import QotdCard from "./components/qotdCard";
import { Button, Card, Container, Paper, Stack, Typography } from "@mui/material";
import DataJokeCard from "./components/dadJokeCard";
import AdviceCard from "./components/adviceCard";
import WeatherCard from "./components/weatherCard";
// import HeadlinesCard from "./components/headlinesCard";
import ProverbsComponent from "./components/proverbsComponent";
import { getAuth, User } from "firebase/auth";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function Home(): JSX.Element {
  // signInWithRedirect(auth, provider);
  const [user, setUser] = useState<User | null>(null);
  // useEffect(() => {
  //   const fetchedUser = async () => {
  //     const result = await getRedirectResult(auth);
  //     const credential = result ? GoogleAuthProvider.credentialFromResult(result) : null;
  //     const token = credential ? credential.accessToken : null;
  //     result ? setUser(result.user) : setUser(null);
  //     result ? console.log(result.user) : console.log("No user");
  //   };
  //   fetchedUser();
  // }, []);
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((usr) => {
  //     if (usr) {
  //       console.log("Found user");
  //       const uid = usr.uid
  //       console.log(`User ID: ${uid}`);
  //       setUser(usr);
  //     // } else {
  //     //   console.log("No user");
  //     //   // setUser(null);
  //     //   signInWithRedirect(auth, provider);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);
  useEffect(() => {
    return getAuth().onAuthStateChanged(usr => setUser(usr));
  });
  // const handleSignIn = () => {
  //   signInWithRedirect(auth, provider);
  // };
  // TODO: Implement sign out
  // const handleSignOut = async () => { }
  // signOut(auth);
  const showUser = () => { console.log(user) };
  // showUser();
  // const createUser = () => {

  // };
  return (
    <Container sx={{ paddingTop: 2, paddingBottom: 4 }}>
      {/* {user ? null : <Button title="Sign In" onClick={handleSignIn} variant="contained" >Sign In</Button>} */}
      <Button onClick={showUser}>Show User</Button>
      <Link href="/news">To News Page</Link>
      <Stack spacing={2}>
        <Paper elevation={12}>
          <Card sx={{ padding: 2 }}>
            <Typography variant="h4">Today is {formattedDate}</Typography>
          </Card>
        </Paper>
        <Paper elevation={12}>
          <WeatherCard />
        </Paper>
        <Paper elevation={12}>
          <ProverbsComponent />
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
      </Stack>
    </Container>
  );
}
