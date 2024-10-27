import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, CircularProgress, CardHeader } from '@mui/material';
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

const NasaApodCard: React.FC<NasaApodCardProps> = ({firebaseApp}) => {
    const [data, setData] = useState<NasaApodData | null>(null);
    const [loading, setLoading] = useState(true);
    const getNasaApod = httpsCallable<{}, NasaApodData>(getFunctions(firebaseApp), 'getNasaApod');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: {data: NasaApodData} = await getNasaApod();
                setData(response.data);
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
            <CardHeader title="NASA Astronomy Picture of the Day" />
            <CardMedia hidden={!data.url}
                component="img"
                height="140"
                image={data.url}
                alt={data.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">
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