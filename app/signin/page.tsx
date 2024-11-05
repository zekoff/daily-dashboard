'use client'

import React from 'react';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAZDhkCAbXs1vqdgDDz8eZ6a88Hv5BFx4I",
    authDomain: "daily-dashboard-27333.firebaseapp.com",
    projectId: "daily-dashboard-27333",
    storageBucket: "daily-dashboard-27333.appspot.com",
    messagingSenderId: "442345440694",
    appId: "1:442345440694:web:4c181ba46b693ed946ed17",
    measurementId: "G-P6C08YK0LE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const SignInPage: React.FC = () => {
    const handleSignIn = () => {
        signInWithRedirect(auth, provider);
    };


    return (
        <Container>
            <h1>Sign In</h1>
            <Button variant="contained" color="primary" onClick={handleSignIn}>Sign In</Button>
        </Container>
    );
};

export default SignInPage;