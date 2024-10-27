import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Box } from '@mui/material';

const MADISON_WEATHER_ENDPOINT = 'https://api.weather.gov/gridpoints/HUN/57,41/forecast';

interface WeatherReport {
    number: number;
    name: string;
    startTime: string;
    endTime: string;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    temperatureTrend: null;
    windSpeed: string;
    windDirection: string;
    icon: string;
    shortForecast: string;
    detailedForecast: string;
}

const WeatherCard: React.FC = () => {
    const [weather, setWeather] = useState<Array<WeatherReport> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(MADISON_WEATHER_ENDPOINT);
                const todayWeather = response.data.properties.periods;
                setWeather(todayWeather);
            } catch (err) {
                setError(`Failed to fetch weather data ${err}`);
            }
        };

        fetchWeather();
    }, []);

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    Weather in Madison, AL
                </Typography>
                {error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <Box display="flex" flexDirection="column">
                        {/* <Typography variant="body2" color="textSecondary">
                        {weather || 'Loading...'}
                    </Typography> */}
                        {weather?.slice(0, 3).map((report: WeatherReport, index): JSX.Element => {
                            return (
                                <Box key={index}>
                                    <Typography variant="h6" color="textSecondary">
                                        {report.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {report.detailedForecast}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default WeatherCard;