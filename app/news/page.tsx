'use client';

import { Container, Paper } from '@mui/material';
import React from 'react';
import HeadlinesCard from '../components/headlinesCard';
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

const NewsPage: React.FC = () => {
    return (
        <Container>
            <Paper elevation={12}>
                <HeadlinesCard firebaseApp={app} />
            </Paper>
        </Container>
    );
};

export default NewsPage;