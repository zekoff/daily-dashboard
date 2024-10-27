import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

const ProverbsComponent: React.FC = () => {
    const [chapter, setChapter] = useState<string>('');
    const API_KEY = process.env.NEXT_PUBLIC_ESV_API_KEY;
    const today = new Date().getDate();

    useEffect(() => {
        const fetchProverbsChapter = async () => {
            const url = 'https://api.esv.org/v3/passage/html/';

            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Token ${API_KEY}`,
                    },
                    params: {
                        q: `Proverbs ${today}`,
                        "include-footnotes": false,
                    }
                });
                setChapter(response.data.passages[0]);
            } catch (error) {
                console.error('Error fetching the chapter:', error);
            }
        };

        fetchProverbsChapter();
    }, []);

    return (
        <Card>
            <CardContent>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <Typography variant="h5">Today's Proverbs Chapter (Proverbs {today})</Typography>
                <div dangerouslySetInnerHTML={{ __html: chapter }} />
            </CardContent>
        </Card>
    );
};

export default ProverbsComponent;