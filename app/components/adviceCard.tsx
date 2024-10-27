import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const AdviceCard: React.FC = () => {
    const [advice, setAdvice] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAdvice = async () => {
            try {
                const response = await axios.get('https://api.adviceslip.com/advice');
                setAdvice(response.data.slip.advice);
            } catch (error) {
                console.error('Error fetching advice:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdvice();
    }, []);

    if (loading) { return <CircularProgress />; }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    Advice
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {advice}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default AdviceCard;