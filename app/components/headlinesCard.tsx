import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardMedia, Link, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { FirebaseApp } from 'firebase/app';

interface HeadlinesCardProps {
    firebaseApp: FirebaseApp;
}

interface Headline {
    uuid: string;
    title: string;
    description: string;
    snippet: string;
    url: string;
    image_url: string;
}

const HeadlinesCard: React.FC<HeadlinesCardProps> = ({ firebaseApp }) => {
    const [headlines, setHeadlines] = useState<Headline[]>([]);
    const getHeadlines = httpsCallable<unknown, {data: Headline[]}>(getFunctions(firebaseApp), 'getHeadlines');

    useEffect(() => {
        const fetchHeadlines = async () => {
            try {
                if (process.env.NODE_ENV === 'development') {
                    // For development, read from the sampleHeadlines.json file
                    const response = await axios.get('/sampleHeadlines.json');
                    setHeadlines(response.data.data.data);
                } else {
                    // For production, call the getHeadlines function in the Firebase Functions backend
                    const response = await getHeadlines();
                    setHeadlines(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching headlines:', error);
            }
        };

        fetchHeadlines();
    }, []);

    return (
        <Stack sx={{ padding: 2 }}>
            <Typography variant="h5">Headlines</Typography>
            {headlines.slice(0, 3).map((headline, index) => (
                <Card key={index} sx={{ marginBottom: 2, display: 'flex', border: 1 }}>
                    <CardHeader title={headline.title} />
                    <CardContent>
                        <Typography variant="body2">{headline.description}</Typography>
                        <Link href={headline.url} target="_blank" rel="noreferrer">
                            Read more
                        </Link>
                    </CardContent>
                    <CardMedia
                        component="img"
                        sx={{ width: 151 }}
                        image={headline.image_url}
                        alt={headline.title}
                    />
                </Card>
            ))}
        </Stack>
    );
};

export default HeadlinesCard;