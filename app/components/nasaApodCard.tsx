import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
// import getNasaApod from '../api/nasaApodService';
import { FirebaseApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

interface NasaApodData {
    url: string;
    title: string;
    explanation: string;
}

interface NasaApodCardProps {
    firebaseApp: FirebaseApp;
}

const targetUrl = 'https://getnasaapod-ayqisnpcga-uc.a.run.app/';

const NasaApodCard: React.FC<NasaApodCardProps> = ({firebaseApp}) => {
    const [data, setData] = useState<NasaApodData | null>(null);
    const [loading, setLoading] = useState(true);
    const getNasaApod = httpsCallable<{}, any>(getFunctions(firebaseApp), 'getNasaApod');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log('Fetching NASA APOD data');
                // console.log(getNasaApod);
                // const result = await getNasaApod();
                // console.log('here');
                // console.log(result);
                // console.log(result.data);
                // setData(result.data);
                const response = await (axios.get(targetUrl));
                console.log(response);
                setData(response.data);
                // const response = await axios.get('/api/nasa-apod'); // Adjust the API endpoint as needed
                // setData(response.data);
                // const response = await getNasaApod().then(result => setData(result.data));
                // setData(response.data);
            } catch (error) {
                console.error('Error fetching NASA APOD data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (!data) {
        return <Typography variant="h6">Failed to load data</Typography>;
    }

    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={data.url}
                alt={data.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {data.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.explanation}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NasaApodCard;