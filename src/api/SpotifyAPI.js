import React from 'react';
import axios from 'axios';

class SpotifyAPI extends React.Component {
    async getToken() {
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
        const auth = btoa(`${clientId}:${clientSecret}`);

        try {
            const response = await axios.post(
                'https://accounts.spotify.com/api/token',
                'grant_type=client_credentials',
                {
                    headers: {
                        Authorization: `Basic ${auth}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );

            const token = response.data.access_token;
            window.localStorage.setItem('token', token);
            return token;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // refreshAccessToken = async () => {
    //     try {
    //         await this.getToken();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // componentDidMount() {
    //     this.getToken(); // 초기에 한 번 호출
    //     this.intervalId = setInterval(this.refreshAccessToken, 3600000); // 1시간마다 호출 (밀리초 단위)
    // }

    // componentWillUnmount() {
    //     clearInterval(this.intervalId);
    // }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default SpotifyAPI;
