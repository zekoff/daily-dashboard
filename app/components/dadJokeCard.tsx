import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const DataJokeCard: React.FC = () => {
    const [joke, setJoke] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchJoke = async () => {
            try {
                const response = await axios.get('https://icanhazdadjoke.com/', {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                setJoke(response.data.joke);
            } catch (error) {
                console.error('Error fetching joke:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJoke();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">
                    Dad Joke
                </Typography>
                <Typography variant="body1" color="text.secondary">{joke}</Typography>
            </CardContent>
        </Card>
    );
};

export default DataJokeCard;