import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { FirebaseApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

interface QotdCardProps {
    firebaseApp: FirebaseApp;
}

interface QotdData {
    author: string;
    body: string;
}

const QotdCard: React.FC<QotdCardProps> = ({firebaseApp}) => {
    const [quote, setQuote] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const getQotd = httpsCallable<unknown, {quote: QotdData}>(getFunctions(firebaseApp), 'getQotd');

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response: {data: {quote: QotdData}} = await getQotd();
                setQuote(response.data.quote.body);
                setAuthor(response.data.quote.author);
            } catch (error) {
                console.error('Error fetching the quote of the day:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuote();
    }, []);

    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">
                    Quote
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {quote}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    - {author}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default QotdCard;